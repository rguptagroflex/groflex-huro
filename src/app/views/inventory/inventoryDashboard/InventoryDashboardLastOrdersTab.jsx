import React, { useEffect, useState } from "react";
import groflexService from "../../../services/groflex.service";
import config from "../../../../../config";
import InventoryDashboardChartCard from "./InventoryDashboardChartCard";

const bgColors = [
  "#D94339",

  "#FF6262",

  "#FF8F8F",

  "#FDB0B0",

  "#FFCECE",

  "#FFE8E8",
];

const InventoryDashboardLastOrdersTab = () => {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [articleTitles, setArticleTitles] = useState([]);
  const [invoiceList, setInvoiceList] = useState([]);
  const [totalNetValue, setTotalNetValue] = useState([]);
  const [chartEntries, setChartEntries] = useState([]);

  // const trial = () => {
  //   groflexService
  //     .request(`${config.resourceUrls.lastOrder}`)
  //     .then((res) => console.log(res));
  // };
  useEffect(() => {
    fetchLastOrderArticles();
  }, []);
  const fetchLastOrderArticles = () => {
    groflexService
      .request(`${config.resourceUrls.lastOrder}`, {
        auth: true,
        method: "GET",
      })
      .then((res) => {
        const data = res.body.data;
        const sortedArticles = data.sort(
          (a, b) =>
            parseFloat(a.priceNetAfterDiscount) -
            parseFloat(b.priceNetAfterDiscount)
        );
        data.map((item) => console.log(item.priceNetAfterDiscount));
        const titles = sortedArticles.map((item) => item.title);
        const netValue = sortedArticles.map(
          (item) => item.priceNetAfterDiscount
        );
        const newChartEntries = titles.map((title, index) => ({
          label: title,
          color: bgColors[index % bgColors.length],
        }));
        setChartEntries(newChartEntries);
        setArticleTitles(titles);
        setTotalNetValue(netValue);
      });
  };

  const [isBarChart, setIsBarChart] = useState(true);
  const [list, setList] = useState(false);

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
    <>
      <InventoryDashboardChartCard
        //pieChartSummary={totalValue}
        className={"inventorydashboard-stock-tab-wrapper"}
        headerClassName={"stock-tab-header"}
        chartData={chartData}
        chartOptions={chartOptions}
        chartId={"stock"}
        chartType={isBarChart}
        setChartType={setIsBarChart}
        chartEntries={chartEntries}
        setDate={setDate}
        list={list}
        setList={setList}
        Reordered={true}
        showList={!isBarChart}
        url={config.resourceUrls.articleLowOnStock(false)}
      />
    </>
  );
};

export default InventoryDashboardLastOrdersTab;
