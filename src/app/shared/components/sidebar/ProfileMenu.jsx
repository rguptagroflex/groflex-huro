import React from "react";
import OnClickOutside from "../onClickOutside/OnClickOutside";
import { FeatherIcon } from "../../featherIcon/FeatherIcon";
import GroflexService from "../../../services/groflex.service";

const ProfileMenu = ({ profileMenuIsActive, setProfileMenuIsActive }) => {
  const toggleProfileDropdown = () => {
    setProfileMenuIsActive(!profileMenuIsActive);
  };
  const closeProfileMenu = () => {
    setProfileMenuIsActive(false);
  };

  const handleLogout = () => {
    GroflexService.logout();
  };
  return (
    <OnClickOutside
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClickOutside={closeProfileMenu}
    >
      <div
        id="profile-menu"
        className={`dropdown profile-dropdown dropdown-trigger is-spaced is-up ${
          profileMenuIsActive ? "is-active" : ""
        }`}
        style={{
          width: "100% !important",
          height: "100%",
        }}
      >
        <div
          onClick={toggleProfileDropdown}
          style={{
            margin: "auto",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // cursor: "pointer",
          }}
        >
          <FeatherIcon name={"User"} />
        </div>
        <div className="dropdown-menu" role="menu">
          <div
            className="dropdown-content"
            style={{
              padding: "10px",
            }}
          >
            <div
              className="file is-boxed is-default"
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                alt="Not found"
                style={{
                  width: "170px",
                  height: "48px",
                  objectFit: "contain",
                }}
                src={"https://picsum.photos/200"}
              />
            </div>
            <div
              className="meta"
              style={{
                padding: "0px 10px",
                fontFamily: "Inter",
                fontWeight: "600",
                fontSize: "12px",
                color: "#888787",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              <span style={{ margin: "10px 0" }}>Groflex Solutions</span>
            </div>
            <hr style={{ margin: "10px 0" }} />
            <a href="#" className="dropdown-item is-media">
              <FeatherIcon name={"Settings"} size={15} />
              <span style={{ marginLeft: "8px" }}>Account Settings </span>
            </a>
            <a href="#" className="dropdown-item is-media">
              <FeatherIcon name={"Users"} size={15} />
              <span style={{ marginLeft: "8px" }}>Team </span>
            </a>
            <hr style={{ margin: "10px 0" }} />
            <a href="#" className="dropdown-item is-media">
              <FeatherIcon name={"HelpCircle"} size={15} />
              <span style={{ marginLeft: "8px" }}>Help </span>
            </a>
            <a href="#" className="dropdown-item is-media">
              <FeatherIcon name={"Book"} size={15} />
              <span style={{ marginLeft: "8px" }}>Privacy Policy </span>
            </a>
            <hr style={{ margin: "10px 0" }} />
            <a
              onClick={handleLogout}
              href="#"
              className="dropdown-item is-media"
            >
              <FeatherIcon
                size={15}
                name={"LogOut"}
                style={{ transform: "rotate(180deg)" }}
              />
              <span style={{ marginLeft: "8px" }}>Logout </span>
            </a>
          </div>
        </div>
      </div>
    </OnClickOutside>
  );
};

export default ProfileMenu;
