import React from "react";
import * as icons from "react-feather";

export function FeatherIcon({ name, ...rest }) {
  const IconComponent = icons[name];
  return <IconComponent {...rest} />;
}
