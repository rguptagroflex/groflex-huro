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
  ...rest
}) => {
  const isRupeeSymbol = left === "₹";
  return (
    <div className="field has-addons">
      {/* {left && (
        <div className="control">
          <a className="button is-static">+91</a>
         
        </div>
      )} */}
       {left && (
        <div className="control">
          <a className="button is-static">
            {isRupeeSymbol ? (
              <span role="img" aria-label="Rupee Symbol">
                ₹
              </span>
            ) : (
              "+91"
            )}
          </a>
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
