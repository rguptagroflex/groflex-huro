import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import lightLogo from "../../../assets/img/logos/logo/logo.svg";
import darkLogo from "../../../assets/img/logos/logo/logo-light.svg";
import useThemeSwitch from "../../helpers/hooks/useThemeSwitch";

const Sidebar = () => {
  const { cssContext, setCssContext } = useContext(AppContext);
  const [reportSubmenuOpen, setReportSubmenuOpen] = useState(false);
  const themeSwitch = useThemeSwitch();

  const sideBarClassNames = `sidebar-block ${
    cssContext.isPushedFull ? "is-active is-bordered" : ""
  }`;

  const logo = cssContext.theme === "light" ? lightLogo : darkLogo;
  const logoClassnames =
    cssContext.theme === "light" ? "light-image" : "dark-image";

  const MenuIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-grid"
      >
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    );
  };

  return (
    <div id="sidebar-block" className={sideBarClassNames}>
      <div className="sidebar-block-header">
        <a href="/" className="sidebar-block-logo">
          <img src={logo} alt="logo" className={logoClassnames} />
        </a>
        <h3 onClick={themeSwitch}>Huro</h3>
      </div>
      <div className="sidebar-block-inner" data-simplebar="init">
        <div className="simplebar-wrapper" style={{ margin: 0 }}>
          <div className="simplebar-height-auto-observer-wrapper">
            <div className="simplebar-height-auto-observer" />
          </div>
          <div className="simplebar-mask">
            <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
              <div
                className="simplebar-content-wrapper"
                style={{ height: "100%", overflow: "hidden scroll" }}
              >
                <div className="simplebar-content" style={{ padding: 0 }}>
                  <ul>
                    <li>
                      <a href="/" className="single-link">
                        <span className="icon">
                          <MenuIcon />
                          Dashboard
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/" className="single-link">
                        <span className="icon">
                          <MenuIcon />
                          Dashboard
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/" className="single-link">
                        <span className="icon">
                          <MenuIcon />
                          Dashboard
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/" className="single-link">
                        <span className="icon">
                          <MenuIcon />
                          Dashboard
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/" className="single-link">
                        <span className="icon">
                          <MenuIcon />
                          Dashboard
                        </span>
                      </a>
                    </li>
                    <li
                      onClick={() => {
                        setReportSubmenuOpen(!reportSubmenuOpen);
                      }}
                      className={`has-children ${
                        reportSubmenuOpen ? "active" : ""
                      }`}
                    >
                      <div className="collapse-wrap">
                        <a className="parent-link">
                          <div className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-briefcase"
                            >
                              <rect
                                x="2"
                                y="7"
                                width="20"
                                height="14"
                                rx="2"
                                ry="2"
                              ></rect>
                              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                          </div>
                          Reports
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-chevron-right"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </a>
                      </div>
                      <ul
                        style={{
                          display: reportSubmenuOpen ? "block" : "none",
                        }}
                      >
                        <li>
                          <a
                            className="is-submenu"
                            href="/admin-dashboards-personal-1.html"
                          >
                            <i className="lnil lnil-analytics-alt-1"></i>
                            <span>Financial report</span>
                          </a>
                        </li>
                        <li>
                          <a
                            className="is-submenu"
                            href="/admin-dashboards-personal-2.html"
                          >
                            <i className="lnil lnil-pie-chart"></i>
                            <span>Social report</span>
                          </a>
                        </li>
                        <li>
                          <a
                            className="is-submenu"
                            href="/admin-dashboards-personal-3.html"
                          >
                            <i className="lnil lnil-stats-up"></i>
                            <span>Growth report</span>
                          </a>
                        </li>
                      </ul>
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

export default Sidebar;
