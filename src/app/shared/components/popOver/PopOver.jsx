import React, { useState } from "react";
import OnClickOutside from "../onClickOutside/OnClickOutside";
import { FeatherIcon } from "../../featherIcon/FeatherIcon";

const PopOver = ({ elements }) => {
  const [isActive, setIsActive] = useState(false);

  const handleFunction = (handleOperation) => {
    closePopOver();
    handleOperation();
    console.log("Function");
  };
  const closePopOver = () => {
    setIsActive(false);
  };
  const openPopOver = () => {
    setIsActive(true);
  };

  return (
    <OnClickOutside onClickOutside={closePopOver}>
      <div
        style={{ cursor: "pointer" }}
        onClick={openPopOver}
        className={`${"dropdown is-spaced  is-right dropdown-trigger is-pushed-mobile is-up "}${
          isActive && "is-active"
        }`}
      >
        <FeatherIcon primaryColor name={"MoreVertical"} />
        <div
          className="dropdown-menu no-padding-bottom"
          style={{ minWidth: "65px", bottom: "0" }}
        >
          <div style={{ cursor: "pointer" }} className="dropdown-content">
            {elements.map((item, index) => {
              return (
                <>
                  <div
                    onClick={() => handleFunction(item.handleClick)}
                    className="dropdown-item is-media"
                    key={item?.title.toLowerCase()}
                  >
                    <div className="meta">
                      <span>{item?.title}</span>
                      <span>{item?.subTitle}</span>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </OnClickOutside>
  );
};

export default PopOver;
