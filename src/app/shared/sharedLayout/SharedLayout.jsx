import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import config from "../../../../config";

const SharedLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!config.checkLoginTokenIsValid()) {
      navigate("/login");
    }
  });
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default SharedLayout;
