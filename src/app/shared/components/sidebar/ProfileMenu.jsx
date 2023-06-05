import React, { useState } from "react";
import OnClickOutside from "../onClickOutside/OnClickOutside";
import { FeatherIcon } from "../../featherIcon/FeatherIcon";

const ProfileMenu = ({ profileMenuIsActive, setProfileMenuIsActive }) => {
  // const [profileMenuIsActive, setProfileMenuIsActive] = useState(false);
  const toggleProfileDropdown = () => {
    setProfileMenuIsActive(!profileMenuIsActive);
  };
  const closeProfileMenu = () => {
    setProfileMenuIsActive(false);
  };

  return (
    <OnClickOutside onClickOutside={closeProfileMenu}>
      <div
        id="profile-menu"
        className={`dropdown profile-dropdown dropdown-trigger is-spaced is-up ${
          profileMenuIsActive ? "is-active" : ""
        }`}
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
            cursor: "pointer",
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
            <a href="#" className="dropdown-item is-media">
              <FeatherIcon
                size={15}
                name={"LogOut"}
                style={{ transform: "rotate(180deg)" }}
              />
              <span style={{ marginLeft: "8px" }}>Logout </span>
            </a>
            {/* <div className="dropdown-head">
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
            </div> */}
          </div>
        </div>
      </div>
    </OnClickOutside>
  );
};

export default ProfileMenu;
