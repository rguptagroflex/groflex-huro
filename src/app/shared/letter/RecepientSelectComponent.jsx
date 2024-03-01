import React from "react";
import ContactSearchComponent from "../components/contactSearch/ContactSearchComponent";

const RecepientSelectComponent = ({ onSelect, searchPayee = Boolean }) => {
  return (
    <div>
      <ContactSearchComponent />
    </div>
  );
};

export default RecepientSelectComponent;
