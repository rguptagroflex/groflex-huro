import React, { useState } from 'react';

const RadioButton = ({ choices, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (typeof onSelect === 'function') {
      onSelect(selectedValue);
    }
  };

  return (
    <div className="field">
      <div className="control">
        {choices.map((choice, index) => (
          <label
            key={index}
            className={`radio ${selectedOption === choice.value ? choice.class : ''
              }`}
          >
            <input
              type="radio"
              name={choice.name}
              value={choice.value}
              checked={selectedOption === choice.value}
              onChange={handleOptionChange}
            />
            <span></span>
            {choice.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButton;
