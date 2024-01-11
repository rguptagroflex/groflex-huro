import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const SidebarPanel = ({
  heading,
  panelLinks = [
    { label: "Leads", route: "/crm/leads" },
    { label: "Contact Management", route: "/crm/contact-management" },

    { label: "Tasks Overview", route: "/crm/tasks-overview" },
    { label: "Deals Overview", route: "/crm/deals-overview" },
    { label: "Task details", route: "/crm/task-details" },
  ],
}) => {
  const { sidebarIsActive } = useSelector((state) => state.themeData);
  const sidebarPanelClassNames = `sidebar-panel is-generic ${
    sidebarIsActive ? "is-active" : ""
  }`;
  const GetSubmoduleNavlinks = () => {
    return (
      <ul>
        {panelLinks.map((link, id) => (
          <li key={id}>
            <NavLink
              style={({ isActive }) => {
                if (isActive) {
                  return { color: "#00a353" };
                }
              }}
              to={link.route}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  };

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
                  {/* <ul>
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
                  </ul> */}
                  <GetSubmoduleNavlinks />
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
