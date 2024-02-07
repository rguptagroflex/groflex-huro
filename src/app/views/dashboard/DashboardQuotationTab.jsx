import moment from "moment";
import React, { useEffect, useState } from "react";
import { SelectInput } from "../../shared/components/select/SelectInput";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";
import CreateChart from "../../shared/components/chartist/CreateChart";
import config from "../../../../config";
import groflexService from "../../services/groflex.service";
import DashboardChartCard from "./DashboardChartCard";

const DashboardQuotation = () => {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [quotations, setQuotations] = useState([]);

  const [series, setSeries] = useState({
    invoiced: { count: 0, amount: 0 },
    accepted: { count: 0, amount: 0 },
    open: { count: 0, amount: 0 },
  });

  const fetchQuotations = () => {
    groflexService
      .request(
        `${config.resourceUrls.quotationChartData(
          date.startDate,
          date.endDate
        )}`,
        { auth: true, method: "GET" }
      )
      .then((res) => {
        let invoiced = {
          count: 0,
          amount: 0,
        };
        let accepted = {
          count: 0,
          amount: 0,
        };
        let open = {
          count: 0,
          amount: 0,
        };

        setQuotations(res.body.data);
        res.body.data.forEach((item) => {
          if (item.state === "invoiced") {
            invoiced.count = invoiced.count + 1;
            invoiced.amount += item.totalGross;
          }
          if (item.state === "accepted") {
            // canceled += item.totalGross;
            accepted.count = accepted.count + 1;
            accepted.amount += item.totalGross;
          }
          if (item.state === "open") {
            // canceled += item.totalGross;
            open.count = open.count + 1;
            open.amount += item.totalGross;
          }
        });

        setSeries({
          invoiced: invoiced,
          accepted: accepted,
          open: open,
        });

        // console.log("expense", res.body.data);
      });
  };

  useEffect(() => {
    fetchQuotations();
  }, [date]);

  const [chartType, setChartType] = useState(true);

  const chartData = {
    labels: ["Invoiced", "Accepted", "Open"],
    series: chartType
      ? [[series.invoiced.amount, series.accepted.amount, series.open.amount]]
      : [
          { value: series.invoiced.amount, className: "Invoiced" },
          { value: series.accepted.amount, className: "Accepted" },
          { value: series.open.amount, className: "Open" },
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
  return (
    <DashboardChartCard
      className={"dashboard-quotation-tab-wrapper"}
      headerClassName={"quotation-tab-header"}
      chartData={chartData}
      chartOptions={chartOptions}
      chartId={"quotation"}
      chartType={chartType}
      setChartType={setChartType}
      chartEntries={[
        {
          label: "Invoiced",
          value: series.invoiced.amount,
          count: series.invoiced.count,
          color: "rgb(255, 209, 102)",
        },
        {
          label: "Accepted",
          value: series.accepted.amount,
          count: series.accepted.count,
          color: "rgb(6, 214, 160)",
        },
        {
          label: "Open",
          value: series.open.amount,
          count: series.open.count,
          color: "rgb(239, 71, 111)",
        },
      ]}
      setDate={setDate}
    />
  );
};

export default DashboardQuotation;
