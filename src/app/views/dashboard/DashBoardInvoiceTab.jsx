import moment from "moment";
import React, { useEffect, useState } from "react";
import { SelectInput } from "../../shared/components/select/SelectInput";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";

import CreateChart from "../../shared/components/chartist/CreateChart";
import groflexService from "../../services/groflex.service";
import config from "../../../../config";
import DashboardChartCard from "./DashboardChartCard";

const DashBoardInvoiceTab = () => {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [series, setSeries] = useState({
    paid: { count: 0, amount: 0 },
    canceled: { count: 0, amount: 0 },
    open: { count: 0, amount: 0 },
  });
  const [invoiceList, setInvoiceList] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const fetchInvoiceList = () => {
    console.log(moment());
    groflexService
      .request(
        `${config.resourceUrls.invoiceChartData(date.startDate, date.endDate)}`,
        { auth: true, method: "GET" }
      )
      .then((res) => {
        let total = 0;

        let paid = {
          count: 0,
          amount: 0,
        };
        let canceled = {
          count: 0,
          amount: 0,
        };
        let open = {
          count: 0,
          amount: 0,
        };
        console.log("Invoice List", res);
        setInvoiceList(res.body.data);
        res.body.data.forEach((item) => {
          if (item.state === "paid" || item.state === "locked") {
            total += item.totalGross;
          }
          if (item.state === "paid") {
            // paid += item.totalGross;
            paid.count = paid.count + 1;
            paid.amount += item.totalGross;
          }
          if (item.state === "locked") {
            // open += item.totalGross;
            open.count = open.count + 1;
            open.amount += item.totalGross;
          }
          if (item.state === "cancelled") {
            // canceled += item.totalGross;
            canceled.count = canceled.count + 1;
            canceled.amount += item.totalGross;
          }
        });
        setSeries({
          paid: paid,
          open: open,
          canceled: canceled,
        });

        setTotalValue(total);
      });
  };
  useEffect(() => {
    fetchInvoiceList();
  }, [date]);

  const [chartType, setChartType] = useState(true);

  const chartData = {
    labels: ["Open", "Paid", "Canceled"],
    series: chartType
      ? [[series.open.amount, series.paid.amount, series.canceled.amount]]
      : [
          { value: series.open.amount, className: "Open" },
          { value: series.paid.amount, className: "Paid" },
          { value: series.canceled.amount, className: "Canceled" },
        ],
  };

  const chartOptions = chartType
    ? {
        width: "400px",
        height: "300px",
        // donut: true,
        // donutWidth: 60,
        // startAngle: 270,
        // showLabel: true,
      }
    : {
        width: "400px",
        height: "300px",
        donut: true,
        donutWidth: 60,
        startAngle: 270,
        showLabel: true,
      };

  console.log("total", series);

  return (
    <DashboardChartCard
      className={"dashboard-invoice-expense-tab-wrapper"}
      headerClassName={"invoice-tab-header"}
      chartData={chartData}
      chartOptions={chartOptions}
      chartId={"invoice"}
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
          label: "Paid",
          value: series.open.amount,
          count: series.open.count,
          color: "rgb(255, 209, 102)",
        },

        {
          label: "Cancelled",
          value: series.canceled.amount,
          count: series.canceled.count,
          color: "rgb(17, 138, 178)",
        },
      ]}
      setDate={setDate}
    />
  );
};

export default DashBoardInvoiceTab;
