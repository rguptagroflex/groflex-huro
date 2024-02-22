import React, { useEffect, useState } from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import moment from "moment";
import { useSelector } from "react-redux";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import { SelectInput } from "../../../shared/components/select/SelectInput";
import { Button } from "../../../shared/components/button/Button";
import groflexService from "../../../services/groflex.service";
import config from "../../../../../config";
import ReportsTable from "./ReportsTable";

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
const GeneralLedger = () => {
  const { companyAddress } = useSelector(
    (state) => state?.accountData?.tenantData || ""
  );
  const [customerID, setCustomerID] = useState(null);
  const [customerDropDown, setCustomerDropDown] = useState([]);

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
    if (customerID) {
      fetchGeneralLedger();
    }
  }, [date, customerID]);

  useEffect(() => {
    fetchCustomers();
  }, []);
  const fetchCustomers = () => {
    let customerDropDown = [];
    groflexService
      .request(`${config.resourceUrls.generalLedgerCustomers}`, { auth: true })
      .then((res) => {
        res.body.data.forEach((item) => {
          customerDropDown.push({ label: item.name, value: item.id });
        });

        setCustomerDropDown(customerDropDown);
      });
  };

  const fetchGeneralLedger = () => {
    let rowData = [];
    groflexService
      .request(
        `${config.resourceUrls.generalLedger(
          date.startDate,
          date.endDate,
          "json",
          customerID
        )}`,
        { auth: true }
      )
      .then((res) => {
        const transcatios = res.body.data.summaryData.transactions;
        transcatios.forEach((item, index) => {
          if (item.chartOfAccount) {
            let debit = parseFloat(item.debits).toFixed(2);
            let credit = parseFloat(item.credits).toFixed(2);
            let balance = parseFloat(item.balance).toFixed(2);
            rowData.push({
              id: index + 1,
              groupColumn:
                item.chartOfAccount.accountTypeId.charAt(0).toUpperCase() +
                item.chartOfAccount.accountTypeId.slice(1),
              column1: moment(item.date).format("DD/MM/YYYY"),
              column2:
                item.chartOfAccount.accountSubTypeId
                  .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                  .charAt(0)
                  .toUpperCase() +
                item.chartOfAccount.accountSubTypeId
                  .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                  .slice(1),
              column3: "₹" + " " + debit.toString(),
              column4: "₹" + " " + credit.toString(),
              column5: "₹" + " " + balance.toString(),
            });
          }
        });

        setRowData(rowData);
      });
  };

  const handleCustomerDropDown = (option) => {
    setCustomerID(option.value);
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
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
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
    <PageContent title={"General Ledger"}>
      <AdvancedCard
        type={"s-card"}
        style={{
          padding: "0px",
        }}
        className={"general-ledger-wrapper"}
      >
        <div className="columns is-multiline reports-header">
          <div
            className="columns is-mulitline"
            style={{ marginTop: "10px", marginLeft: "10px" }}
          >
            <div className="column is-8" style={{ minWidth: "170px" }}>
              <SelectInput
                options={dateOptions}
                placeholder={"Select Date"}
                onChange={handleDateDropDown}
                value={dateDropDown}
              />
            </div>

            <div className="column is-8" style={{ minWidth: "170px" }}>
              <SelectInput
                options={customerDropDown}
                placeholder={"Select Customer"}
                onChange={handleCustomerDropDown}
                value={customerID}
              />
            </div>
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

        {rowData.length > 0 ? (
          <div>
            <div className="reports-summary">
              <h3 style={{ fontSize: "25px", fontWeight: "500" }}>
                {companyAddress?.companyName} General Ledger
              </h3>
              <span style={{ color: "rgb(136, 135, 135)", fontWeight: "500" }}>
                From {moment(date.startDate).format("DD MMMM YYYY")} to{" "}
                {moment(date.endDate).format("DD MMMM YYYY")}
              </span>
            </div>

            <div className="general-ledger-table">
              <ReportsTable
                rowData={rowData}
                tableHeaders={[
                  "| Date",
                  "| Account",
                  "| Debit",
                  "| Credit",
                  "| Balance",
                ]}
              />
            </div>
          </div>
        ) : (
          <div className="reports-empty-table">No data to show</div>
        )}
      </AdvancedCard>
    </PageContent>
  );
};

export default GeneralLedger;
