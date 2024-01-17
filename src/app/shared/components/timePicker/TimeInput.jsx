import { TimePicker } from "@mui/x-date-pickers";
import React from "react";

const TimeInput = ({ size, onChange, value, label = "" }) => {
  return (
    <div className="time-input-wrapper">
      <TimePicker
        slotProps={{ textField: { size: size } }}
        onChange={onChange}
        value={value}
        label={label}
      />
    </div>
  );
};

export default TimeInput;
