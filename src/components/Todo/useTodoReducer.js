import { useReducer } from 'react';


const initialState = {
  data: new Map(),
  show: 'all',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        data: state.data.set(action.key, { value: action.value, completed: false })
      };
    case 'remove':
      // 不太好
      state.data.delete(action.key)
      return {
        ...state,
        data: state.data,
      }
    case 'complete':
      return {
        ...state,
        data: state.data.set(action.key, { ...state.data.get(action.key), completed: !state.data.get(action.key).completed })
      };
    case 'edit':
      return {
        ...state,
        data: state.data.set(action.key, { ...state.data.get(action.key), value: action.value })
      };
    case 'changeshow':
      return {
        ...state,
        show: action.value,
      }
    case 'resetshow':
      return {
        ...state,
        show: 'all',
      }
    default:
      return state;
  }
}

export default () => useReducer(reducer, initialState);
