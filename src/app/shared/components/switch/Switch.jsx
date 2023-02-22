import React from "react";

export const Switch = ({
  value,
  onChange,
  label,
  isPrimary,
  isSuccess,
  isInfo,
  isWarning,
  isDanger,
  rest,
}) => {
  const getSwitchClasses = () => {
    const classes = [];

    isPrimary && classes.push("is-primary");
    isSuccess && classes.push("is-success");
    isInfo && classes.push("is-info");
    isWarning && classes.push("is-warning");
    isDanger && classes.push("is-danger");

    return classes.join(" ");
  };

  return (
    <div className={label ? "switch-block" : ""}>
      <label className={`form-switch ${getSwitchClasses()}`}>
        <input onChange={onChange} value={value} type="checkbox" className="is-switch" {...rest} />
        <i></i>
      </label>

      <div className="text">
        <span>{label}</span>
      </div>
    </div>
  );
};
