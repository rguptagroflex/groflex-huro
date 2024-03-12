import React, { useEffect, useState } from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import { useSelector } from "react-redux";
import moment from "moment";
import { SelectInput } from "../../../shared/components/select/SelectInput";
import DateInput from "../../../shared/components/datePicker/DateInput";
import { Button } from "../../../shared/components/button/Button";
import groflexService from "../../../services/groflex.service";
import config from "../../../../../newConfig";
import FontAwesomeIcon from "../../../shared/fontAwesomeIcon/FontAwesomeIcon";
import SendEmailModal from "../../../shared/components/sendEmail/SendEmailModal";
import oldConfig from "../../../../../oldConfig";
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
const GstReports = () => {
  const { companyAddress } = useSelector(
    (state) => state?.accountData?.tenantData || ""
  );
  const [sendEmailFormData, setSendEmailFormData] = useState({
    id: "",
    subject: "",
    emails: [],
    message: "",
    csv: true,
    exportperiod: "",
  });

  const [showCustomDateRangeSelector, setShowCustomDateRangeSelector] =
    useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [generateGstReportFormData, setGenerateGstReportFormData] = useState({
    gstReportType: "",
    sortBy: "all",
    dateDropDown: "",
  });
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [rowData, setRowData] = useState([]);

  const [filteredRowData, setFilteredRowData] = useState([]);

  useEffect(() => {
    fetchGstReportExportSummary();
  }, []);

  useEffect(() => {
    filterGstExportSummary();
  }, [generateGstReportFormData.sortBy]);

  const handleGstReportTypeChange = (option) => {
    setGenerateGstReportFormData({
      ...generateGstReportFormData,
      gstReportType: option.value,
    });
  };

  const handleSortByTypeChange = (option) => {
    setGenerateGstReportFormData({
      ...generateGstReportFormData,
      sortBy: option.value,
    });
  };

  const handleDateDropDown = (option) => {
    // setDate(option.value);
    setGenerateGstReportFormData({
      ...generateGstReportFormData,
      dateDropDown: option.label,
    });
    let startDate = "";
    let endDate = "";
    switch (option.value) {
      case "currMonth":
        setShowCustomDateRangeSelector(false);
        startDate = moment().startOf("month");
        endDate = moment().endOf("month");

        break;
      case "lastMonth":
        setShowCustomDateRangeSelector(false);
        startDate = moment().subtract(1, "months").startOf("month");
        endDate = moment().subtract(1, "months").endOf("month");
        break;
      case "secondLastMonth":
        setShowCustomDateRangeSelector(false);
        startDate = moment().subtract(2, "months").startOf("month");
        endDate = moment().subtract(2, "months").endOf("month");
        break;
      case "currQuarter":
        setShowCustomDateRangeSelector(false);
        startDate = moment().startOf("quarter");
        endDate = moment().endOf("quarter");
        break;
      case "lastQuarter":
        setShowCustomDateRangeSelector(false);
        startDate = moment().subtract(3, "months").startOf("quarter");
        endDate = moment()
          .subtract(3, "months")
          .endOf("quarter")
          .format("DD MMMM YYYY");
        break;
      case "secondLastQuarter":
        setShowCustomDateRangeSelector(false);
        startDate = moment().subtract(6, "months").startOf("quarter");
        endDate = moment().subtract(6, "months").endOf("quarter");
        break;
      case "fiscalYear":
        setShowCustomDateRangeSelector(false);
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
      case "custom":
        setShowCustomDateRangeSelector(true);
        break;
    }

    if (option.value !== "custom") {
      setDate({
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD"),
      });
    }
  };

  const handleCustomStartDateChange = (value) => {
    setDate({
      ...date,
      startDate: value.toJSON(),
    });
  };
  const handleCustomEndDateChange = (value) => {
    setDate({
      ...date,
      endDate: value.toJSON(),
    });
  };

  const fetchGstReportExportSummary = () => {
    let rowData = [];

    groflexService
      .request(`${config.resourceUrls.gstReportExportSummary}`, { auth: true })
      .then((res) => {
        if (res && res.body) {
          res.body.data.forEach((item) => {
            rowData.push({
              id: item.id,
              date: moment(item.createdAt).format("DD-MM-YYYY"),
              exportPeriod: item.exportPeriod,
              exportType: item.exportFormat.toUpperCase(),
              fileFormat: item.type,
              download: (
                <FontAwesomeIcon
                  name={"download"}
                  size={20}
                  color="rgb(0, 121, 179)"
                />
              ),
              share: (
                <FontAwesomeIcon
                  name={"share-nodes"}
                  size={20}
                  color="rgb(0, 121, 179)"
                  onClick={() => setIsEmailModalVisible(true)}
                />
              ),
            });
          });
        }
        setRowData(rowData);
        setFilteredRowData(rowData);
      });
  };

  const handleRunReport = () => {
    let payload = {
      endDate: date.endDate,
      exportFormat: generateGstReportFormData.gstReportType,
      exportPeriod: generateGstReportFormData.dateDropDown,
      startDate: date.startDate,
      type: "CSV",
    };
    groflexService
      .request(`${config.resourceUrls.exportGstReport}`, {
        auth: true,
        data: payload,
        method: "POST",
      })
      .then((res) => {
        console.log(res);
        if (res.body?.message) {
          groflexService.toast.error("Something went wrong");
        } else {
          fetchGstReportExportSummary();
          groflexService.toast.success("GST report exported successfully ");
        }
      });
  };

  const filterGstExportSummary = () => {
    if (generateGstReportFormData.sortBy === "all") {
      setFilteredRowData(rowData);
    } else {
      const filteredRowData = rowData.filter(
        (item) =>
          item.exportType.toLowerCase() === generateGstReportFormData.sortBy
      );
      setFilteredRowData(filteredRowData);
    }
  };

  const handleSendEmail = () => {
    let payload = {
      id: sendEmailFormData.id,
      subject: sendEmailFormData.subject,
      recipients: [sendEmailFormData.emails],
      text: sendEmailFormData.message,
    };
    groflexService
      .request(
        `${oldConfig.resourceHost}/accountantExport/${sendEmailFormData.id}/send`,
        {
          auth: true,
          data: payload,
          method: "POST",
        }
      )
      .then((res) => {
        if (res.body?.message) {
          groflexService.toast.error("Something went wrong");
        } else {
          groflexService.toast.success(
            "Balance sheet has been sent successfully "
          );
        }
        setIsEmailModalVisible(false);
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
    {
      label: "Custom",
      value: "custom",
    },
  ];

  const handleRowClick = (e) => {
    setSendEmailFormData({
      ...sendEmailFormData,
      exportperiod: e.exportPeriod,
      id: e.id,
      message: `Dear Ladies and Gentlemen, Enclosed I send you my accounting documents for the period ${e.exportPeriod}. Yours sincerely,`,
      subject: `Accounting documents ${e.exportPeriod}`,
    });
  };

  return (
    <PageContent title={"Gst Reports"}>
      <SendEmailModal
        isEmailModalVisible={isEmailModalVisible}
        setIsEmailModalVisible={setIsEmailModalVisible}
        handleSendEmail={handleSendEmail}
        sendEmailFormData={sendEmailFormData}
        setSendEmailFormData={setSendEmailFormData}
        fileName={`GST-Report_${sendEmailFormData.exportperiod}`}
        title={"Send GST Report"}
        attachmentCheckboxes={false}
      />
      <div className={"gst-reports-wrapper"}>
        <AdvancedCard type={"s-card"} containerClassName={"gst-filter-card"}>
          <div className="company-details">
            <h3 className="company-name">{companyAddress?.companyName}</h3>
            <div style={{ display: "flex", gap: "10px" }}>
              <h3 style={{ color: "#888787", fontWeight: "500" }}>GSTIN</h3>
              <h3 className="company-gst-no">{companyAddress?.gstNumber}</h3>
            </div>
          </div>
          <div className="columns is-multiline">
            <div className="column is-2">
              <div className="field">
                <label className="gst-filter-label">Gst report</label>
                <SelectInput
                  options={[
                    { label: "GSTR-1", value: "gstr1" },
                    { label: "GSTR-2A", value: "gstr2a" },
                    { label: "GSTR-3B", value: "gstr3b" },
                    { label: "GSTR-9", value: "gstr9" },
                  ]}
                  placeholder={"None"}
                  onChange={handleGstReportTypeChange}
                  value={generateGstReportFormData.gstReportType}
                />
              </div>
            </div>

            <div className="column is-2">
              <div className="field">
                <label className="gst-filter-label">Sort By</label>
                <SelectInput
                  options={[
                    { label: "ALL", value: "all" },
                    { label: "GSTR-1", value: "gstr1" },
                    { label: "GSTR-2A", value: "gstr2a" },
                    { label: "GSTR-3B", value: "gstr3b" },
                    { label: "GSTR-9", value: "gstr9" },
                  ]}
                  placeholder={"None"}
                  onChange={handleSortByTypeChange}
                  value={generateGstReportFormData.sortBy}
                />
              </div>
            </div>

            <div className="column is-2">
              <div className="field">
                <label className="gst-filter-label">Date</label>
                <SelectInput
                  options={dateOptions}
                  placeholder={"Select Date"}
                  onChange={handleDateDropDown}
                  value={generateGstReportFormData.dateDropDown}
                />
              </div>
            </div>
            {showCustomDateRangeSelector && (
              <div className="column is-3">
                <div
                  className="field"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label className="gst-filter-label">From</label>
                  <DateInput
                    selectedDate={moment(date.startDate)}
                    onDateChange={handleCustomStartDateChange}
                  />
                </div>
              </div>
            )}
            {showCustomDateRangeSelector && (
              <div className="column is-3">
                <div
                  className="field"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label className="gst-filter-label">To</label>
                  <DateInput
                    selectedDate={moment(date.endDate)}
                    onDateChange={handleCustomEndDateChange}
                  />
                </div>
              </div>
            )}
          </div>
          <Button
            isPrimary
            isDisabled={
              generateGstReportFormData.gstReportType &&
              generateGstReportFormData.dateDropDown
                ? false
                : true
            }
            isOutlined={
              generateGstReportFormData.gstReportType &&
              generateGstReportFormData.dateDropDown
                ? false
                : true
            }
            onClick={handleRunReport}
          >
            Run Report
          </Button>
        </AdvancedCard>

        <AdvancedCard type={"s-card"}>
          <h2 className="title is-5 is-bold">Export History</h2>
          {filteredRowData.length > 0 ? (
            <div className="gst-export-summary">
              <table className="table is-hoverable is-fullwidth">
                <tbody>
                  <tr className="gst-export-summary-headers">
                    <th>DATE</th>
                    <th>EXPORT PERIOD</th>
                    <th>EXPORT TYPE</th>
                    <th>FILE FORMAT</th>
                    <th style={{ textAlign: "center" }}>
                      DOWNLOAD &nbsp;| &nbsp;SHARE
                    </th>
                  </tr>
                  {filteredRowData.map((item, id) => (
                    <tr
                      className="gst-export-summary-row"
                      key={id}
                      onClick={() => handleRowClick(item)}
                    >
                      <td>{item.date}</td>
                      <td>{item.exportPeriod}</td>
                      <td>
                        {item.exportType.slice(0, 4) +
                          "-" +
                          item.exportType.slice(4)}
                      </td>
                      <td>{item.fileFormat}</td>
                      <td style={{ textAlign: "center" }}>
                        {item.download} &nbsp; | &nbsp;
                        {item.share}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="reports-empty-table">No data to show</div>
          )}
        </AdvancedCard>
      </div>
    </PageContent>
  );
};

export default GstReports;
