import moment from "moment";
import React, { useEffect, useState } from "react";
import { SelectInput } from "../../shared/components/select/SelectInput";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";
import CreateChart from "../../shared/components/chartist/CreateChart";
import groflexService from "../../services/groflex.service";
import config from "../../../../config";
import DashboardChartCard from "./DashboardChartCard";

const DashboardExpenseTab = () => {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [expense, setExpenses] = useState([]);

  const [series, setSeries] = useState({
    paid: { count: 0, amount: 0 },
    cancelled: { count: 0, amount: 0 },
  });

  const fetchExpenses = () => {
    groflexService
      .request(
        `${config.resourceUrls.expenseChartData(date.startDate, date.endDate)}`,
        { auth: true, method: "GET" }
      )
      .then((res) => {
        let paid = {
          count: 0,
          amount: 0,
        };
        let cancelled = {
          count: 0,
          amount: 0,
        };
        setExpenses(res.body.data);
        res.body.data.forEach((item) => {
          if (item.status === "paid") {
            // paid += item.totalGross;
            paid.count = paid.count + 1;
            paid.amount += item.totalGross;
          }
          if (item.status === "cancelled") {
            // canceled += item.totalGross;
            cancelled.count = cancelled.count + 1;
            cancelled.amount += item.totalGross;
          }
        });

        setSeries({
          paid: paid,
          cancelled: cancelled,
        });

        // console.log("expense", res.body.data);
      });
  };

  useEffect(() => {
    fetchExpenses();
  }, [date]);

  const [chartType, setChartType] = useState(true);

  const chartData = {
    labels: ["Paid", "Canceled"],
    series: chartType
      ? [[series.paid.amount, series.cancelled.amount]]
      : [
          { value: series.paid.amount, className: "Paid" },
          { value: series.cancelled.amount, className: "Canceled" },
        ],
  };

  const chartOptions = chartType
    ? {
        width: "400px",
        height: "300px",
      }
    : {
        width: "400px",
        height: "300px",
        donut: true,
        donutWidth: 60,
        startAngle: 270,
        showLabel: true,
      };

  return (
    <DashboardChartCard
      className={"dashboard-invoice-expense-tab-wrapper"}
      headerClassName={"invoice-tab-header"}
      chartData={chartData}
      chartOptions={chartOptions}
      chartId={"expense"}
      chartType={chartType}
      setChartType={setChartType}
      chartEntries={[
        {
          label: "Paid",
          value: series.paid.amount,
          count: series.paid.count,
          color: "rgb(255, 209, 102)",
        },

        {
          label: "Cancelled",
          value: series.cancelled.amount,
          count: series.cancelled.count,
          color: "rgb(17, 138, 178)",
        },
      ]}
      setDate={setDate}
    />
  );
};

export default DashboardExpenseTab;
