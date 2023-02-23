import React, { useContext } from "react";
import useToggleSidebar from "../../../helpers/hooks/useToggleSidebar";
import { AppContext } from "../../context/AppContext";

const PageContent = ({ title, children }) => {
  const { cssContext } = useContext(AppContext);

  const toggleSidebar = useToggleSidebar();

  const viewWrapperClassNames = `view-wrapper ${
    cssContext.isPushedFull ? "is-pushed-full" : ""
  }`;

  return (
    <div className={viewWrapperClassNames}>
      <div className="page-content-wrapper">
        <div className="page-content is-relative">
          <div className="page-title has-text-centered">
            <div
              onClick={toggleSidebar}
              className="huro-hamburger nav-trigger push-block"
              data-sidebar="sidebar-block"
            >
              <span className="menu-toggle has-chevron">
                <span
                  className={`icon-box-toggle ${
                    cssContext.isPushedFull ? "active" : ""
                  }`}
                >
                  <span className="rotate">
                    <i className="icon-line-top"></i>
                    <i className="icon-line-center"></i>
                    <i className="icon-line-bottom"></i>
                  </span>
                </span>
              </span>
            </div>
            <div className="title-wrap">
              <h1 className="title is-4">{title}</h1>
            </div>

            {/* <div className="toolbar ml-auto">
              <div className="toolbar-link">
                <label className="dark-mode ml-auto">
                  <input type="checkbox" checked="" />
                  <span></span>
                </label>
              </div>

              <a
                className="toolbar-link right-panel-trigger"
                data-panel="languages-panel"
              >
                <img
                  src="assets/img/icons/flags/united-states-of-america.svg"
                  alt=""
                />
              </a>

              <div className="toolbar-notifications is-hidden-mobile">
                <div className="dropdown is-spaced is-dots is-right dropdown-trigger">
                  <div className="is-trigger" aria-haspopup="true">
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
                      className="feather feather-bell"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <span className="new-indicator pulsate"></span>
                  </div>
                  <div className="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                      <div className="heading">
                        <div className="heading-left">
                          <h6 className="heading-title">Notifications</h6>
                        </div>
                        <div className="heading-right">
                          <a
                            className="notification-link"
                            href="/admin-profile-notifications.html"
                          >
                            See all
                          </a>
                        </div>
                      </div>
                      <ul className="notification-list">
                        <li>
                          <a className="notification-item">
                            <div className="img-left">
                              <img
                                className="user-photo"
                                alt=""
                                src="https://via.placeholder.com/150x150"
                                data-demo-src="assets/img/avatars/photos/7.jpg"
                              />
                            </div>
                            <div className="user-content">
                              <p className="user-info">
                                <span className="name">Alice C.</span> left a
                                comment.
                              </p>
                              <p className="time">1 hour ago</p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a className="notification-item">
                            <div className="img-left">
                              <img
                                className="user-photo"
                                alt=""
                                src="https://via.placeholder.com/150x150"
                                data-demo-src="assets/img/avatars/photos/12.jpg"
                              />
                            </div>
                            <div className="user-content">
                              <p className="user-info">
                                <span className="name">Joshua S.</span> uploaded
                                a file.
                              </p>
                              <p className="time">2 hours ago</p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a className="notification-item">
                            <div className="img-left">
                              <img
                                className="user-photo"
                                alt=""
                                src="https://via.placeholder.com/150x150"
                                data-demo-src="assets/img/avatars/photos/13.jpg"
                              />
                            </div>
                            <div className="user-content">
                              <p className="user-info">
                                <span className="name">Tara S.</span> sent you a
                                message.
                              </p>
                              <p className="time">2 hours ago</p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a className="notification-item">
                            <div className="img-left">
                              <img
                                className="user-photo"
                                alt=""
                                src="https://via.placeholder.com/150x150"
                                data-demo-src="assets/img/avatars/photos/25.jpg"
                              />
                            </div>
                            <div className="user-content">
                              <p className="user-info">
                                <span className="name">Melany W.</span> left a
                                comment.
                              </p>
                              <p className="time">3 hours ago</p>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <a
                className="toolbar-link right-panel-trigger"
                data-panel="activity-panel"
              >
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
                  className="feather feather-grid"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </a>
            </div> */}
          </div>
          <div className="page-content-inner">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageContent;
