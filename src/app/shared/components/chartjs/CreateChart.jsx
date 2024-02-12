import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const CreateChart = ({ chartType, chartData, chartOptions }) => {
  let chart = <></>;

  const createChart = (chartType, chartData, chartOptions) => {
    switch (chartType) {
      case "barChart":
        chart = <Bar data={chartData} options={chartOptions} />;
        break;
      case "pieChart":
        chart = <Pie data={chartData} options={chartOptions} />;
        break;
      case "doughnutChart":
        chart = <Doughnut data={chartData} options={chartOptions} />;
        break;
    }
    return chart;
  };
  return <>{createChart(chartType, chartData, chartOptions)}</>;
};

export default CreateChart;
