import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const PageContent = ({ title, children }) => {
  const { appContext, setAppContext } = useContext(AppContext);

  const toggleSidebar = () => {
    setAppContext({
      css: {
        isPushedFull: !appContext?.css?.isPushedFull,
      },
    });
  };

  const viewWrapperClassNames = `view-wrapper ${
    appContext?.css?.isPushedFull ? "is-pushed-full" : ""
  }`;

  console.log(appContext);
  return (
    <div className={viewWrapperClassNames}>
      <div className="page-content-wrapper">
        <div className="page-content is-relative">
          <div className="page-title has-text-centered">
            <div
              onClick={toggleSidebar}
              className="huro-hamburger nav-trigger push-resize"
              data-sidebar="home-sidebar"
            >
              <span className="menu-toggle has-chevron">
                <span
                  className={`icon-box-toggle ${
                    appContext?.css?.isPushedFull ? "active" : ""
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
              <div className="title is-4">{title}</div>
            </div>
          </div>
          <div className="page-content-inner">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageContent;
