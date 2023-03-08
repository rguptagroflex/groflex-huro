import React, { useContext } from "react";
import useToggleSidebar from "../../../helpers/hooks/useToggleSidebar";
import { AppContext } from "../../context/AppContext";

const PageContent = ({
  title,
  children,
  titleIsBreadCrumb = false,
  breadCrumbData = [],
}) => {
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
            {titleIsBreadCrumb ? (
              <div className="title-wrap">
                <nav
                  className="breadcrumb has-bullet-separator"
                  aria-label="breadcrumbs"
                >
                  <ul>
                    {breadCrumbData.map((breadCrumb) => (
                      <li key={breadCrumb}>
                        <a href="#">
                          <span>{breadCrumb}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ) : (
              <div className="title-wrap">
                <h1 className="title is-4">{title}</h1>
              </div>
            )}
          </div>
          <div className="page-content-inner">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageContent;
