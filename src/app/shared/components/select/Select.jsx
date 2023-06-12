import React, { useEffect } from "react";
import { useState } from "react";

export const Select = ({
  options,
  boxStyle,
  iconStyle,
  showDropdownUpwards,
  onChange,
}) => {
  const [active, setActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  useEffect(() => {
    setSelectedOption(options[0]);
  }, [options]);
  const displayDropdownUpwards = showDropdownUpwards && {
    top: "auto",
    bottom: "40px",
  };

  const handleOptionClick = (option) => {
    // console.log(option);
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <div className="control" onClick={() => setActive(!active)}>
      <div className={`h-select ${active ? "is-active" : ""}`}>
        <div className="select-box" style={boxStyle}>
          <span>{selectedOption?.label}</span>
        </div>

        <div className="select-icon" style={iconStyle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-down"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <div
          className="select-drop has-slimscroll-sm"
          style={displayDropdownUpwards}
        >
          <div className="drop-inner">
            {options?.map((option) => (
              <div
                className="option-row"
                key={option.value}
                onClick={() => handleOptionClick(option)}
              >
                <input type="radio" />
                <div className="option-meta">
                  <span key={option.label}>{option.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
