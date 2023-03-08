import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import lightLogo from "../../../../assets/img/logos/logo/logo.svg";
import darkLogo from "../../../../assets/img/logos/logo/logo-light.svg";
import { FeatherIcon } from "../../featherIcon/FeatherIcon";
import { NavLink } from "react-router-dom";
import SidebarPanel from "./SidebarPanel";
import ProfileMenu from "./ProfileMenu";

const Sidebar = () => {
  const { cssContext } = useContext(AppContext);
  const [currentLocation, setCurrentLocation] = useState(
    window.location.pathname
  );

  const getNaverMarginTop = () => {
    if (currentLocation === "/") {
      return 150;
    } else if (currentLocation === "/page1") {
      return 214;
    } else if (currentLocation === "/page2") {
      return 278;
    } else if (currentLocation === "/page3") {
      return 342;
    }
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

  const sidebarRoutesIsActive = ({ isActive }) => (isActive ? "is-active" : "");

  const sidebarRoutes = [
    {
      route: "/",
      icon: "Activity",
    },
    {
      route: "/page1",
      icon: "Grid",
    },
    {
      route: "/page2",
      icon: "Box",
    },
    {
      route: "/page3",
      icon: "Cpu",
    },
  ];

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
          {/* Sidebar routes */}
          <div
            className="naver from-top"
            style={{ marginTop: `${getNaverMarginTop()}px` }}
          />
          <ul className="icon-menu">
            {sidebarRoutes.map((linkItem) => {
              return (
                <li key={linkItem.route}>
                  <NavLink
                    to={linkItem.route}
                    className={sidebarRoutesIsActive}
                    onClick={() => {
                      setCurrentLocation(linkItem.route);
                    }}
                  >
                    <FeatherIcon name={linkItem.icon} />
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <ul className="bottom-menu">
            <li style={{ cursor: "auto" }}>
              <NavLink to="/account-settings">
                <FeatherIcon name={"Settings"} />
              </NavLink>
            </li>
            {/* Profile menu */}
            <li style={{ cursor: "auto" }} id="user-menu">
              <ProfileMenu />
            </li>
          </ul>
        </div>
      </div>
      {/* Sidebar panel starts here */}
      <SidebarPanel
        heading="Heading 123"
        sidebarPanelClassNames={sidebarPanelClassNames}
      />
    </>
  );
};

export default Sidebar;
