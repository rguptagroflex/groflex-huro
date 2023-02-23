import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import lightLogo from "../../../../assets/img/logos/logo/logo.svg";
import darkLogo from "../../../../assets/img/logos/logo/logo-light.svg";
import useThemeSwitch from "../../../helpers/hooks/useThemeSwitch";
import { FeatherIcon } from "../../featherIcon/FeatherIcon";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  // const currentLocation = window.location.pathname;
  const { cssContext } = useContext(AppContext);
  const [profileMenuIsActive, setProfileMenuIsActive] = useState(false);
  const [naverMarginTop, setNaverMarginTop] = useState(150);

  useEffect(() => {
    if (window.location.pathname === "/") {
      setNaverMarginTop(150);
    } else if (window.location.pathname === "/page1") {
      setNaverMarginTop(214);
    } else if (window.location.pathname === "/page2") {
      setNaverMarginTop(278);
    } else if (window.location.pathname === "/page3") {
      setNaverMarginTop(342);
    }
  }, []);

  const handleProfileDropdown = () => {
    setProfileMenuIsActive(!profileMenuIsActive);
  };

  const mainSidebarClassNames = `main-sidebar ${
    cssContext?.isPushedFull ? "is-bordered" : ""
  }`;
  const mainSidebarBrandClassNames = `sidebar-brand ${
    cssContext?.isPushedFull ? "is-bordered" : ""
  }`;
  const sidebarPanelClassNames = `sidebar-panel is-generic ${
    cssContext?.isPushedFull ? "is-active" : ""
  }`;
  const profileDropDownClassNames = `dropdown profile-dropdown dropdown-trigger is-spaced is-up ${
    profileMenuIsActive ? "is-active" : ""
  }`;
  console.log(window.location.pathname, naverMarginTop);
  return (
    <>
      {/* The main sidebar (thin one) */}
      <div className={mainSidebarClassNames}>
        <div className={mainSidebarBrandClassNames}>
          <a href="/">
            <img className="light-image" src={lightLogo} alt="" />
            <img className="dark-image" src={darkLogo} alt="" />
          </a>
        </div>
        <div className="sidebar-inner">
          {/* Quote type active */}
          <div
            className="naver from-top"
            style={{ marginTop: `${naverMarginTop}px` }}
          />
          <ul className="icon-menu">
            <li>
              <a
                href="/"
                data-content="Dashboards"
                className={`${
                  window.location.pathname === "/" ? "is-active" : ""
                }`}
              >
                <FeatherIcon name={"Activity"} />
              </a>
            </li>
            <li>
              <a
                className={`${
                  window.location.pathname === "/page1" ? "is-active" : ""
                }`}
                href="/page1"
                data-content="Dashboards"
              >
                <FeatherIcon name={"Grid"} />
              </a>
            </li>
            <li>
              <a
                className={`${
                  window.location.pathname === "/page2" ? "is-active" : ""
                }`}
                href="/page2"
                data-content="Dashboards"
              >
                <FeatherIcon name={"Box"} />
              </a>
            </li>
            <li>
              <a
                className={`${
                  window.location.pathname === "/page3" ? "is-active" : ""
                }`}
                href="/page3"
                data-content="Dashboards"
              >
                <FeatherIcon name={"Cpu"} />
              </a>
            </li>
          </ul>

          {/* Commented the search button because of confusion */}
          <ul className="bottom-menu">
            {/* <li className="right-panel-trigger" data-panel="search-panel">
              <a href="/" id="open-search" data-content="Search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-search sidebar-svg"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </a>
              <a href="/" id="close-search" className="is-hidden is-inactive">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-x sidebar-svg"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </a>
            </li> */}

            <li>
              <a href="/" id="open-settings" data-content="Settings">
                <FeatherIcon name={"Settings"} />
              </a>
            </li>
            {/* Profile menu */}
            <li id="user-menu" onClick={handleProfileDropdown}>
              <div id="profile-menu" className={profileDropDownClassNames}>
                <img
                  src="https://via.placeholder.com/150x150"
                  data-demo-src="assets/img/avatars/photos/8.jpg"
                  alt=""
                />
                <span className="status-indicator"></span>
                <div className="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    <div className="dropdown-head">
                      <div className="h-avatar is-large">
                        <img
                          className="avatar"
                          src="https://via.placeholder.com/150x150"
                          data-demo-src="assets/img/avatars/photos/8.jpg"
                          alt=""
                        />
                      </div>
                      <div className="meta">
                        <span>Erik Kovalsky</span>
                        <span>Product Manager</span>
                      </div>
                    </div>
                    <a
                      href="/admin-profile-view.html"
                      className="dropdown-item is-media"
                    >
                      <div className="icon">
                        <i className="lnil lnil-user-alt"></i>
                      </div>
                      <div className="meta">
                        <span>Profile</span>
                        <span>View your profile</span>
                      </div>
                    </a>
                    <a className="dropdown-item is-media layout-switcher">
                      <div className="icon">
                        <i className="lnil lnil-layout"></i>
                      </div>
                      <div className="meta">
                        <span>Layout</span>
                        <span>Switch to admin/webapp</span>
                      </div>
                    </a>
                    <hr className="dropdown-divider" />
                    <a href="#" className="dropdown-item is-media">
                      <div className="icon">
                        <i className="lnil lnil-briefcase"></i>
                      </div>
                      <div className="meta">
                        <span>Projects</span>
                        <span>All my projects</span>
                      </div>
                    </a>
                    <a href="#" className="dropdown-item is-media">
                      <div className="icon">
                        <i className="lnil lnil-users-alt"></i>
                      </div>
                      <div className="meta">
                        <span>Team</span>
                        <span>Manage your team</span>
                      </div>
                    </a>
                    <hr className="dropdown-divider" />
                    <a href="#" className="dropdown-item is-media">
                      <div className="icon">
                        <i className="lnil lnil-cog"></i>
                      </div>
                      <div className="meta">
                        <span>Settings</span>
                        <span>Account settings</span>
                      </div>
                    </a>
                    <hr className="dropdown-divider" />
                    <div className="dropdown-item is-button">
                      <button className="button h-button is-primary is-raised is-fullwidth logout-button">
                        <span className="icon is-small">
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
                            className="feather feather-log-out"
                          >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                          </svg>
                        </span>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* Sidebar panel starts here */}
      <div className={sidebarPanelClassNames}>
        <div className="subpanel-header">
          <h3 className="no-mb">Heading 101</h3>
        </div>
        <div className="inner">
          <div className="simplebar-wrapper">
            <div className="simplebar-mask">
              <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
                <div
                  className="simplebar-content-wrapper"
                  style={{ height: "100%", overflow: "hidden scroll" }}
                >
                  <div className="simplebar-content" style={{ padding: 0 }}>
                    <ul>
                      <li>Link 1</li>
                      <li>Link 2</li>
                      <li>Link 3</li>
                      <li>Link 4</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
