import React from "react";
import * as icons from "react-feather";

export function FeatherIcon({ name, color = "grey", size = 20, ...rest }) {
  const IconComponent = icons[name];
  return <IconComponent color={color} size={size} {...rest} />;
}
