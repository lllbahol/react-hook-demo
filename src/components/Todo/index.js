import React, { useReducer } from 'react';

import FormItem from './FormItem';
import ShowBtn from './ShowBtn';

import './index.css';

export const ReducerContext = React.createContext(null);

export default () => {
  const [state, displatch] = useReducer(reducer, initialState);
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
    <ReducerContext.Provider value={{ displatch, state }}>
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
              <ShowBtn key={d} text={d} />
            ))
          }
        </div>
      </div>
    </ReducerContext.Provider>
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
    case 'resetshow':
      return {
        ...state,
        show: 'all',
      }
    default:
      return state;
  }
}



