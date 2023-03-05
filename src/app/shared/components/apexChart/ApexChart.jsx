import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function ApexChart() {
  const [chartState, setChartState] = useState({
    series: [50],
    options: {
      chart: {
        // height: 150,
        type: "radialBar",
        // offsetY: -20,
      },
      grid: {
        padding: {
          top: -22,
          bottom: -25,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -180,
          endAngle: 180,
          dataLabels: {
            name: {
              fontSize: "20px",
              color: undefined,
              offsetY: 10,
            },
            value: {
              offsetY: -9,
              fontSize: "18px",
              color: "#039be5",
              formatter: function (val) {
                return val + "%";
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      stroke: {
        dashArray: 2,
      },
      labels: [""],
    },
  });

  return (
    <div className="radial-wrap" style={{ position: "relative" }}>
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="radialBar"
        height={160}
      />
    </div>
  );
}

export default ApexChart;
