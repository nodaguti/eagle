import camelCase from 'camel-case';
import { Record } from 'immutable';

const User = new Record({
  name: '',
}, 'user');

const Auth = new Record({
  sessionId: '',
  user: new User(),
}, 'auth');

const ACTIONS_MAP = {
  signInSucceeded(state, { sessionId, user }) {
    const userModel = new User(user);

    return new Auth({
      sessionId,
      user: userModel,
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
export const records = [User, Auth];
