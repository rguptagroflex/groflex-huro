import React from "react";
import { RotatingLines } from "react-loader-spinner";

const LoaderSpinner = ({
  message,
  visible,
  containerClass,
  containerStyle,
  size = "50",
}) => {
  return (
    <div
      className={containerClass}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...containerStyle,
      }}
    >
      <RotatingLines
        strokeColor="#00A353"
        strokeWidth="2"
        animationDuration="0.75"
        width={size}
        height={size}
        visible={visible}
      />
      {message && visible && <div className="m-l-5">{message}</div>}
    </div>
  );
};

export default LoaderSpinner;
