import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import transit from 'transit-immutable-js';
import rootReducer from '../../redux/reducers';
import { records as authRecords } from '../../redux/reducers/auth';
import { records as errorRecords } from '../../redux/reducers/error';

const recordTransit = transit.withRecords([
  ...authRecords,
  ...errorRecords,
]);

const localStorageConfig = {
  serialize: (subset) => recordTransit.toJSON(subset),
  deserialize: (serializedData) => recordTransit.fromJSON(serializedData),
};

export default function configureStore(initialState = {}) {
  const createPersistentStore = compose(
    persistState(null, localStorageConfig),
    applyMiddleware(thunk),
  )(createStore);

  return createPersistentStore(rootReducer, initialState);
}
