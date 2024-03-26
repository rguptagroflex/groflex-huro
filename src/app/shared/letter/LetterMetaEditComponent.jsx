import React from "react";
import OnClickOutside from "../components/onClickOutside/OnClickOutside";
import { Input } from "../components/input/Input";

const LetterMetaEditComponent = ({ onChange }) => {
  const handleChange = () => {
    onChange();
  };

  return (
    <OnClickOutside className="letter-meta-edit-component">
      <Input value={"Invoice Number: "} onChange={handleChange} />
      <Input value={"Cusomer No.: "} onChange={handleChange} />
      <Input value={"Invoice Date: "} onChange={handleChange} />
      <Input value={"Delivery Time: "} onChange={handleChange} />
    </OnClickOutside>
  );
};

export default LetterMetaEditComponent;
