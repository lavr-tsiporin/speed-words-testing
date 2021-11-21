import React, { useState } from 'react';
import './Options.css'

export const Options = ({ setStatus }) => {

  const [checked, setChecked] = useState(true)

  const onChangeValue = e => {
    const { value } = e.target
    setChecked(!checked)
    setStatus(value)
  }

  return (
    <div className="options_container flex">
      <label>
        <input
          className="option-input radio"
          name="options"
          type="radio"
          value="sentence"
          onChange={onChangeValue}
          checked={checked}
        />
        Предложения
      </label>
      <label>
        <input
          className="option-input radio"
          name="options"
          type="radio"
          value="words"
          onChange={onChangeValue}
          checked={!checked}
        />
        Слова
      </label>
    </div>
  );
};