import React, { useEffect, useState } from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import { SelectInput } from "../../../shared/components/select/SelectInput";
import { Button } from "../../../shared/components/button/Button";
import moment from "moment";
import ReportsTable from "./ReportsTable";
import groflexService from "../../../services/groflex.service";
import config from "../../../../../config";
import { useSelector } from "react-redux";

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
const ProfitAndLoss = () => {
  const { companyAddress } = useSelector(
    (state) => state?.accountData?.tenantData || ""
  );
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [dateDropDown, setDateDropDown] = useState({
    label: dateFilterTypes.fiscalYear,
    value: "fiscalYear",
  });
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    fetchProfitAndLossStatement();
  }, [date]);

  const fetchProfitAndLossStatement = () => {
    groflexService
      .request(
        `${config.resourceUrls.profitAndLoss(
          date.startDate,
          date.endDate,
          "json"
        )}`,
        { auth: true }
      )
      .then((res) => {
        let rowData = [];
        if (res && res.body) {
          const transcatios = res.body.data.summaryData.transactions;
          transcatios.forEach((item, index) => {
            let total =
              item.debits === 0
                ? parseFloat(item.credits).toFixed(2)
                : parseFloat(item.debits).toFixed(2);
            rowData.push({
              id: index + 1,
              groupColumn:
                item.accountTypeId.charAt(0).toUpperCase() +
                item.accountTypeId.slice(1),
              column1:
                item.accountSubTypeId
                  .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                  .charAt(0)
                  .toUpperCase() +
                item.accountSubTypeId
                  .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                  .slice(1),
              column2: "-",
              column3: "₹" + " " + total.toString(),
            });
          });
          setRowData(rowData);
        }
      });
  };

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
    <PageContent title={"Profit and loss"}>
      <AdvancedCard
        type={"s-card"}
        style={{ padding: "0px" }}
        className={"profit-and-loss-wrapper"}
      >
        <div className="columns is-multiline reports-header">
          <div className="column is-2">
            <SelectInput
              options={dateOptions}
              placeholder={"None"}
              onChange={handleDateDropDown}
              value={dateDropDown}
              defaultValue={"fiscalYear"}
            />
          </div>
          <div className="columns is-multiline utility-buttons">
            <Button
              icon={<i className={`fa-solid fa-envelope`}></i>}
              className={"utility-btn"}
            >
              Send Email
            </Button>
            <Button
              icon={<i className="fa-solid fa-download"></i>}
              className={"utility-btn"}
            >
              Export
            </Button>
            <Button
              icon={<i className="fa-solid fa-print"></i>}
              className={"utility-btn"}
            >
              Print
            </Button>
          </div>
        </div>

        <div className="reports-summary">
          <h3 style={{ fontSize: "25px", fontWeight: "500" }}>
            {companyAddress?.companyName}
          </h3>
          <span style={{ color: "rgb(136, 135, 135)", fontWeight: "500" }}>
            From {moment(date.startDate).format("DD MMMM YYYY")} to{" "}
            {moment(date.endDate).format("DD MMMM YYYY")}
          </span>
        </div>

        <div className="profit-and-loss-table">
          <ReportsTable
            rowData={rowData}
            tableHeaders={["Account", "Account Code", "Total"]}
          />
        </div>
      </AdvancedCard>
    </PageContent>
  );
};

export default ProfitAndLoss;
