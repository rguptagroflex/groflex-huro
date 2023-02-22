import React from "react";

export const Input = ({
  value,
  onChange,
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

  return (
    <div className="field">
      <div className={`control ${getControlClassOptions()}`}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          className={`input ${getFocusType()} ${getInputClassOptions()}`}
          placeholder={placeholder}
          {...rest}
        />

        {/* Icon */}
        {hasIcon && (
          <span className="form-icon">
            <i className={`fas fa-${iconType}`}></i>
            {/* <i data-feather="activity"></i> */}
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
          >
            {helpText}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * basic input
 * help text
 * rounded
 * focus colors
 * font awesome !!!icon not showing: fab fa-twitter
 * line icons !!!not showing: lnil lnil-briefcase
 * feather icons !!!not showing: data-feather="github"
 * loading input
 * Disabled Input
 * Validation !!!iconst not showing
 */

{
  /* <Input
				placeholder="Search..."
				focus="info"
				helpText="Username is incorrect"
				hasIcon
			/> */
}
