import React, { useContext } from 'react';

import { ReducerContext } from './index';

export default ({ text }) => {
  // useContext之后相当于组件被consumer包了
  // 可获得consumer中包含的所有数据
  const { dispatch, state } = useContext(ReducerContext);
  const handleShow = (value) => {
    dispatch({ type: 'changeshow', value });
  }
  return (
    <button
      className={state.get('show') === text ? 'active' : ''}
      onClick={() => { handleShow(text) }}
    >{text}</button>
  );
}