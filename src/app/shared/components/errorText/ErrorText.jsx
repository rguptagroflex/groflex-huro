import React from "react";

export default function ErrorText({ visible, text, style, className }) {
  return visible ? (
    <p
      style={{
        fontWeight: "400",
        fontSize: "14px",
        textAlign: "center",
        
        ...style,
      }}
      className={`help danger-text ${className}`}
    >
      {text}
    </p>
  ) : (
    ""
  );
}
