import React, { useState } from "react";

export default function FontAwesomeIcon({
  name,
  style,
  primaryColor,
  onClick,
  color = "#C6C6C6",
  onHoverColor,
  size = 21,
  className,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const getClassName = `${className ? className : ""} fas fa-${name}`;

  const getColor = () => {
    let col = primaryColor ? "#00a353" : color;
    if (onHoverColor && hover) {
      col = onHoverColor;
    }
    return col;
  };

  return (
    <i
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        margin: "0 5px",
        color: getColor(),
        fontSize: size,
        ...style,
      }}
      {...rest}
      className={getClassName}
    />
  );
}
