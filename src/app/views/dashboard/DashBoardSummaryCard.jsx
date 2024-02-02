import React, { useEffect, useState } from "react";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";

const DashBoardSummaryCard = ({ heading, subHeading, cardData }) => {
  return (
    <AdvancedCard type={"s-card"}>
      <h4 className="dashboard-card-title">{heading}</h4>
      <div style={{ marginBottom: "10px" }}>{subHeading}</div>
      <div className="columns is-multiline receivable-container">
        <div className="column is-6">
          <h4 className="receivable-label">
            <span className="text-indicator-green"></span>
            Total Amount
          </h4>
          <h4 className="receivable-value">
            ₹ {parseFloat(cardData.totalAmount).toFixed(0)}{" "}
          </h4>
        </div>
        <div className="column is-6">
          <h4 className="receivable-label">
            <span className="text-indicator-red"></span>
            {"Over Due (>3 Days)"}
          </h4>
          <h4 className="receivable-overdue-value">
            ₹{" "}
            {parseFloat(cardData.totalAmount - cardData.overdue3Days).toFixed(
              0
            )}
          </h4>
        </div>
      </div>
    </AdvancedCard>
  );
};

export default DashBoardSummaryCard;
