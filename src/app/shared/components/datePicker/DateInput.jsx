import React, { useEffect, useRef, useState } from "react";
import Pikaday from "pikaday";
import { InputAddons } from "../inputAddons/InputAddons";
import { FeatherIcon } from "../../featherIcon/FeatherIcon";

const DateInput = ({ selectedDate, onDateChange = () => {} }) => {
  const datePickerRef = useRef();
  const [selectedDateState, setSelectedDateState] = useState(selectedDate);

  useEffect(() => {
    // Initialize Pikaday when the component mounts
    const picker = new Pikaday({
      field: datePickerRef.current,
      onSelect: (date) => {
        setSelectedDateState(date);
        //props on change
        onDateChange(date);
      },
      // Additional Pikaday options go here
    });

    // Clean up Pikaday when the component unmounts
    return () => {
      picker.destroy();
    };
  }, []);

  const valueString = selectedDateState
    ? selectedDateState.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  // console.log(valueString);

  return (
    <InputAddons
      left={<FeatherIcon name="Calendar" />}
      inputRef={datePickerRef}
      placeholder="Select a date"
      value={valueString}
      readOnly
    />
    // <input
    //   type="text"
    //   ref={datePickerRef}
    //   placeholder="Select a date"
    //   value={valueString}
    //   readOnly
    // />
  );
};

export default DateInput;
