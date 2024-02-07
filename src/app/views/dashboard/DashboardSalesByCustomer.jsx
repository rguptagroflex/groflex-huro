import moment from "moment";
import React, { useEffect, useState } from "react";
import { SelectInput } from "../../shared/components/select/SelectInput";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";
import DashboardChartCard from "./DashboardChartCard";

import groflexService from "../../services/groflex.service";
import config from "../../../../config";
const DashboardSalesByCustomer = () => {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [chartType, setChartType] = useState(true);
  const [filter, setFilter] = useState("filterByName");
  const [response, setResponse] = useState(null);
  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState([]);
  const [entries, setEntries] = useState([]);

  const fetchSalesByArticles = () => {
    groflexService
      .request(
        `${config.resourceUrls.salesByArticles(date.startDate, date.endDate)}`,
        { auth: true }
      )
      .then((res) => {
        setResponse(res.body.data);
      });
  };

  useEffect(() => {
    fetchSalesByArticles();
  }, [date]);

  useEffect(() => {
    if (response) {
      createChartData(filter);
    }
  }, [response]);

  const handleFilterChange = (option) => {
    setFilter(option.value);
    createChartData(option.value);
  };

  const createChartData = (value) => {
    let labels = [];
    let series = [];
    let entries = [];
    const colors = [
      "rgb(251, 195, 177)",
      "rgb(247, 140, 107)",
      "rgb(245, 104, 61)",
      "rgb(233, 64, 12)",
      "rgb(194, 53, 10)",
    ];
    // if (response && response?.articles) {
    if (value === "filterByName") {
      response.customers.custom.forEach((customer, id) => {
        labels.push(customer.name);
        series.push({ value: customer.value, className: `pie-${id}` });
        // series.push(article.value);
        entries.push({
          label: customer.name,
          value: customer.value,
          color: colors[id],
        });
      });
    }

    if (value === "filterByCategory") {
      response.customerCategories.custom.forEach((category, id) => {
        labels.push(category.name);
        series.push({ value: category.value, className: `pie-${id}` });
        entries.push({
          label: category.name,
          value: category.value,
          color: colors[id],
        });
      });
    }
    // }

    setLabels(labels);
    setSeries(series);
    setEntries(entries);
  };

  const chartData = {
    labels: labels,
    series: chartType ? [series] : series,
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
  const filterOptions = [
    {
      label: "Filter By Category",
      value: "filterByCategory",
    },
    {
      label: "Filter By Name",
      value: "filterByName",
    },
  ];

  return (
    <DashboardChartCard
      className={"dashboard-sales-by-article-tab-wrapper"}
      headerClassName={"sales-by-article-tab-header"}
      chartData={chartData}
      chartOptions={chartOptions}
      chartId={"salesByCustomer"}
      chartType={chartType}
      setChartType={setChartType}
      chartEntries={entries}
      setDate={setDate}
      filterOptions={filterOptions}
      handleFilterChange={handleFilterChange}
      filter={filter}
    />
    // <div className="dashboard-invoice-tab-wrapper">
    //   <div className="columns is-multiline invoice-tab-header">
    //     <div className="column is-6">
    //       <SelectInput
    //         options={dateOptions}
    //         placeholder={"None"}
    //         onChange={handleDateDropDown}
    //         value={date}
    //       />
    //     </div>
    //     <div
    //       className="column is-1 toggle-chart-btn"
    //       onClick={() => setChartType(!chartType)}
    //     >
    //       <FeatherIcon
    //         name={chartType ? "PieChart" : "BarChart"}
    //         size={20}
    //         color="rgb(17, 138, 178)"
    //       />
    //     </div>
    //   </div>

    //   <div className="column is-12 donut-chart-wrapper"></div>
    //   <div className="columns is-multiline value-categories">
    //     <div className="column is-6">
    //       <span
    //         className="value-category-dot"
    //         style={{ backgroundColor: "rgb(251, 195, 177)" }}
    //       ></span>
    //       <div>
    //         {" "}
    //         <p className="value-category-text">
    //           Demo {`(2)`}{" "}
    //           <FeatherIcon
    //             name={"ArrowUpRight"}
    //             size={20}
    //             color="rgb(17, 138, 178)"
    //           />
    //         </p>
    //         <p className="value-category-value">
    //           ₹ 84 <span>{"| "} 100 %</span>
    //         </p>
    //       </div>
    //     </div>
    //     <div className="column is-6">
    //       <span
    //         className="value-category-dot"
    //         style={{ backgroundColor: "rgb(247, 140, 107" }}
    //       ></span>
    //       <div>
    //         {" "}
    //         <p className="value-category-text">
    //           Test {`(2)`}{" "}
    //           <FeatherIcon
    //             name={"ArrowUpRight"}
    //             size={20}
    //             color="rgb(17, 138, 178)"
    //           />
    //         </p>
    //         <p className="value-category-value">
    //           ₹ 84 <span>{"| "} 100 %</span>
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default DashboardSalesByCustomer;
