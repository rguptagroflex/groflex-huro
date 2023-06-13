import React, { useEffect, useState } from "react";
import Select from "react-select";

export const SelectInput = ({ options, onChange, value, defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState(
    defaultValue
      ? options.find((option) => option.value === defaultValue)
      : options.find((option) => option.value === value)
  );

  useEffect(() => {
    if (value) {
      setSelectedOption(options.find((option) => option.value === value));
    }
  }, [value]);

  return (
    <Select value={selectedOption} options={options} onChange={onChange} />
  );
};
