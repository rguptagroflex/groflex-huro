import React, { useState, useEffect } from "react";
import InventoryDashboardChartCard from "./InventoryDashboardChartCard";
import groflexService from "../../../services/groflex.service";
import config from "../../../../../config";

const InventoryDashboardTopSellingArticles = () => {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [chartEntries, setChartEntries] = useState([]);
  const [totalPrice, setTotalPrice] = useState({});
  const [articleTitles, setArticleTitles] = useState([]);
  const [articleTotalSalePrice, setArticleTotalSalePrice] = useState([]);
  const [overAllSaleWithTax, setOverAllSaleWithTax] = useState();
  const bgColors = [
    "#00A353",
    "#26B56F",
    "#51CA8E",
    "#79D7A8",
    "#88F1BD",
    "#BAF2D6",
  ];
  useEffect(() => {
    if (date.startDate && date.endDate) {
      fetchTopSellingArticles();
    }
  }, [date]);

  const fetchTopSellingArticles = () => {
    groflexService
      .request(
        `${config.resourceUrls.topAndLowSellingArticle(
          date.startDate,
          date.endDate
        )}`,
        { auth: true, method: "GET" }
      )
      .then((res) => {
        const articles = res.body.data.articles.year.articles;
        const sortedArticles = articles.sort(
          (a, b) => parseFloat(b.totalSalesPrice) - parseFloat(a.totalSalesPrice)
        );
        console.log(sortedArticles);
        const titles = sortedArticles.map((article) => article.title);
        const totalSalesPrice = sortedArticles.map(
          (article) => article.totalSalesPrice
        );
        const totalPriceValue = res.body.data.articles.year.overAllSaleWithTax;
        setOverAllSaleWithTax(totalPriceValue);
        console.log();
        const newChartEntries = titles.map((title, index) => ({
          label: title,
          color: bgColors[index % bgColors.length],
        }));
        setChartEntries(newChartEntries);
        setArticleTotalSalePrice(totalSalesPrice);
        setArticleTitles(titles);

        // Call setTotalPrice here
        setTotalPrice({
          label: "Total Sales",
          value: totalPriceValue,
        });
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching invoice list:", error);
      });
  };

  const [isBarChart, setIsBarChart] = useState(true);

  const chartData = {
    labels: articleTitles,
    datasets: [
      {
        label: "",
        data: articleTotalSalePrice,
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
      pieChartSummary={totalPrice}
      className={"dashboard-invoice-expense-tab-wrapper"}
      headerClassName={"invoice-tab-header"}
      chartData={chartData}
      chartOptions={chartOptions}
      chartId={"invoice"}
      chartType={isBarChart}
      setChartType={setIsBarChart}
      chartEntries={chartEntries}
      setDate={setDate}
    />
  );
};

export default InventoryDashboardTopSellingArticles;
