import React from "react";
import { FeatherIcon } from "../featherIcon/FeatherIcon";

const EditableIndicatorDiv = ({
  children,
  className = "",
  style,
  icon,
  onClick = () => {},
  rest,
}) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`editable-indicator-div ${className}`}
      {...rest}
    >
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
