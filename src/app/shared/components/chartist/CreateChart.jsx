import React, { useEffect, useRef, useState } from "react";
import { BarChart, PieChart } from "chartist";
const CreateChart = ({ data, options, chartType = "barChart", chartId }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    // Data for the chart

    // Options for the chart

    // Create the chart
    let newChart = "";
    if (chartType === "barChart") {
      newChart = new BarChart(`.${chartId}-chart`, data, options);
    }
    if (chartType === "pieChart") {
      newChart = new PieChart(`.${chartId}-chart`, data, options);
    }
    if (chartType === "pieDonutChart") {
      newChart = new PieChart(`.${chartId}-chart`, data, options);
    }

    setChart(newChart);

    // Optionally, add plugins or listen to events here

    // Cleanup function
    return () => {
      // Destroy the chart when the component unmounts
      if (chart) {
        chart.detach();
      }
    };
  }, [data]); // Re-run effect if chart instance changes

  return <div className={`${chartId}-chart`}></div>;
};

export default CreateChart;
