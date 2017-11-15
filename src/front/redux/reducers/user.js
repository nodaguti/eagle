import camelCase from 'camel-case';
import { Record } from 'immutable';

const User = new Record({
  name: '',
  role: '',
  score: 0,
}, 'user');

const ACTIONS_MAP = {
  signInSucceeded(state, { user }) {
    return new User(user);
  },

  setRole(state, { role }) {
    return state.set('role', role);
  },

  addScore(state, { scoreDiff }) {
    return state.set('score', state.score + scoreDiff);
  },
};

const initialState = new User();

export default function authentication(state = initialState, { type, payload }) {
  const reducer = ACTIONS_MAP[camelCase(type)];
  return (reducer) ? reducer(state, payload) : state;
}

// For transit-immutable-js
export const records = [User];
