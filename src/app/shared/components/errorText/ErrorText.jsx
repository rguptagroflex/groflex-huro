import React from "react";

export default function ErrorText({ visible, text }) {
  return visible ? (
    <p
      style={{ fontWeight: "400", fontSize: "14px" }}
      className="help danger-text"
    >
      {text}
    </p>
  ) : (
    ""
  );
}
