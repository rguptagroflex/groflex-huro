import React, { useState } from "react";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import { SelectInput } from "../../shared/components/select/SelectInput";
import moment from "moment";

const DashboardSalesExpenseStats = () => {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  const handleDateDropDown = (option) => {
    setDate(option.value);
  };

  const dateOptions = [
    {
      label: moment().format("MMMM"),
      value: {
        startDate: moment().startOf("month").format(),
        endDate: moment().endOf("month").format(),
      },
    },
    {
      label: moment().subtract(1, "months").format("MMMM"),
      value: {
        startDate: moment().subtract(1, "months").startOf("month").format(),
        endDate: moment().subtract(1, "months").endOf("month").format(),
      },
    },
    {
      label: moment().subtract(2, "months").format("MMMM"),
      value: {
        startDate: moment().subtract(2, "months").startOf("month").format(),
        endDate: moment().subtract(2, "months").endOf("month").format(),
      },
    },
    {
      label: `Quarter ${moment().startOf("quarter").format("Q/YYYY")}`,
      value: {
        startDate: moment().startOf("quarter").format(),
        endDate: moment().endOf("quarter").format(),
      },
    },
    {
      label: `Quarter ${moment()
        .subtract(3, "months")
        .startOf("quarter")
        .format("Q/YYYY")}`,
      value: {
        startDate: moment().subtract(3, "months").startOf("quarter").format(),
        endDate: moment()
          .subtract(3, "months")
          .endOf("quarter")
          .format("DD MMMM YYYY"),
      },
    },
    {
      label: `Quarter ${moment()
        .subtract(6, "months")
        .startOf("quarter")
        .format("Q/YYYY")}`,
      value: {
        startDate: moment().subtract(6, "months").startOf("quarter").format(),
        endDate: moment().subtract(6, "months").endOf("quarter").format(),
      },
    },
  ];
  return (
    <div className="dashboard-sales-expense-stats-wrapper columns is-multiline">
      <div className="column is-10">
        <AdvancedCard type={"s-card"}>
          <h4
            className="dashboard-card-title"
            style={{ fontSize: "22px", marginBottom: "30px" }}
          >
            Sales and expenses statistics
          </h4>
          <div className="columns is-mulitline">
            <div className="column is-3">
              <SelectInput
                options={dateOptions}
                placeholder={"None"}
                onChange={handleDateDropDown}
                value={date}
              />
            </div>
            <div
              className="column is-9 columns"
              style={{ justifyContent: "flex-end" }}
            >
              <div className="column is-4">
                <AdvancedCard type={"s-card"} style={{ padding: "0" }}>
                  <div className="total-sales-label">Total Sales</div>
                  <div className="total-sales-value">₹ 769</div>
                </AdvancedCard>
              </div>
              <div className="column is-4">
                <AdvancedCard type={"s-card"} style={{ padding: "0" }}>
                  <div className="total-expense-label">Total Expenses</div>
                  <div className="total-expense-value">₹ 40</div>
                </AdvancedCard>
              </div>
            </div>
          </div>

          <div
            className="columns is-mulitline"
            style={{ justifyContent: "flex-end" }}
          >
            <div
              className="column is-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span
                className="category-dot"
                style={{ backgroundColor: "rgb(0, 163, 83)" }}
              ></span>
              <span className="category-text">Sales</span>
            </div>
            <div
              className="column is-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span
                className="category-dot"
                style={{ backgroundColor: "rgb(0, 113, 202)" }}
              ></span>
              <span className="category-text">Expense</span>
            </div>
          </div>

          <div className="column is-12 bar-chart-wrapper"></div>
        </AdvancedCard>
      </div>
    </div>
  );
};

export default DashboardSalesExpenseStats;
