import React, { useState } from 'react';

export default () => {
  const name = useSetValue('hello');
  const phone = useSetValue('120');
  return (
    <React.Fragment>
      <Item {...name} />
      <br />
      <Item {...phone} />
    </React.Fragment>
  );
}

const Item = ({ value, setValue }) => (
  <React.Fragment>
    <label>{value}</label>
    <br />
    <input value={value} onChange={setValue} />
  </React.Fragment>
);

const useSetValue = (initvalue) => {
  const [value, setValue] = useState(initvalue);
  const handleChange = (e) => {
    setValue(e.target.value);
  }
  return {
    value,
    setValue: handleChange,
  };
}

