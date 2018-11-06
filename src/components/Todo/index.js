import React, { useReducer } from 'react';
import FormItem from './FormItem';

import './index.css';

export default () => {
  const [state, displatch] = useReducer(reducer, initialState);
  const handleShow = (value) => {
    displatch({ type: 'changeshow', value });
  }
  const filteredData = [...state.data.entries()].filter(([key, value]) => {
      if (state.show === 'actived') {
        return !value.completed;
      }
      if (state.show === 'completed') {
        return value.completed;
      }
      return true;
    });

  return (
    <div className="form-wrapper">
      <h2>todo</h2>
      <input
        onKeyDown={(e) => {
          if (e.keyCode === 13 && e.target.value) {
            displatch({
              type: 'add',
              key: new Date().getTime(),
              value: e.target.value,
            });
            e.target.value = '';
          }
        }}
      />
      {
        filteredData.map(([key, value]) =>
          <FormItem
            key={key}
            handleRemove={() => displatch({ type: 'remove', key })}
            handleComplete={() => displatch({ type: 'complete', key })}
            handleEdit={(v) => displatch({ type: 'edit', value: v, key })}
            {...value}
          />
        )
      }
      <div className="btns">
        {
          ['all', 'actived', 'completed'].map((d) => (
            <button
              key={d}
              className={state.show === d ? 'active' : ''}
              onClick={() => { handleShow(d) }}
            >{d}</button>
          ))
        }
      </div>
    </div>
  );
}

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
    default:
      return state;
  }
}



