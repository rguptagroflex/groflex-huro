import React from "react";
import useToggleSidebar from "../../../helpers/hooks/useToggleSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PageContent = ({
  title,
  children,
  titleIsBreadCrumb = false,
  breadCrumbData = [],
}) => {
  const { sidebarIsActive } = useSelector((state) => state.themeData);
  const toggleSidebar = useToggleSidebar();
  const navigate = useNavigate();

  const viewWrapperClassNames = `view-wrapper ${
    sidebarIsActive ? "is-pushed-full" : ""
  }`;
  // console.log(sidebarIsActive, "sidebarIsActive from redux store");
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
                    sidebarIsActive ? "active" : ""
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
