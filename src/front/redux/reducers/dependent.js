import camelCase from 'camel-case';
import { Record, List } from 'immutable';
import { Recipe } from './cook';

const Dependent = new Record({
  answer: null,
  alternatives: new List(),
}, 'dependent');

const ACTIONS_MAP = {
  alternativesFetched(state, { alternatives }) {
    return state.set('alternatives', alternatives.map((item) => new Recipe(item)));
  },

  answerDecided(state, { answer }) {
    return state.set('answer', answer);
  },

  clearAnswer(state) {
    return state.set('answer', null);
  },
};

const initialState = new Dependent();

export default function dependent(state = initialState, { type, payload }) {
  const reducer = ACTIONS_MAP[camelCase(type)];
  return (reducer) ? reducer(state, payload) : state;
}

// For transit-immutable-js
export const records = [Dependent];
