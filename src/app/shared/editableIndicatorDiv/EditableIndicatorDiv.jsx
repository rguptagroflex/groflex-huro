import React from "react";
import { FeatherIcon } from "../featherIcon/FeatherIcon";

const EditableIndicatorDiv = ({ children, className = "", style, icon }) => {
  return (
    <div style={style} className={`editable-indicator-div ${className}`}>
      {children}
      {icon ? (
        icon
      ) : (
        <FeatherIcon name={"Edit"} className={"icon-class"} primaryColor />
      )}
    </div>
  );
};

export default EditableIndicatorDiv;
