import React from "react";

export const InputAddons = ({
  left,
  right,
  placeholder,
  value,
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
          className="input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </div>

      {right && (
        <div className="control">
          <a className="button">{right}</a>
        </div>
      )}
    </div>
  );
};
