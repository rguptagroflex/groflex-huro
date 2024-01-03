import React from "react";
import PageContent from "../../shared/components/pageContent/PageContent";
import { Button } from "../../shared/components/button/Button";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";

const DealsOverview = () => {
  const dealsSummary = [
    { heading: "Deal Amount", value: `₹${0}`, color: "#0071CA" },
    { heading: "Open Deal Amount", value: `₹${0}`, color: "#0071CA" },
    { heading: "Closed Won Amount", value: `₹${0}`, color: "#00A353" },
    { heading: "Lost Deal Amount", value: `₹${0}`, color: "#D94339" },
    { heading: "Average Deal Age", value: `${0} days`, color: "#0071CA" },
  ];
  const serviceCardDetails = [
    {
      serviceName: "Cargo service",
      serviceAmount: 1000,
      taskAssignedTo: "Michael Show",
      numberOfTasks: 1,
      taskDueDays: 0,
      status: "due",
    },
    {
      serviceName: "Cargo service",
      serviceAmount: 1000,
      taskAssignedTo: "Michael Show",
      numberOfTasks: 1,
      taskDueDays: 1,
      status: "due",
    },
    {
      serviceName: "Cargo service",
      serviceAmount: 1000,
      taskAssignedTo: "Michael Show",
      numberOfTasks: 0,
      taskDueDays: 1,
      status: "due",
    },
  ];

  const serviceColumns = [
    {
      serviceHeading: "Prospecting",
      serviceDeals: 3,
      serviceAmount: 2500,
      headerColor: "#00A353",
    },
    {
      serviceHeading: "Contact",
      serviceDeals: 3,
      serviceAmount: 2500,
      headerColor: "#888787",
    },
    {
      serviceHeading: "Proposal",
      serviceDeals: 3,
      serviceAmount: 2500,
      headerColor: "#0071CA",
    },
    {
      serviceHeading: "Won",
      serviceDeals: 3,
      serviceAmount: 2500,
      headerColor: "#00A353",
    },
    {
      serviceHeading: "On Hold",
      serviceDeals: 3,
      serviceAmount: 2500,
      headerColor: "#FFAA2C",
    },
  ];
  const createServiceColumn = (column) => {
    return (
      <div className="card-container">
        <div
          className="card-header"
          style={{ background: `${column.headerColor}` }}
        >
          {column.serviceHeading}
        </div>
        <div className="card-subheader">
          <span>{column.serviceDeals} deals</span>
          <span>{column.serviceAmount}</span>
        </div>
        <div className="card-cards">
          {serviceCardDetails.map((card) => {
            return createServiceCard(card);
          })}
        </div>
      </div>
    );
  };

  const createServiceCard = (card) => {
    return (
      <AdvancedCard type={"s-card"}>
        <div className="service-card-top">
          <span>{card.serviceName}</span>
          <span>{card.status}</span>
        </div>
        <div className="service-card-middle">
          <span>₹{card.serviceAmount}</span>
          <span>{card.numberOfTasks > 0 ? card.numberOfTasks : "No"} task</span>
        </div>
        <div className="service-card-bottom">
          <span>{card.taskAssignedTo}</span>
          {card.taskDueDays > 0 && (
            <span>Task due in {card.taskDueDays} days </span>
          )}
        </div>
      </AdvancedCard>
    );
  };

  return (
    <PageContent
      title="Deals Overview"
      titleIsBreadCrumb
      breadCrumbData={["Home", "CRM", "Deals"]}
      titleActionContent={
        <Button
          onClick={() =>
            navigate("/crm/createForm", {
              state: {
                title: "Create Lead",
                api: "Create lead api",
                infoTitle: "Lead Info",
              },
            })
          }
          isSuccess
        >
          Create Deal
        </Button>
      }
    >
      <div className="deals-overview-wrapper">
        <div className="deals-overview-summary-card">
          <AdvancedCard type={"s-card"}>
            {dealsSummary.map((deal) => (
              <div className="summary-card-container">
                <h5 className="container-heading">{deal.heading}</h5>
                <h5
                  className="container-value"
                  style={{ color: `${deal.color}` }}
                >
                  {deal.value}
                </h5>
              </div>
            ))}
          </AdvancedCard>
        </div>
        <div className="m-t-20" />
        <div className="deals-overview-details-card">
          <AdvancedCard type={"s-card"}>
            <div className="service-containers">
              {serviceColumns.map((column) => {
                return createServiceColumn(column);
              })}
            </div>
          </AdvancedCard>
        </div>
      </div>
    </PageContent>
  );
};

export default DealsOverview;
