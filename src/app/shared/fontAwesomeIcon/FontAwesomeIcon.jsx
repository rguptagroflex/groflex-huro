import React from "react";

export default function FontAwesomeIcon({
  name,
  style,
  onClick,
  color = "grey",
  size,
  ...rest
}) {
  const getClassName = `fas fa-${name}`;
  return (
    <i
      color={color}
      onClick={onClick}
      style={{ ...style, width: size, height: size }}
      {...rest}
      className={getClassName}
    />
  );
}
