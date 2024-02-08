import moment from "moment";
import React, { useEffect, useState } from "react";
import { SelectInput } from "../../shared/components/select/SelectInput";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";

import DashboardChartCard from "./DashboardChartCard";
import groflexService from "../../services/groflex.service";
import config from "../../../../config";
const DashboardExpenseByArticle = () => {
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
    let labels = [];
    let series = [];
    let entries = [];
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
      response.articles.custom.forEach((article, id) => {
        labels.push(article.name);
        series.push({ value: article.value, className: `pie-${id}` });
        // series.push(article.value);
        entries.push({
          label: article.name,
          value: article.value,
          color: colors[id],
        });
      });
    }

    if (value === "filterByCategory") {
      response.articleCategories.custom.forEach((category, id) => {
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
      className={"dashboard-expense-by-tab-wrapper"}
      headerClassName={"expense-by-tab-header"}
      chartData={chartData}
      chartOptions={chartOptions}
      chartId={"expenseByArticle"}
      chartType={chartType}
      setChartType={setChartType}
      chartEntries={entries}
      setDate={setDate}
      filterOptions={filterOptions}
      handleFilterChange={handleFilterChange}
      filter={filter}
    />
  );
};

export default DashboardExpenseByArticle;
