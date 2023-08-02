/* eslint-disable react/prop-types */
import React from 'react';

function SelectDrop({ id = 'id' }) {
  const arrCurr = ['USD', 'EUR', 'XAF'];

  return (
    <select id={id}>
      {arrCurr.map((curr) => (
        <option key={curr} value={curr}>
          {curr}
        </option>
      ))}
    </select>
  );
}

export default SelectDrop;
