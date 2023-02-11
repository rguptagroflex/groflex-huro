import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const SharedLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default SharedLayout;
