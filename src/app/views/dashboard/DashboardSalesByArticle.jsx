import moment from "moment";
import React, { useState } from "react";
import { SelectInput } from "../../shared/components/select/SelectInput";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";

const DashboardSalesByArticle = () => {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [chartType, setChartType] = useState(true);

  const handleDateDropDown = (option) => {
    setDate(option.value);
  };

  const dateOptions = [
    {
      label: moment().format("MMMM"),
      value: {
        startDate: moment().startOf("month").format(),
        endDate: moment().endOf("month").format(),
      },
    },
    {
      label: moment().subtract(1, "months").format("MMMM"),
      value: {
        startDate: moment().subtract(1, "months").startOf("month").format(),
        endDate: moment().subtract(1, "months").endOf("month").format(),
      },
    },
    {
      label: moment().subtract(2, "months").format("MMMM"),
      value: {
        startDate: moment().subtract(2, "months").startOf("month").format(),
        endDate: moment().subtract(2, "months").endOf("month").format(),
      },
    },
    {
      label: `Quarter ${moment().startOf("quarter").format("Q/YYYY")}`,
      value: {
        startDate: moment().startOf("quarter").format(),
        endDate: moment().endOf("quarter").format(),
      },
    },
    {
      label: `Quarter ${moment()
        .subtract(3, "months")
        .startOf("quarter")
        .format("Q/YYYY")}`,
      value: {
        startDate: moment().subtract(3, "months").startOf("quarter").format(),
        endDate: moment()
          .subtract(3, "months")
          .endOf("quarter")
          .format("DD MMMM YYYY"),
      },
    },
    {
      label: `Quarter ${moment()
        .subtract(6, "months")
        .startOf("quarter")
        .format("Q/YYYY")}`,
      value: {
        startDate: moment().subtract(6, "months").startOf("quarter").format(),
        endDate: moment().subtract(6, "months").endOf("quarter").format(),
      },
    },
  ];

  return (
    <div className="dashboard-invoice-tab-wrapper">
      <div className="columns is-multiline invoice-tab-header">
        <div className="column is-6">
          <SelectInput
            options={dateOptions}
            placeholder={"None"}
            onChange={handleDateDropDown}
            value={date}
          />
        </div>
        <div
          className="column is-1 toggle-chart-btn"
          onClick={() => setChartType(!chartType)}
        >
          <FeatherIcon
            name={chartType ? "PieChart" : "BarChart"}
            size={20}
            color="rgb(17, 138, 178)"
          />
        </div>
      </div>

      <div className="column is-12 donut-chart-wrapper"></div>
      <div className="columns is-multiline value-categories">
        <div className="column is-6">
          <span
            className="value-category-dot"
            style={{ backgroundColor: "rgb(251, 195, 177)" }}
          ></span>
          <div>
            {" "}
            <p className="value-category-text">
              Non Food {`(2)`}{" "}
              <FeatherIcon
                name={"ArrowUpRight"}
                size={20}
                color="rgb(17, 138, 178)"
              />
            </p>
            <p className="value-category-value">
              ₹ 84 <span>{"| "} 100 %</span>
            </p>
          </div>
        </div>
        <div className="column is-6">
          <span
            className="value-category-dot"
            style={{ backgroundColor: "rgb(247, 140, 107" }}
          ></span>
          <div>
            {" "}
            <p className="value-category-text">
              Not Specified {`(2)`}{" "}
              <FeatherIcon
                name={"ArrowUpRight"}
                size={20}
                color="rgb(17, 138, 178)"
              />
            </p>
            <p className="value-category-value">
              ₹ 84 <span>{"| "} 100 %</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSalesByArticle;