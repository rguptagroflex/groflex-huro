import moment from "moment";
import React, { useEffect, useState } from "react";
import { SelectInput } from "../../shared/components/select/SelectInput";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";

import CreateChart from "../../shared/components/chartist/CreateChart";
import groflexService from "../../services/groflex.service";
import config from "../../../../config";

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
const DashBoardInvoiceTab = () => {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [dateDropDown, setDateDropDown] = useState({
    label: dateFilterTypes.fiscalYear,
    value: "fiscalYear",
  });
  const [series, setSeries] = useState({
    paid: { count: 0, amount: 0 },
    canceled: { count: 0, amount: 0 },
    open: { count: 0, amount: 0 },
  });
  const [invoiceList, setInvoiceList] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const fetchInvoiceList = () => {
    console.log(moment());
    groflexService
      .request(
        `${config.resourceUrls.invoiceChartData(date.startDate, date.endDate)}`,
        { auth: true, method: "GET" }
      )
      .then((res) => {
        let total = 0;

        let paid = {
          count: 0,
          amount: 0,
        };
        let canceled = {
          count: 0,
          amount: 0,
        };
        let open = {
          count: 0,
          amount: 0,
        };
        console.log("Invoice List", res);
        setInvoiceList(res.body.data);
        res.body.data.forEach((item) => {
          if (item.state === "paid" || item.state === "locked") {
            total += item.totalGross;
          }
          if (item.state === "paid") {
            // paid += item.totalGross;
            paid.count = paid.count + 1;
            paid.amount += item.totalGross;
          }
          if (item.state === "locked") {
            // open += item.totalGross;
            open.count = open.count + 1;
            open.amount += item.totalGross;
          }
          if (item.state === "cancelled") {
            // canceled += item.totalGross;
            canceled.count = canceled.count + 1;
            canceled.amount += item.totalGross;
          }
        });
        setSeries({
          paid: paid,
          open: open,
          canceled: canceled,
        });

        setTotalValue(total);
      });
  };
  useEffect(() => {
    fetchInvoiceList();
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
    labels: ["Open", "Paid", "Canceled"],
    series: chartType
      ? [[series.open.amount, series.paid.amount, series.canceled.amount]]
      : [
          { value: series.open.amount, className: "Open" },
          { value: series.paid.amount, className: "Paid" },
          { value: series.canceled.amount, className: "Canceled" },
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

  console.log("total", series);

  return (
    <div className="dashboard-invoice-expense-tab-wrapper">
      <div className="columns is-multiline invoice-tab-header">
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
          chartId={"invoice"}
        />
      </div>
      <div className="columns is-multiline value-categories">
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

        <div className="column is-6">
          <span
            className="value-category-dot"
            style={{ backgroundColor: "rgb(255, 209, 102)" }}
          ></span>
          <div>
            {" "}
            <p className="value-category-text">
              Paid {`(${series.paid.count})`}{" "}
              <FeatherIcon
                name={"ArrowUpRight"}
                size={20}
                color="rgb(17, 138, 178)"
              />
            </p>
            <p className="value-category-value">
              ₹ {parseFloat(series.paid.amount).toFixed(0)}{" "}
              <span>{"| "} 100 %</span>
            </p>
          </div>
        </div>
        <div className="column is-6">
          <span className="value-category-dot"></span>
          <div>
            {" "}
            <p className="value-category-text">
              Canceled {`(${series.canceled.count})`}{" "}
              <FeatherIcon
                name={"ArrowUpRight"}
                size={20}
                color="rgb(17, 138, 178)"
              />
            </p>
            <p className="value-category-value">
              ₹ {parseFloat(series.canceled.amount).toFixed(0)}{" "}
              <span>{"| "} 100 %</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardInvoiceTab;
