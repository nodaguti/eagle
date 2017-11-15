import camelCase from 'camel-case';
import { Record } from 'immutable';

const Auth = new Record({
  sessionId: '',
}, 'auth');

const ACTIONS_MAP = {
  signInSucceeded(state, { sessionId }) {
    return new Auth({
      sessionId,
    });
  },

  signOut() {
    return new Auth();
  },
};

const initialState = new Auth();

export default function authentication(state = initialState, { type, payload }) {
  const reducer = ACTIONS_MAP[camelCase(type)];
  return (reducer) ? reducer(state, payload) : state;
}

// For transit-immutable-js
export const records = [Auth];
