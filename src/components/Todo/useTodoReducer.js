import { useReducer } from 'react';
import { fromJS } from 'immutable';

const initialState = {
  data: fromJS({}),
  show: 'all',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return state
        .setIn(['data', String(action.key)], fromJS({ value: action.value, completed: false }))
    case 'remove':
      return state
        .removeIn(['data', action.key]);
    case 'complete':
      return state
        .updateIn(['data', action.key, 'completed'], d => !d);
    case 'edit':
      return state
       .setIn(['data', action.key, 'value'], action.value);
    case 'changeshow':
      return state.set('show', action.value);
    default:
      return state;
  }
}

export default () => useReducer(reducer, fromJS(initialState));
