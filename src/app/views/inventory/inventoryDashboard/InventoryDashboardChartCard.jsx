import React, { useState } from "react";

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

import { SelectInput } from "../../../shared/components/select/SelectInput";
import { FeatherIcon } from "../../../shared/featherIcon/FeatherIcon";
import moment from "moment";
import CreateChart from "../../../shared/components/chartjs/CreateChart";
import { Button } from "../../../shared/components/button/Button";
import { ListAdvancedComponent } from "../../../shared/components/list-advanced/ListAdvancedComponent";
import { ListAdvancedDefaultSettings } from "../../../helpers/constants";
import {
  localeCompare,
  localeCompareNumeric,
} from "../../../helpers/sortComparators";
import { CustomShowHeaderSum } from "../../../shared/components/list-advanced/CustomShowHeaderSum";
import config from "../../../../../config";
import { formatCurrency } from "../../../helpers/formatCurrency";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const dateFilterTypes = {
  fiscalYear: "Fiscal Year",
  currentMonth: moment().format("MMMM"),
  lastMonth: moment().subtract(1, "months").format("MMMM"),
  secondLastMonth: moment().subtract(2, "months").format("MMMM"),
  currentQuarter: moment().startOf("quarter").format("Q/YYYY"),
  lastQuarter: moment()
    .subtract(3, "months")
    .startOf("quarter")
    .format("Q/YYYY"),
  secondLastQuarter: moment()
    .subtract(6, "months")
    .startOf("quarter")
    .format("Q/YYYY"),
};
const InventoryDashboardChartCard = ({
  className,
  chartData,
  chartOptions,
  list,

  chartId,
  headerClassName,
  chartEntries,
  chartType,
  setChartType,
  setDate,
  filterOptions,
  handleFilterChange,
  filter,
  Reordered,
  pieChartSummary = {
    label: "",
    value: 0,
  },
  showList,
}) => {
  const [dateDropDown, setDateDropDown] = useState({
    label: dateFilterTypes.fiscalYear,
    value: "fiscalYear",
  });

  const handleDateDropDown = (option) => {
    // setDate(option.value);
    setDateDropDown(option.value);
    let startDate = "";
    let endDate = "";
    switch (option.value) {
      case "currMonth":
        startDate = moment().startOf("month");
        endDate = moment().endOf("month");

        break;
      case "lastMonth":
        startDate = moment().subtract(1, "months").startOf("month");
        endDate = moment().subtract(1, "months").endOf("month");
        break;
      case "secondLastMonth":
        startDate = moment().subtract(2, "months").startOf("month");
        endDate = moment().subtract(2, "months").endOf("month");
        break;
      case "currQuarter":
        startDate = moment().startOf("quarter");
        endDate = moment().endOf("quarter");
        break;
      case "lastQuarter":
        startDate = moment().subtract(3, "months").startOf("quarter");
        endDate = moment()
          .subtract(3, "months")
          .endOf("quarter")
          .format("DD MMMM YYYY");
        break;
      case "secondLastQuarter":
        startDate = moment().subtract(6, "months").startOf("quarter");
        endDate = moment().subtract(6, "months").endOf("quarter");
        break;
      case "fiscalYear":
        const financialYearMonthStart = moment()
          .utc()
          .set("month", 2)
          .set("date", 31);
        startDate =
          financialYearMonthStart < moment().utc()
            ? financialYearMonthStart
            : financialYearMonthStart.set("year", moment().utc().year() - 1);
        endDate = endDate ? moment(endDate).utc() : moment().utc();
        break;
    }

    setDate({
      startDate: startDate.toJSON(),
      endDate: endDate.toJSON(),
    });
  };

  const dateOptions = [
    {
      label: dateFilterTypes.currentMonth,
      value: "currMonth",
    },
    {
      label: dateFilterTypes.lastMonth,
      value: "lastMonth",
    },
    {
      label: dateFilterTypes.secondLastMonth,
      value: "secondLastMonth",
    },
    {
      label: `Quarter ${dateFilterTypes.currentQuarter}`,
      value: "currQuarter",
    },
    {
      label: `Quarter ${dateFilterTypes.lastQuarter}`,
      value: "lastQuarter",
    },
    {
      label: `Quarter ${dateFilterTypes.secondLastQuarter}`,
      value: "secondLastQuarter",
    },
    {
      label: dateFilterTypes.fiscalYear,
      value: "fiscalYear",
    },
  ];

  return (
    <div className-={className}>
      <div
        className={`inventorydashboard-chartcard-wrapper ${headerClassName}`}
        // style={{
        //   display: "flex",
        //   marginBottom: "30px",
        //   justifyContent: "space-between",
        // }}
      >
        {setDate && (
          <div style={{ width: "168px" }}>
            <SelectInput
              options={dateOptions}
              placeholder={"None"}
              onChange={handleDateDropDown}
              value={dateDropDown}
              defaultValue={"fiscalYear"}
            />
          </div>
        )}
        {filter && (
          <div className="columns is-multiline">
            <div style={{ width: "168px", marginLeft: "10px" }}>
              <SelectInput
                options={filterOptions}
                placeholder={"None"}
                onChange={handleFilterChange}
                value={filter}
                defaultValue={"filterByName"}
              />
            </div>
          </div>
        )}
        <div
          className="toggle-chart-btn"
          onClick={() => {
            setChartType(!chartType);
            //  setList(!list);
          }}
          // style={{
          //   width: "40px",
          //   height: "40px",
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "center",
          // }}
        >
          <FeatherIcon
            name={chartType ? "PieChart" : "BarChart"}
            size={25}
            color="rgb(17, 138, 178)"
          />
        </div>
      </div>
      {showList ? (
        <ListAdvancedComponent
          columnDefs={[
            {
              //field: "state",
              headerName: "Article Name",
            },
            {
              //field: "customerData.name",
              headerName: "Quantity",
            },
           
            {
              headerName: "Purchase price",
              // field: "date",
              // filter: true,
              // comparator: (date1, date2) =>
              //   dateCompareSort(date1, date2, config.dateFormat.client),
            },

            {
              // //field: "dueToDate",
              // filter: true,
              // comparator: (date1, date2) =>
              //   dateCompareSort(date1, date2, config.dateFormat.client),
              headerName: "Location",
            },

            {
              // field: "type",
              headerName: " ",

              //minWidth: 150,
            },
          ]}
          fetchUrl={config.resourceUrls.articleLowOnStock}
        />
      ) : (
        <div
          className="column is-12 donut-chart-wrapper"
          style={{ display: "flex" }}
        >
          <div className="column is-10 donut-chart-wrapper">
            {chartType === false && (
              <div className="pie-chart-label-container">
                <div className="container-text">{pieChartSummary.label}</div>
                <div className="contianer-value">₹ {pieChartSummary.value}</div>
              </div>
            )}

            {chartData.datasets.length > 0 && (
              <CreateChart
                chartData={chartData}
                chartOptions={chartOptions}
                chartType={chartType ? "barChart" : "doughnutChart"}
              />
            )}
          </div>
          <div className="">
            {chartEntries.map((entry, id) => (
              <div
                className="column "
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={`category-${id}`}
              >
                <span
                  style={{
                    backgroundColor: `${entry.color}`,
                    height: "14px",
                    marginRight: "2px",
                  }}
                >
                  <FeatherIcon name={"Square"} size={14} color={entry.color} />
                </span>
                <div style={{ display: "flex" }}>
                  <p style={{ width: "50px" }}>{entry.label}</p>
                  <FeatherIcon
                    name={"ArrowUpRight"}
                    size={20}
                    color="rgb(17, 138, 178)"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          marginTop: "40px",
        }}
      >
        <Button
          icon={
            <FeatherIcon
              name="Download"
              size={18}
              style={{ height: "18px", width: "18px" }}
            />
          }
        >
          Export
        </Button>
      </div>
    </div>
  );
};

export default InventoryDashboardChartCard;
