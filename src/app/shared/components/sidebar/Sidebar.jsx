import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import lightLogo from "../../../../assets/img/logos/logo/logo.svg";
import darkLogo from "../../../../assets/img/logos/logo/logo-light.svg";
import groflexShortLogo from "../../../../assets/img/logos/logo/groflex_short_icon.svg";
import { FeatherIcon } from "../../featherIcon/FeatherIcon";
import { NavLink } from "react-router-dom";
import SidebarPanel from "./SidebarPanel";
import ProfileMenu from "./ProfileMenu";

const sidebarRoutes = [
  {
    route: "/",
    icon: "Home",
  },
  {
    route: "/dashboard",
    icon: "Activity",
  },
  {
    route: "/estimates",
    icon: "TrendingUp",
  },
  {
    route: "/articles",
    icon: "Inbox",
  },
  {
    route: "/contacts",
    icon: "Users",
  },
  {
    route: "/expenses",
    icon: "ShoppingBag",
  },
  {
    route: "/cash-and-bank",
    icon: "CreditCard",
  },
];

const Sidebar = () => {
  const [profileMenuIsActive, setProfileMenuIsActive] = useState(false);
  const [currentPanelLinks, setCurrentPanelLinks] = useState([]);
  const { cssContext } = useContext(AppContext);
  const [currentLocation, setCurrentLocation] = useState(
    window.location.pathname
  );

  const getNaverMarginInfo = () => {
    if (currentLocation === "/") {
      return { margin: "150px 0 0 0", class: "from-top" };
    } else if (currentLocation.startsWith("/dashboard")) {
      return { margin: "214px 0 0 0", class: "from-top" };
    } else if (currentLocation.startsWith("/estimates")) {
      return { margin: "278px 0 0 0", class: "from-top" };
    } else if (currentLocation.startsWith("/articles")) {
      return { margin: "342px 0 0 0", class: "from-top" };
    } else if (currentLocation.startsWith("/contacts")) {
      return { margin: "406px 0 0 0", class: "from-top" };
    } else if (currentLocation.startsWith("/expenses")) {
      return { margin: "470px 0 0 0", class: "from-top" };
    } else if (currentLocation.startsWith("/cash-and-bank")) {
      return { margin: "534px 0 0 0", class: "from-top" };
    } else if (currentLocation.startsWith("/notifications")) {
      return { margin: "0 0 128px 0", class: "from-bottom" };
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

  const sidebarRoutesIsActiveClass = ({ isActive }) => {
    if (isActive) {
      return "is-active";
    }
  };
  const notificationsIsActiveClasses = () => {
    if (window.location.pathname === "/notifications") {
      return "is-active";
    }
  };

  return (
    <>
      {/* The main sidebar (thin one) */}
      <div className={mainSidebarClassNames}>
        <div className={mainSidebarBrandClassNames}>
          <a href="/">
            <img className="light-image" src={groflexShortLogo} alt="" />
            <img className="dark-image" src={groflexShortLogo} alt="" />
          </a>
        </div>
        <div className="sidebar-inner">
          {/* Sidebar routes */}
          <div
            className={`naver ${getNaverMarginInfo()?.class}`}
            style={{ margin: getNaverMarginInfo()?.margin, zIndex: 1 }}
          />
          <div
            className="naver from-bottom"
            style={{
              margin: "0 0 64px 0",
              display: profileMenuIsActive ? "inherit" : "none",
              zIndex: 1,
            }}
          />
          <ul className="icon-menu">
            {sidebarRoutes.map((linkItem) => {
              return (
                <li key={linkItem.route}>
                  <NavLink
                    style={({ isActive }) => {
                      if (isActive) {
                        return {
                          backgroundColor: "white",
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        };
                      }
                    }}
                    to={linkItem.route}
                    className={sidebarRoutesIsActiveClass}
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
              <NavLink
                style={({ isActive }) => {
                  if (isActive) {
                    return {
                      backgroundColor: "white",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    };
                  }
                }}
                onClick={() => setCurrentLocation("/notifications")}
                to="/notifications"
                className={notificationsIsActiveClasses}
              >
                <FeatherIcon name={"Bell"} />
              </NavLink>
            </li>
            {/* Profile menu */}
            <li
              style={{
                cursor: "auto",
                backgroundColor: profileMenuIsActive ? "white" : "",
              }}
              id="user-menu"
            >
              <ProfileMenu
                profileMenuIsActive={profileMenuIsActive}
                setProfileMenuIsActive={setProfileMenuIsActive}
              />
            </li>
          </ul>
        </div>
      </div>
      {/* Sidebar panel starts here */}

      <SidebarPanel heading="Heading 123" />
    </>
  );
};

export default Sidebar;
