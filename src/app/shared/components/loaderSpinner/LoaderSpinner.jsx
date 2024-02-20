import React from "react";
import { RotatingLines } from "react-loader-spinner";

const LoaderSpinner = ({
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
        height: "55vh",
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
    </div>
  );
};

export default LoaderSpinner;
