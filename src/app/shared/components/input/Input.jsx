import { has } from "lodash";
import React from "react";

export const Input = ({
  type = "text",
  placeholder,
  focusType,
  helpText,
  isRounded,
  hasIcon,
  isLoading,
  hasValidation,
  hasSuccess,
  hasError,
  iconType,
  value,
  onChange,
  ...rest
}) => {
  const getFocusType = () => {
    switch (focusType) {
      case "primary":
        return "is-primary-focus";
      case "success":
        return "is-success-focus";
      case "info":
        return "is-info-focus";
      case "warning":
        return "is-warning-focus";
      case "danger":
        return "is-danger-focus";
      default: {
        return "";
      }
    }
  };

  const getInputClassOptions = () => {
    if (isRounded) {
      return "is-rounded";
    } else {
      return "";
    }
  };

  const getControlClassOptions = () => {
    const classes = [];

    hasIcon && classes.push("has-icon");

    isLoading && classes.push("is-loading");

    hasValidation && hasSuccess && classes.push("has-validation has-success");

    hasValidation && hasError && classes.push("has-validation has-error");

    return classes.join(" ");
  };

  const errorStyles = {
    font: {
      fontSize: "14px",
      fontWeight: "400",
    },
    border: {
      border: hasError ? "1px solid #D94339" : "",
    },
  };
  return (
    <div className="field">
      <div className={`control ${getControlClassOptions()}`}>
        <input
          style={errorStyles.border}
          type={type}
          className={`input ${getFocusType()} ${getInputClassOptions()}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="off"
          {...rest}
        />

        {/* Icon */}
        {hasIcon && (
          <span className="form-icon">
            <i className={`fas fa-${iconType}`}></i>
          </span>
        )}

        {/* Validation Success */}
        {hasValidation && hasSuccess && (
          <div className="validation-icon is-success">
            <i data-feather="check"></i>
          </div>
        )}

        {/* Validation Error */}
        {hasValidation && hasSuccess && (
          <div className="validation-icon is-error">
            <i data-feather="x"></i>
          </div>
        )}

        {/* Helper text */}
        {helpText && (
          <p
            className={`help ${
              hasSuccess ? "success-text" : hasError ? "danger-text" : ""
            }`}
            style={errorStyles.font}
          >
            {helpText}
          </p>
        )}
      </div>
    </div>
  );
};
