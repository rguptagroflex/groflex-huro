import React from "react";
import * as icons from "react-feather";
// color: #272D30;

export function FeatherIcon({
  style,
  onClick,
  name,
  color = "grey",
  size = 20,
  strokeWidth = 2,
  ...rest
}) {
  const IconComponent = icons[name];
  return (
    <IconComponent
      style={style}
      onClick={onClick}
      color={color}
      size={size}
      strokeWidth={strokeWidth}
      {...rest}
    />
  );
}
