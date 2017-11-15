import camelCase from 'camel-case';
import { Record, List } from 'immutable';

export const Recipe = new Record({
  title: '',
  description: '',
  ingredients: new List(),
  instructions: new List(),
  uri: '',
  imgUri: '',
}, 'recipe');

const Recommendations = new Record({
  seasonal: new List(),
  ranking: new List(),
  device: new List(),
}, 'recommendations');

const Cook = new Record({
  menu: null,
  recommendations: new Recommendations(),
}, 'cook');

const ACTIONS_MAP = {
  recommendationsFetched(state, { recommendations }) {
    return Object
      .keys(recommendations)
      .reduce((newState, key) => {
        const list = recommendations[key].map((i) => new Recipe(i));
        return newState.setIn(['recommendations', key], new List(list));
      }, state);
  },

  menuDecided(state, { menu }) {
    return state.set('menu', menu);
  },

  originalMenuDecided(state, { title }) {
    return state.set('menu', new Recipe({ title }));
  },

  clearMenu(state) {
    return state.set('menu', null);
  },

  clearCook() {
    return new Cook();
  },
};

const initialState = new Cook();

export default function authentication(state = initialState, { type, payload }) {
  const reducer = ACTIONS_MAP[camelCase(type)];
  return (reducer) ? reducer(state, payload) : state;
}

// For transit-immutable-js
export const records = [Cook, Recipe, Recommendations];
