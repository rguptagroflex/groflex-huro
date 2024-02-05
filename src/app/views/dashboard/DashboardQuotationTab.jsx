import moment from "moment";
import React, { useEffect, useState } from "react";
import { SelectInput } from "../../shared/components/select/SelectInput";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";
import CreateChart from "../../shared/components/chartist/CreateChart";
import config from "../../../../config";
import groflexService from "../../services/groflex.service";

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
const DashboardQuotation = () => {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [quotations, setQuotations] = useState([]);

  const [dateDropDown, setDateDropDown] = useState({
    label: dateFilterTypes.fiscalYear,
    value: "fiscalYear",
  });
  const [series, setSeries] = useState({
    invoiced: { count: 0, amount: 0 },
    accepted: { count: 0, amount: 0 },
    open: { count: 0, amount: 0 },
  });

  const fetchQuotations = () => {
    groflexService
      .request(
        `${config.resourceUrls.quotationChartData(
          date.startDate,
          date.endDate
        )}`,
        { auth: true, method: "GET" }
      )
      .then((res) => {
        let invoiced = {
          count: 0,
          amount: 0,
        };
        let accepted = {
          count: 0,
          amount: 0,
        };
        let open = {
          count: 0,
          amount: 0,
        };

        setQuotations(res.body.data);
        res.body.data.forEach((item) => {
          if (item.state === "invoiced") {
            invoiced.count = invoiced.count + 1;
            invoiced.amount += item.totalGross;
          }
          if (item.state === "accepted") {
            // canceled += item.totalGross;
            accepted.count = accepted.count + 1;
            accepted.amount += item.totalGross;
          }
          if (item.state === "open") {
            // canceled += item.totalGross;
            open.count = open.count + 1;
            open.amount += item.totalGross;
          }
        });

        setSeries({
          invoiced: invoiced,
          accepted: accepted,
          open: open,
        });

        // console.log("expense", res.body.data);
      });
  };

  useEffect(() => {
    fetchQuotations();
  }, [date]);

  const [chartType, setChartType] = useState(true);

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

  const chartData = {
    labels: ["Invoiced", "Accepted", "Open"],
    series: chartType
      ? [[series.invoiced.amount, series.accepted.amount, series.open.amount]]
      : [
          { value: series.invoiced.amount, className: "Invoiced" },
          { value: series.accepted.amount, className: "Accepted" },
          { value: series.open.amount, className: "Open" },
        ],
  };

  const chartOptions = chartType
    ? {
        width: "400px",
        height: "300px",
        // donut: true,
        // donutWidth: 60,
        // startAngle: 270,
        // showLabel: true,
      }
    : {
        width: "400px",
        height: "300px",
        donut: true,
        donutWidth: 60,
        startAngle: 270,
        showLabel: true,
      };
  return (
    <div className="dashboard-quotation-tab-wrapper">
      <div className="columns is-multiline quotation-tab-header">
        <div className="column is-6">
          <SelectInput
            options={dateOptions}
            placeholder={"None"}
            onChange={handleDateDropDown}
            value={dateDropDown}
            defaultValue={"fiscalYear"}
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

      <div className="column is-12 donut-chart-wrapper">
        <CreateChart
          data={chartData}
          options={chartOptions}
          chartType={chartType ? "barChart" : "pieDonutChart"}
          chartId={"quotation"}
        />
      </div>
      <div className="columns is-multiline value-categories">
        <div className="column is-6">
          <span
            className="value-category-dot"
            style={{ backgroundColor: "rgb(255, 209, 102)" }}
          ></span>
          <div>
            {" "}
            <p className="value-category-text">
              Invoiced {`(${series.invoiced.count})`}{" "}
              <FeatherIcon
                name={"ArrowUpRight"}
                size={20}
                color="rgb(17, 138, 178)"
              />
            </p>
            <p className="value-category-value">
              ₹ {parseFloat(series.invoiced.amount).toFixed(0)}{" "}
              <span>{"| "} 100 %</span>
            </p>
          </div>
        </div>
        <div className="column is-6">
          <span
            className="value-category-dot"
            style={{ backgroundColor: "rgb(6, 214, 160)" }}
          ></span>
          <div>
            {" "}
            <p className="value-category-text">
              Accepted {`(${series.accepted.count})`}{" "}
              <FeatherIcon
                name={"ArrowUpRight"}
                size={20}
                color="rgb(17, 138, 178)"
              />
            </p>
            <p className="value-category-value">
              ₹ {parseFloat(series.accepted.amount).toFixed(0)}{" "}
              <span>{"| "} 100 %</span>
            </p>
          </div>
        </div>
        <div className="column is-6">
          <span
            className="value-category-dot"
            style={{ backgroundColor: "rgb(239, 71, 111)" }}
          ></span>
          <div>
            {" "}
            <p className="value-category-text">
              Open {`(${series.open.count})`}{" "}
              <FeatherIcon
                name={"ArrowUpRight"}
                size={20}
                color="rgb(17, 138, 178)"
              />
            </p>
            <p className="value-category-value">
              ₹ {parseFloat(series.open.amount).toFixed(0)}{" "}
              <span>{"| "} 100 %</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardQuotation;
