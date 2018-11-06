import React, { useState, useEffect } from 'react';
import './index.css';

const IMG_NUM = 3;

export default () => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    // 每次组件刷新时触发effect, 相当cDM cDU
    if (isPlaying) {
      const timeout = setTimeout(() => {
        // 改变state, 刷新组件
        handleNext();
      }, 2000);
      // 返回清除effect的回调函数, 在每次effect调用完之后，如果有则执行
      return () => clearTimeout(timeout);
    }
    // 筛选effect触发条件，相当于sCU
  }, [index, isPlaying]);

  const handleNext = () => {
    setIndex((index + 1) % IMG_NUM);
  }
  const handlePrev = () => {
    setIndex((index - 1 + IMG_NUM) % IMG_NUM);
  }
  const handlePause = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div>
      <div className="img">{index}</div>
      <button onClick={handlePrev}>prev</button>
      <button onClick={handlePause}>pause</button>
      <button onClick={handleNext}>next</button>
    </div>
  )
}
