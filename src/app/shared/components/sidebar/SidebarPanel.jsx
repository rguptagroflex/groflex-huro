import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FeatherIcon } from "../../featherIcon/FeatherIcon";
import { AppContext } from "../../context/AppContext";

const SidebarPanel = ({ heading, panelLinks }) => {
  const { cssContext } = useContext(AppContext);
  const sidebarPanelClassNames = `sidebar-panel is-generic ${
    cssContext?.isPushedFull ? "is-active" : ""
  }`;

  return (
    <div className={sidebarPanelClassNames}>
      <div className="subpanel-header">
        <div
          style={{ marginRight: "0" }}
          className="dropdown project-dropdown dropdown-trigger is-spaced"
        >
          {/* <span className="status-indicator"></span> */}
        </div>
        <h3 style={{ color: "#272D30", fontWeight: "500" }} className="no-mb">
          {heading}
        </h3>
      </div>

      <div className="inner">
        <div className="simplebar-wrapper">
          <div className="simplebar-height-auto-observer-wrapper">
            <div className="simplebar-height-auto-observer"></div>
          </div>

          <div className="simplebar-mask">
            <div className="simplebar-offset">
              <div className="simplebar-content-wrapper">
                <div className="simplebar-content">
                  <ul>
                    <li>
                      <NavLink
                        style={({ isActive }) => {
                          if (isActive) {
                            return { color: "#00a353" };
                          }
                        }}
                        to="/dashboard"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarPanel;
