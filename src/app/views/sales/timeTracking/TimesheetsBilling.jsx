import React, { useEffect, useState } from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import groflexService from "../../../services/groflex.service";
import oldConfig from "../../../../../oldConfig";
import { useNavigate, useParams } from "react-router-dom";
import { ListAdvancedComponent } from "../../../shared/components/list-advanced/ListAdvancedComponent";
import Timetracking from "../../../models/timetracking.model";
import { formatCurrency } from "../../../helpers/formatCurrency";
import { CustomShowHeaderSum } from "../../../shared/components/list-advanced/CustomShowHeaderSum";
import { Button } from "../../../shared/components/button/Button";
import { ButtonGroup } from "../../../shared/components/button/buttonGroup/ButtonGroup";

const TimesheetsBilling = () => {
  const { customerId, status } = useParams();
  const navigate = useNavigate();
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

  const fetchInvoiceData = () => {
    groflexService
      .request(
        `${oldConfig.timetracking.requestUrl.billing}${customerId}?status=${status}`,
        { auth: true }
      )
      .then((res) => {});
  };
  const actions = [
    { name: "Edit", icon: "edit" },
    { name: "Delete", icon: "trash-alt" },
    { name: "Convert to Deal", icon: "trash-alt" },
  ];

  const handleActionClick = () => {};
  return (
    <PageContent
      title={customerInfo.name}
      titleActionContent={
        status === "open" && (
          <ButtonGroup>
            <Button onClick={() => navigate("/contacts-create")} isSecondary>
              Create Invoice
            </Button>
            <Button onClick={() => navigate("/contacts-create")} isSuccess>
              Record Time
            </Button>
          </ButtonGroup>
        )
      }
    >
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
            <AdvancedCard type={"s-card"}>
              <ListAdvancedComponent
                onRowClicked={(e) => {
                  status === "invoiced" &&
                    navigate(`/sales/invoices/${e.data.invoice.id}`);
                }}
                responseDataMapFunc={(timetrackings) => {
                  const result = timetrackings.map((timetracking) => {
                    return new Timetracking(timetracking);
                  });

                  return result;
                }}
                onActionClick={handleActionClick}
                columnDefs={[
                  {
                    field: "date",
                    headerName: "Date",
                    valueGetter: (evt) => {
                      return evt.data.date;
                    },
                  },
                  {
                    field: "activity",
                    headerName: "Activity",
                    valueGetter: (evt) => {
                      return evt.data.taskDescriptionPrefix;
                    },
                  },
                  {
                    field: "durationInMinutes",
                    headerName: "Duration",
                    valueGetter: (evt) => {
                      return evt.data.trackedTimeString;
                    },
                  },
                  {
                    field: "priceTotal",
                    headerName: "Amount",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                    headerComponent: CustomShowHeaderSum,
                    headerComponentParams: {
                      value: "priceTotal",
                      headerName: "Amount",
                    },
                  },
                ]}
                fetchUrl={`${oldConfig.timetracking.requestUrl.billing}${customerId}?status=${status}`}
                actionMenuData={actions}
              />
            </AdvancedCard>
          </div>
        </div>
      </div>
    </PageContent>
  );
};

export default TimesheetsBilling;
