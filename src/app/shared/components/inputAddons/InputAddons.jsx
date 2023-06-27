import { has } from "lodash";
import React from "react";

export const InputAddons = ({
  disabled = false,
  left,
  type,
  maxLength,
  right,
  placeholder,
  value,
  onRightAdornmentClick,
  onChange,
  helpText,
  hasSuccess,
  hasError,
  ...rest
}) => {
  return (
    <div className="field has-addons">
      {left && (
        <div className="control">
          <a className="button is-static">+91</a>
        </div>
      )}

      <div className="control is-expanded ">
        <input
          disabled={disabled}
          className="input"
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
          style={{ border: hasError ? "1px solid #D94339" : "" }}
        />
        {/* Helper text */}
        {helpText && (
          <p
            className={`help ${
              hasSuccess ? "success-text" : hasError ? "danger-text" : ""
            }`}
            style={{ fontSize: "14px", fontWeight: "400" }}
          >
            {helpText}
          </p>
        )}
      </div>

      {right && (
        <div onClick={onRightAdornmentClick} className="control">
          <a className="button">{right}</a>
        </div>
      )}
    </div>
  );
};
