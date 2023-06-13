import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import config from "../../../../config";
import { useDispatch, useSelector } from "react-redux";
import groflexService from "../../services/groflex.service";
import * as actionTypes from "../../redux/actions/actions.types";

const SharedLayout = () => {
  const navigate = useNavigate();
  const tenantData = useSelector((state) => state.accountData.tenantData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!config.checkLoginTokenIsValid()) {
      navigate("/login");
    } else {
      if (!tenantData) {
        groflexService
          .request(`${config.resourceHost}tenant`, {
            auth: true,
          })
          .then((res) => {
            // console.log(res.data, "TENANT DATA from Shared layout");
            dispatch({ type: actionTypes.SET_TENANT_DATA, payload: res.data });
            // navigate("/");
          });
      }
    }
  }, []);

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default SharedLayout;
