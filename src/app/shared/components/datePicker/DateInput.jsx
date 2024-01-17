import React, { useEffect, useRef, useState } from "react";
import Pikaday from "pikaday";
import { InputAddons } from "../inputAddons/InputAddons";
import { FeatherIcon } from "../../featherIcon/FeatherIcon";

const DatePicker = ({ selectedDate, onDateChange = () => {} }) => {
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

export default DatePicker;

// import React, { useEffect, useRef } from "react";
// import Pikaday from "pikaday";

// const DateInput = () => {
//   const dateRef = useRef();

//   const onDateChange = () => {};

//   useEffect(() => {
//     new Pikaday({
//       field: dateRef.current,
//       format: "MM/DD/YYYY",
//       onSelect: () => onDateChange(),
//     });
//   }, []);
//   return (
//     <div>
//       <input type="text" ref={dateRef} />
//     </div>
//   );
// };

// export default DateInput;
