import React from "react";

export const InputAddons = ({
  disabled = false,
  left,
  right,
  placeholder,
  value,
  onRightAdornmentClick,
  onChange,
  ...rest
}) => {
  return (
    <div className="field has-addons">
      {left && (
        <div className="control">
          <a className="button is-static">+91</a>
        </div>
      )}

      <div className="control is-expanded">
        <input
          disabled={disabled}
          className="input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </div>

      {right && (
        <div onClick={onRightAdornmentClick} className="control">
          <a className="button">{right}</a>
        </div>
      )}
    </div>
  );
};
