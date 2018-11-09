import React from 'react';

import FormItem from './FormItem';
import ShowBtn from './ShowBtn';
import useTodoReducer from './useTodoReducer';

import './index.css';

export const ReducerContext = React.createContext(null);

export default () => {
  const [ state, dispatch ] = useTodoReducer();
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
    <ReducerContext.Provider value={{ dispatch, state }}>
      <div className="form-wrapper">
        <h2>todo</h2>
        <input
          onKeyDown={(e) => {
            if (e.keyCode === 13 && e.target.value) {
              dispatch({
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
              handleRemove={() => dispatch({ type: 'remove', key })}
              handleComplete={() => dispatch({ type: 'complete', key })}
              handleEdit={(v) => dispatch({ type: 'edit', value: v, key })}
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

