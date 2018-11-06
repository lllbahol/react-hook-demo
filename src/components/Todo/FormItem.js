import React, { useState } from 'react';

export default ({ value, completed, handleRemove, handleComplete, handleEdit }) => {
  const [editing, setEditing] = useState(false);
  return (
    <div className="form-item">
      <div
        className="text-wrapper"
        onDoubleClick={() => setEditing(true)}
      >
        <span
          className={completed ? 'completed' : ''}
          onClick={handleComplete}
        >{value}</span>
        <button onClick={handleRemove}>x</button>
      </div>
      <input
        autoFocus
        className={editing ? 'editing' : ''}
        defaultValue={value}
        onBlur={(e) => {
          setEditing(false);
          handleEdit(e.target.value);
        }}
      />
    </div>
  );
}
