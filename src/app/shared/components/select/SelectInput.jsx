import React, { useEffect, useState } from "react";
import Select from "react-select";

export const SelectInput = ({
  placeholder,
  options,
  onChange,
  value,
  defaultValue,
}) => {
  const [selectedOption, setSelectedOption] = useState(
    defaultValue
      ? options.find((option) => option.value === defaultValue)
      : options.find((option) => option.value === value)
  );

  useEffect(() => {
    if (value !== undefined || value !== null) {
      setSelectedOption(options.find((option) => option.value === value));
    }
  }, [value]);

  return (
    <Select
      placeholder={placeholder}
      value={selectedOption}
      options={options}
      onChange={onChange}
    />
  );
};
// import React, { useEffect, useState } from "react";
// import Select from "react-select";

// export const SelectInput = ({
//   placeholder,
//   options,
//   onChange,
//   value,
//   defaultValue,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);

//   useEffect(() => {
//     if (value !== undefined && value !== null && options) {
//       setSelectedOption(options.find((option) => option.value === value));
//     }
//   }, [value, options]);

//   const handleChange = (selectedOption) => {
//     setSelectedOption(selectedOption);
//     if (onChange) {
//       onChange(selectedOption);
//     }
//   };

//   return (
//     <Select
//       placeholder={placeholder}
//       value={selectedOption}
//       options={options}
//       onChange={handleChange}
//     />
//   );
// };