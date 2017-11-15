import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable';
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

const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) {
    return state.toJS();
  }
  return state;
};

export default function configureStore(initialState = {}) {
  const logger = createLogger({ stateTransformer });
  const createPersistentStore = compose(
    persistState(null, localStorageConfig),
    applyMiddleware(thunk, logger),
  )(createStore);

  return createPersistentStore(rootReducer, initialState);
}
