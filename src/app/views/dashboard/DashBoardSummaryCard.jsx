import React, { useEffect, useState } from "react";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import groflexService from "../../services/groflex.service";
import config from "../../../../config";
import moment from "moment";
const DashBoardSummaryCard = ({ heading, subHeading }) => {
  const [receivablesCard, setReceivablesCard] = useState({
    invoices: [],
    totalAmount: 0,
    overdue3Days: 0,
    overdue15Days: 0,
    overdue45Days: 0,
    overdueAbove45days: 0,
  });

  useEffect(() => {
    fetchRecievablesData();
  }, []);
  const fetchRecievablesData = async () => {
    const response = await groflexService.request(
      `${config.resourceUrls.recievables}`,
      { auth: true }
    );
    console.log("Api: ", response);
    const invoices = response.body.data;
    const lockedInvoices = invoices.filter(
      (invoice) => invoice.state === "locked"
    );
    const totalAmount = invoices.reduce(
      (sum, item) => sum + item.outstandingAmount,
      0
    );
    const overdue3Days = findOverdueByDays(3, invoices);
    const overdue15Days = findOverdueByDays(15, invoices) - overdue3Days;
    const overdue45Days =
      findOverdueByDays(45, invoices) - findOverdueByDays(15, invoices);
    const overdueAbove45days = totalAmount - findOverdueByDays(45, invoices);

    setReceivablesCard({
      invoices: lockedInvoices,
      totalAmount: totalAmount,
      overdue3Days: overdue3Days,
      overdue15Days: overdue15Days,
      overdue45Days: overdue45Days,
      overdueAbove45days: overdueAbove45days,
    });
  };
  const findOverdueByDays = (days, invoices) => {
    return invoices.reduce((sum, item) => {
      const noOfDaysDue = moment().diff(item.dueToDate, "days");
      if (noOfDaysDue > days) return sum + 0;
      return sum + item.outstandingAmount;
    }, 0);
  };
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
            ₹ {parseFloat(receivablesCard.totalAmount).toFixed(0)}{" "}
          </h4>
        </div>
        <div className="column is-6">
          <h4 className="receivable-label">
            <span className="text-indicator-red"></span>
            {"Over Due (>3 Days)"}
          </h4>
          <h4 className="receivable-overdue-value">
            ₹{" "}
            {parseFloat(
              receivablesCard.totalAmount - receivablesCard.overdue3Days
            ).toFixed(0)}
          </h4>
        </div>
      </div>
    </AdvancedCard>
  );
};

export default DashBoardSummaryCard;
