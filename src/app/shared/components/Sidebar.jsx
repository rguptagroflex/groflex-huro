import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Sidebar = () => {
  const { appContext, setAppContext } = useContext(AppContext);

  const mainSidebarClassNames = `main-sidebar ${
    appContext?.css?.isPushedFull ? "is-bordered" : ""
  }`;

  const sidebarPanelClassNames = `sidebar-panel is-generic ${
    appContext?.css?.isPushedFull ? "is-active" : ""
  }`;

  const toggleSidebar = () => {
    setAppContext({
      isPushedFull: !appContext?.css.isPushedFull,
    });
  };

  console.log(appContext);
  console.log(mainSidebarClassNames);
  return (
    <>
      <div className={mainSidebarClassNames}>This is main Sidebar</div>
      <div className={sidebarPanelClassNames}>
        <div className="subpanel-header">
          <h3 className="no-mb">Heading 101</h3>
        </div>
        <div className="inner">
          <div className="simplebar-wrapper">
            {/* <div className="simplebar-height-auto-observer-wrapper">
              <div className="simplebar-height-auto-observer" />
            </div> */}
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
                      <li className="has-children">
                        <div className="collapse-wrap">
                          <a href="javascript:void(0);" className="parent-link">
                            Tabs{" "}
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
                              className="feather feather-chevron-right"
                            >
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </a>
                        </div>
                        <ul>
                          <li>
                            <a
                              className="is-submenu"
                              href="/components-tabs-regular.html"
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
                                className="feather feather-circle"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                              </svg>
                              Regular Tabs
                            </a>
                          </li>
                          <li>
                            <a
                              className="is-submenu"
                              href="/components-tabs-slider.html"
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
                                className="feather feather-circle"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                              </svg>
                              Slider Tabs
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="simplebar-placeholder" />
                </div>
              </div>
            </div>
          </div>
          {/* <div
            className="simplebar-track simplebar-horizontal"
            style={{ visibility: "hidden" }}
          > */}
          {/* <div
              className="simplebar-scrollbar"
              style={{ width: 0, display: "none" }}
            /> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
