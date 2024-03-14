import React, { useEffect, useState } from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import groflexService from "../../../services/groflex.service";
import oldConfig from "../../../../../oldConfig";
import { useParams } from "react-router-dom";

const TimesheetsBilling = () => {
  const { customerId } = useParams();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    customerNo: "",
    address: "",
    email: "",
  });
  useEffect(() => {
    fetchCustomerData();
  }, []);
  const fetchCustomerData = () => {
    groflexService
      .request(`${oldConfig.customer.resourceUrl}/${customerId}`, {
        auth: true,
      })
      .then((res) => {
        const response = res.body.data;
        setCustomerInfo({
          name: response.name,
          email: response.email,
          address: response.address.street,
          customerNo: response.number,
        });
      });
  };
  return (
    <PageContent title={"Invoiced times"}>
      <div className="timesheets-billing-main">
        <div className="columns is-multiline">
          <div className="column is-5 customer-info-card">
            <AdvancedCard type={"s-card"}>
              <h2 style={{ marginBottom: "10px" }}>{customerInfo.name}</h2>
              <div className="sub-info-box">
                <h2 className="sub-info-heading">Customer Number</h2>
                <h2 className="sub-info-heading">Addrss</h2>
              </div>
              <div className="sub-info-box">
                <h2>{customerInfo.customerNo}</h2>
                <h2>{customerInfo.address}</h2>
              </div>
              <div className="sub-info-box">
                <h2 className="sub-info-heading">Email</h2>
              </div>
              <div className="sub-info-box">
                <h2>{customerInfo.email}</h2>
              </div>
            </AdvancedCard>
          </div>
          <div className="column is-7">
            <AdvancedCard type={"s-card"}></AdvancedCard>
          </div>
        </div>
        <div className="columns is-multiline">
          <div className="column is-12">
            <AdvancedCard type={"s-card"}></AdvancedCard>
          </div>
        </div>
      </div>
    </PageContent>
  );
};

export default TimesheetsBilling;
