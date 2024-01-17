import { TimePicker } from "@mui/x-date-pickers";
import React from "react";

const TimeInput = ({ size }) => {
  return (
    <div className="time-input-wrapper">
      <TimePicker slotProps={{ textField: { size: size } }} />
    </div>
  );
};

export default TimeInput;
