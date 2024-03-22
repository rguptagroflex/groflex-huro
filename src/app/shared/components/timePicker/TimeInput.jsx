import { TimePicker } from "@mui/x-date-pickers";
import React from "react";

const TimeInput = ({ size, onChange, value, label = "", ampm = true }) => {
  return (
    <div className="time-input-wrapper">
      <TimePicker
        ampm={ampm}
        slotProps={{ textField: { size: size, error: false } }}
        onChange={onChange}
        value={value}
        label={label}
      />
    </div>
  );
};

export default TimeInput;
