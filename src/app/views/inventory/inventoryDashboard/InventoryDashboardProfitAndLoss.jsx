import React from "react";
import CreateChart from "../../../shared/components/chartjs/CreateChart";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import { SelectInput } from "../../../shared/components/select/SelectInput";

const InventoryDashboardProfitAndLoss = () => {
  return (
    <div className="dashboard-sales-expense-stats-wrapper columns is-multiline">
      <div className="column is-12">
        <AdvancedCard type={"s-card"}>
          <h4
            className="inventorydashboard-card-title"
            // style={{ fontSize: "22px", marginBottom: "30px" }}
          >
            Profit and Loss
          </h4>
          <div className="columns is-mulitline">
            <div className="column is-3">
              {/* <SelectInput
              //options={dateOptions}
              placeholder={"None"}
             // onChange={handleDateDropDown}
              //value={dateDropDown}
            /> */}
            </div>
            <div
              className="column is-9 columns"
              style={{ justifyContent: "flex-end" }}
            >
              <div className="column is-4">
                <AdvancedCard type={"s-card"} style={{ padding: "0" }}>
                  <div className="total-sales-label">Profit</div>
                  <div className="total-sales-value">
                    ₹ 0{/* {parseFloat(totalValues.totalSales).toFixed(0)} */}
                  </div>
                </AdvancedCard>
              </div>
              <div className="column is-4">
                <AdvancedCard type={"s-card"} style={{ padding: "0" }}>
                  <div className="total-expense-label">Loss</div>
                  <div className="total-expense-value">
                    ₹ 0
                    {/* {parseFloat(totalValues.totalExpenses).toFixed(0)} */}
                  </div>
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
              <span className="category-text">Profit</span>
            </div>
            <div
              className="column is-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span
                className="category-dot"
                style={{ backgroundColor: "rgb(0, 113, 202)" }}
              ></span>
              <span className="category-text">Loss</span>
            </div>
          </div>

          <div className="column is-12 bar-chart-wrapper">
            {/* <CreateChart
          data={chartData}
          options={chartOptions}
          chartType={"barChart"}
          chartId={"sales-expense"}
        /> */}
            <CreateChart
            //  chartData={chartData}
            //chartOptions={chartOptions}
            //chartType={"barChart"}
            />
          </div>
        </AdvancedCard>
      </div>
    </div>
  );
};

export default InventoryDashboardProfitAndLoss;
