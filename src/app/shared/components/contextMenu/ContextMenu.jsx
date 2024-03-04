import React, { useState } from "react";
import { Button } from "../button/Button";
import FontAwesomeIcon from "../../fontAwesomeIcon/FontAwesomeIcon";
import { FeatherIcon } from "../../featherIcon/FeatherIcon";

const ContextMenu = ({ contextMenuItems = [], classes = [], iconText }) => {
  const [isContextMenuActive, setIsContextMenuActive] = useState(false);
  const getContextMenuClasses = () => {
    return classes.join(" ");
  };
  return (
    <div
      className={`dropdown  dropdown-trigger is-down ${getContextMenuClasses()} ${
        isContextMenuActive ? "is-active" : ""
      }`}
      onClick={() => setIsContextMenuActive(!isContextMenuActive)}
    >
      <div
        className="is-trigger"
        aria-haspopup="true"
        style={{ display: "flex", alignItems: "center", gap: "5px" }}
      >
        <FeatherIcon name={"Download"} size={16} color="black" />
        {iconText && <span>Export</span>}
      </div>
      <div className="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {contextMenuItems.map((item, id) => (
            <a
              className="dropdown-item font-size-base"
              onClick={() => item.onContextMenuItemClick(item.label)}
              key={`context-menu-entry-${id}`}
            >
              {item.label}
            </a>
          ))}
          {/* <a className="dropdown-item font-size-base">PDF</a>
          <a className="dropdown-item font-size-base">CSV</a> */}
        </div>
      </div>
    </div>
  );
};

export default ContextMenu;
