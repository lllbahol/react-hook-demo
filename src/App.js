import React, { useState } from 'react';
import './App.css';

import Todo from './components/Todo';
import Slider from './components/Slider';
import Input from './components/Input';

const App = () => {
  const [tab, setTab] = useState('Input');
  return (
    <div className="App">
      {
        ['Input', 'Slider', 'Todo'].map((d) => (
          <button key={d} onClick={() => setTab(d)}>{d}</button>
        ))
      }
      <div className="workspace">
        {
          tab === 'Input' && <Input />
        }
        {
          tab === 'Slider' && <Slider />
        }
        {
          tab === 'Todo' && <Todo />
        }
      </div>
    </div>
  );
}
export default App;
