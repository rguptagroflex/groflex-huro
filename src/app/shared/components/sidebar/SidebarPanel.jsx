import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FeatherIcon } from "../../featherIcon/FeatherIcon";

const SidebarPanel = ({ sidebarPanelClassNames, heading }) => {
  const [menuItems, setMenuItems] = useState({});
  const [menu1Open, setMenu1Open] = useState(false);
  const [menu2Open, setMenu2Open] = useState(false);

  const handleMenu1Click = () => {
    setMenu1Open(!menu1Open);
    setMenu2Open(false);
  };

  const handleMenu2Click = () => {
    setMenu1Open(false);
    setMenu2Open(!menu2Open);
  };

  return (
    // <div className={sidebarPanelClassNames}>
    //   <div className="subpanel-header">
    //     <h3 className="no-mb">{heading}</h3>
    //   </div>
    //   <div className="inner">
    //     <div className="simplebar-wrapper" style={{ margin: 0 }}>
    //       <div className="simplebar-height-auto-observer-wrapper">
    //         <div className="simplebar-height-auto-observer"></div>
    //       </div>
    //       <div className="simplebar-mask">
    //         <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
    //           <div
    //             className="simplebar-content-wrapper"
    //             style={{ height: "100%", overflow: "hidden scroll" }}
    //           >
    //             <div className="simplebar-content" style={{ padding: 0 }}>
    //               <ul>
    //                 <li>
    //                   <a href="/components-hub.html">Components Hub</a>
    //                 </li>
    //                 <li>
    //                   <a href="/components-avatars.html">Avatars</a>
    //                 </li>
    //                 <li className="has-children">
    //                   <div className="collapse-wrap">
    //                     <a className="parent-link">
    //                       Accordions{" "}
    //                       <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         width="24"
    //                         height="24"
    //                         viewBox="0 0 24 24"
    //                         fill="none"
    //                         stroke="currentColor"
    //                         strokeWidth="2"
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         className="feather feather-chevron-right"
    //                       >
    //                         <polyline points="9 18 15 12 9 6"></polyline>
    //                       </svg>
    //                     </a>
    //                   </div>
    //                   <ul>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-accordion-basic.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Accordion
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-accordion-collapse.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Collapse
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-accordion-images.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Image Accordion
    //                       </a>
    //                     </li>
    //                   </ul>
    //                 </li>
    //                 <li className="is-active">
    //                   <a href="/components-breadcrumb.html">Breadcrumb</a>
    //                 </li>
    //                 <li>
    //                   <a href="/components-calendar.html">Calendar</a>
    //                 </li>
    //                 <li>
    //                   <a href="/components-dropdown.html">Dropdown</a>
    //                 </li>
    //                 <li>
    //                   <a href="/components-icon-box.html">Icon Box</a>
    //                 </li>
    //                 <li>
    //                   <a href="/components-loader.html">Loader</a>
    //                 </li>
    //                 <li>
    //                   <a href="/components-messages.html">Message</a>
    //                 </li>
    //                 <li>
    //                   <a href="/components-modal.html">Modal</a>
    //                 </li>
    //                 <li>
    //                   <a href="/components-progress.html">Progress</a>
    //                 </li>
    //                 <li className="has-children active">
    //                   <div className="collapse-wrap">
    //                     <a className="parent-link">
    //                       Tabs{" "}
    //                       <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         width="24"
    //                         height="24"
    //                         viewBox="0 0 24 24"
    //                         fill="none"
    //                         stroke="currentColor"
    //                         strokeWidth="2"
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         className="feather feather-chevron-right"
    //                       >
    //                         <polyline points="9 18 15 12 9 6"></polyline>
    //                       </svg>
    //                     </a>
    //                   </div>
    //                   <ul style={{ display: "block" }}>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-tabs-regular.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Regular Tabs
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-tabs-slider.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Slider Tabs
    //                       </a>
    //                     </li>
    //                   </ul>
    //                 </li>
    //                 <li className="has-children">
    //                   <div className="collapse-wrap">
    //                     <a className="parent-link">
    //                       Flex Table{" "}
    //                       <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         width="24"
    //                         height="24"
    //                         viewBox="0 0 24 24"
    //                         fill="none"
    //                         stroke="currentColor"
    //                         strokeWidth="2"
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         className="feather feather-chevron-right"
    //                       >
    //                         <polyline points="9 18 15 12 9 6"></polyline>
    //                       </svg>
    //                     </a>
    //                   </div>
    //                   <ul>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-table-flex.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Base Table
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-table-flex-compact.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Compact Table
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-table-flex-media.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Media Table
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-table-flex-advanced.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Advanced Table
    //                       </a>
    //                     </li>
    //                   </ul>
    //                 </li>
    //                 <li>
    //                   <a href="/components-snacks.html">Snacks</a>
    //                 </li>
    //                 <li className="divider"></li>
    //                 <li className="has-children">
    //                   <div className="collapse-wrap">
    //                     <a className="parent-link">
    //                       Plugins{" "}
    //                       <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         width="24"
    //                         height="24"
    //                         viewBox="0 0 24 24"
    //                         fill="none"
    //                         stroke="currentColor"
    //                         strokeWidth="2"
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         className="feather feather-chevron-right"
    //                       >
    //                         <polyline points="9 18 15 12 9 6"></polyline>
    //                       </svg>
    //                     </a>
    //                   </div>
    //                   <ul>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-plugins-alertify.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Alertify
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-plugins-autocomplete.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Autocomplete
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-plugins-datepicker.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Datepicker
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-plugins-choices.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         ChoicesJs
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-plugins-nouislider.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         NoUI Slider
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-plugins-filepond.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Filepond
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-plugins-lightgallery.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Light Gallery
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-plugins-videogallery.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Video Gallery
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-plugins-video-player.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Video Player
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-plugins-toasts.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Toasts
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-plugins-webuipopover.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         WebUI Popover
    //                       </a>
    //                     </li>
    //                   </ul>
    //                 </li>
    //                 <li className="has-children">
    //                   <div className="collapse-wrap">
    //                     <a className="parent-link">
    //                       Rich Text{" "}
    //                       <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         width="24"
    //                         height="24"
    //                         viewBox="0 0 24 24"
    //                         fill="none"
    //                         stroke="currentColor"
    //                         strokeWidth="2"
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         className="feather feather-chevron-right"
    //                       >
    //                         <polyline points="9 18 15 12 9 6"></polyline>
    //                       </svg>
    //                     </a>
    //                   </div>
    //                   <ul>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-plugins-editor-summernote.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Summernote
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a
    //                         className="is-submenu"
    //                         href="/components-plugins-editor-sun.html"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="24"
    //                           height="24"
    //                           viewBox="0 0 24 24"
    //                           fill="none"
    //                           stroke="currentColor"
    //                           strokeWidth="2"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           className="feather feather-circle"
    //                         >
    //                           <circle cx="12" cy="12" r="10"></circle>
    //                         </svg>
    //                         Sun Editor
    //                       </a>
    //                     </li>
    //                   </ul>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div
    //         className="simplebar-placeholder"
    //         style={{ width: "auto", height: "705px" }}
    //       ></div>
    //     </div>
    //     <div
    //       className="simplebar-track simplebar-horizontal"
    //       style={{ visibility: "hidden" }}
    //     >
    //       <div
    //         className="simplebar-scrollbar"
    //         style={{ width: 0, display: "none" }}
    //       ></div>
    //     </div>
    //     <div
    //       className="simplebar-track simplebar-vertical"
    //       style={{ visibility: "visible" }}
    //     >
    //       <div
    //         className="simplebar-scrollbar"
    //         // style="height: 667px; display: block; transform: translate3d(0px, 0px, 0px);"
    //         style={{
    //           height: "667px",
    //           display: "block",
    //           transform: "translate3d(0px, 0px, 0px)",
    //         }}
    //       ></div>
    //     </div>
    //   </div>
    //   {/* <div className="inner">
    //     <div className="simplebar-wrapper">
    //       <div className="simplebar-height-auto-observer-wrapper">
    //         <div className="simplebar-height-auto-observer"></div>
    //       </div>
    //       <div className="simplebar-mask">
    //         <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
    //           <div
    //             className="simplebar-content-wrapper"
    //             style={{ height: "100%", overflow: "hidden scroll" }}
    //           >
    //             <div className="simplebar-content" style={{ padding: 0 }}>
    //               <ul>
    //                 <li>Link 1</li>
    //                 <li>Link 2</li>
    //                 <li>Link 3</li>
    //                 <li>Link 4</li>
    //               </ul>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div> */}
    // </div>
    <div className={sidebarPanelClassNames}>
      <div className="subpanel-header">
        <div className="dropdown project-dropdown dropdown-trigger is-spaced">
          <div className="h-avatar is-small">
            <span className="avatar is-fake is-h-green">
              <span>H</span>
            </span>
          </div>
          <span className="status-indicator"></span>
        </div>
        <h3 className="no-mb">{heading}</h3>
      </div>

      <div className="inner">
        <div className="simplebar-wrapper">
          <div className="simplebar-height-auto-observer-wrapper">
            <div className="simplebar-height-auto-observer"></div>
          </div>

          <div className="simplebar-mask">
            <div className="simplebar-offset">
              <div className="simplebar-content-wrapper">
                <div className="simplebar-content">
                  <ul>
                    <li>
                      <a href="">Link 1</a>
                    </li>

                    <li
                      className={`has-children ${menu1Open ? "active" : ""}`}
                      onClick={handleMenu1Click}
                    >
                      <div className="collapse-wrap">
                        <Link to={"#"} className="parent-link">
                          Link 2 <FeatherIcon name={"ChevronRight"} />
                        </Link>
                      </div>

                      <ul
                        style={{
                          display: menu1Open ? "block" : "none",
                        }}
                      >
                        <li>
                          <a className="is-submenu" href="#">
                            <i data-feather="circle"></i>
                            Link 1
                          </a>
                        </li>

                        <li className="is-active">
                          <a className="is-submenu" href="#">
                            <i data-feather="circle"></i>
                            Link 2
                          </a>
                        </li>

                        <li>
                          <a className="is-submenu" href="#">
                            <i data-feather="circle"></i>
                            Link 3
                          </a>
                        </li>

                        <li>
                          <a className="is-submenu" href="#">
                            <i data-feather="circle"></i>
                            Link 4
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li
                      className={`has-children ${menu2Open ? "active" : ""}`}
                      onClick={handleMenu2Click}
                    >
                      <div className="collapse-wrap">
                        <Link to={"#"} className="parent-link">
                          Link 3<FeatherIcon name={"ChevronRight"} />
                        </Link>
                      </div>

                      <ul
                        style={{
                          display: menu2Open ? "block" : "none",
                        }}
                      >
                        <li>
                          <a className="is-submenu" href="#">
                            <i data-feather="circle"></i>
                            Link 1
                          </a>
                        </li>

                        <li className="is-active">
                          <a className="is-submenu" href="#">
                            <i data-feather="circle"></i>
                            Link 2
                          </a>
                        </li>

                        <li>
                          <a className="is-submenu" href="#">
                            <i data-feather="circle"></i>
                            Link 3
                          </a>
                        </li>

                        <li>
                          <a className="is-submenu" href="#">
                            <i data-feather="circle"></i>
                            Link 4
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarPanel;
