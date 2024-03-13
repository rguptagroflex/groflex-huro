import React, { useState } from "react";
import OnClickOutside from "../onClickOutside/OnClickOutside";
import { FeatherIcon } from "../../featherIcon/FeatherIcon";
import { Button } from "../button/Button";

const PopOver = ({
  elements = [{ title: "", subTitle: "", handleClick: () => {} }],
  openUp,
  label,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleFunction = (handleOperation) => {
    closePopOver();
    handleOperation();
    // console.log("Function");
  };
  const closePopOver = () => {
    setIsActive(false);
  };
  const openPopOver = () => {
    setIsActive(true);
  };

  const togglePopOver = () => {
    setIsActive(!isActive);
  };

  return (
    <OnClickOutside onClickOutside={closePopOver}>
      <div
        style={{ cursor: "pointer" }}
        onClick={togglePopOver}
        className={`${"dropdown is-spaced is-right dropdown-trigger is-pushed-mobile "}${
          openUp ? "is-up " : ""
        }${isActive && "is-active"}`}
      >
        <div onClick={togglePopOver} className="is-trigger">
          {label ? label : <FeatherIcon primaryColor name={"MoreVertical"} />}
        </div>
        <div
          className="dropdown-menu m-b-5"
          style={{
            minWidth: "90px",
          }}
        >
          <div style={{ cursor: "default" }} className="dropdown-content">
            {elements.map((item, index) => {
              return (
                <div
                  onClick={() => handleFunction(item.handleClick)}
                  className="dropdown-item is-media m-t-5 m-b-5 cursor-pointer"
                  key={item?.title.toLowerCase()}
                  style={{ minHeight: "35px" }}
                >
                  <div className="meta m-r-10">
                    <span>{item?.title}</span>
                    <span>{item?.subTitle}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </OnClickOutside>
  );
};

export default PopOver;
