import React, { useEffect, useState } from "react";
import InventoryDashboardChartCard from "./InventoryDashboardChartCard";

import groflexService from "../../../services/groflex.service";
import config from "../../../../../newConfig";
const bgColors = [
  "#D94339",

  "#FF6262",

  "#FF8F8F",

  "#FDB0B0",

  "#FFCECE",

  "#FFE8E8",
];
//const bgRColors = bgColors.reverse();
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
const InventoryDashboardArticlesLowOnStock = () => {
  const [articleTitles, setArticleTitles] = useState([]);
  const [filter, setFilter] = useState("filterByName");
  const [totalNetValue, setTotalNetValue] = useState([]);
  const [chartEntries, setChartEntries] = useState([]);
  // useEffect(() => {
  //   fetchLowOnStockArticles();
  // }, []);

  useEffect(() => {
    createChartData(filter);
  }, []);
  const createChartData = (value) => {
    if (value === "filterByName") {
      groflexService
        .request(`${config.resourceUrls.articleLowOnStock(false)}`, {
          auth: true,
          method: "GET",
        })
        .then((res) => {
          const data = res.body.data.lowStockArticlesByName;
          console.log(data);
          const sortedArticles = data.sort(
            (a, b) => parseFloat(a.currentStock) - parseFloat(b.currentStock)
          );
          data.map((item) => console.log(item.priceNetAfterDiscount));
          const titles = sortedArticles.map((item) => item.title);
          const netValue = sortedArticles.map((item) => item.currentStock);
          const newChartEntries = titles.map((title, index) => ({
            label: title,
            color: bgColors[index % bgColors.length],
          }));
          setChartEntries(newChartEntries);
          setArticleTitles(titles);
          setTotalNetValue(netValue);
        });
    }

    if (value === "filterByCategory") {
      groflexService
        .request(`${config.resourceUrls.articleLowOnStock(true)}`, {
          auth: true,
          method: "GET",
        })
        .then((res) => {
          const data = res.body.data.lowStockArticlesByCategory;
          console.log(data);
          let labels = [];
          let series = [];
          let total = 0;

          // Iterate over the categories and calculate total stock for each
          Object.entries(data).forEach(([category, categoryArticles]) => {
            const categoryStock = categoryArticles.reduce(
              (acc, article) => acc + article.currentStock,
              0
            );
            total += categoryStock;
            labels.push(category);
            series.push(categoryStock);
          });

          // Sort the labels and series based on the total stock
          const sortedIndices = series
            .map((_, index) => index)
            .sort((a, b) => series[a] - series[b]);
          labels = sortedIndices.map((index) => labels[index]);
          series = sortedIndices.map((index) => series[index]);

          const newChartEntries = labels.map((label, index) => ({
            label: label,
            color: bgColors[index % bgColors.length],
          }));

          setChartEntries(newChartEntries);
          setArticleTitles(labels);
          setTotalNetValue(series);
        });
    }
    setChartEntries([]);
    setArticleTitles([]);
    setTotalNetValue([]);
  };
  const handleFilterChange = (option) => {
    setFilter(option.value);
    createChartData(option.value);
  };
  const [isBarChart, setIsBarChart] = useState(true);

  const chartData = {
    labels: articleTitles,
    datasets: [
      {
        label: "",
        data: totalNetValue,
        backgroundColor: bgColors,
      },
    ],
  };

  const chartOptions = isBarChart
    ? {
        barThickness: 40,
        plugins: {
          legend: {
            display: false,
          },
        },
      }
    : {
        radius: "60%",
        spacing: 7,
        plugins: {
          legend: {
            display: false,
          },
        },
      };
  return (
    <InventoryDashboardChartCard
      //pieChartSummary={totalPrice}
      className={"dashboard-invoice-expense-tab-wrapper"}
      headerClassName={"invoice-tab-header"}
      chartData={chartData}
      chartOptions={chartOptions}
      chartId={"invoice"}
      chartType={isBarChart}
      setChartType={setIsBarChart}
      chartEntries={chartEntries}
      filterOptions={filterOptions}
      handleFilterChange={handleFilterChange}
      filter={filter}
      showList={!isBarChart}
      url={config.resourceUrls.articleLowOnStock(false)}
    />
  );
};

export default InventoryDashboardArticlesLowOnStock;
