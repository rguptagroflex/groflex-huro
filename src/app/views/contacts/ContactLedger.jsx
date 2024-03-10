import React, { useEffect, useState } from "react";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import { SelectInput } from "../../shared/components/select/SelectInput";
import moment from "moment";
import { Checkbox } from "../../shared/components/checkbox/Checkbox";
import { Button } from "../../shared/components/button/Button";
import oldConfig from "../../../../oldConfig";
import groflexService from "../../services/groflex.service";
import RadioButton from "../../shared/components/button/RadioButton";
import SendEmailModal from "../../shared/components/sendEmail/SendEmailModal";
import DateInput from "../../shared/components/datePicker/DateInput";
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
const ContactLedger = ({ contactId, contactName }) => {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [dateFilter, setDateFilter] = useState("");
  const [showCustomDateRangeSelector, setShowCustomDateRangeSelector] =
    useState(false);

  const [fileFormat, setFileFormat] = useState("");
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);

  const [sendEmailFormData, setSendEmailFormData] = useState({
    emails: "",
    subject: "",
    message: "",
    pdf: false,
    csv: false,
  });
  useEffect(() => {
    if (dateFilter.length > 0) {
      handleDateChange();
    }
  }, [dateFilter]);

  const handleDateFilterChange = (option) => {
    setDateFilter(option.value);
  };

  const handleDateChange = () => {
    let startDate = "";
    let endDate = "";
    switch (dateFilter) {
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

    if (dateFilter !== "custom") {
      setDate({
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD"),
      });
    }
  };

  const handleCustomStartDateChange = (value) => {
    setDate({
      ...date,
      startDate: moment(value).format("YYYY-MM-DD"),
    });
  };
  const handleCustomEndDateChange = (value) => {
    setDate({
      ...date,
      endDate: moment(value).format("YYYY-MM-DD"),
    });
  };

  const exportCustomerLedger = () => {
    groflexService
      .request(
        `${oldConfig.customer.resourceUrl}/${contactId}/statement/${date.startDate}/${date.endDate}?type=${fileFormat}`,
        {
          auth: true,
          method: "GET",
          headers: { "Content-Type": `application/${fileFormat}` },
        }
      )
      .then(({ body }) => {
        var blob = new Blob([body], { type: "application/text" });

        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${moment(date.startDate).format()}_${moment(
          date.endDate
        ).format()}.${fileFormat}`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      });
  };

  const handleSendEmail = () => {
    let sendType = "";
    if (sendEmailFormData.pdf && sendEmailFormData.csv) {
      sendType = "both";
    } else if (sendEmailFormData.pdf) {
      sendType = "pdf";
    } else if (sendEmailFormData.csv) {
      sendType = "both";
    }

    let payload = {
      customerId: contactId,
      recipients: [sendEmailFormData.emails],
      subject: sendEmailFormData.subject,
      text: sendEmailFormData.message,
      sendCopy: false,
      sendType: sendType,
    };
    groflexService
      .request(
        `${oldConfig.resourceHost}accountingReport/sendAccountingReportEmail/CustomerLedger/${date.startDate}/${date.endDate}`,
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
          groflexService.toast.success("Ledger has been sent successfully ");
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

  return (
    <AdvancedCard type={"s-card"}>
      <div className="contact-ledger">
        <h2 className="title is-5 is-bold">Ledger</h2>
        <h6>Export transaction details</h6>
        <div className="columns is-multiline">
          <div className="column is-4">
            <div className="field">
              <SelectInput
                options={dateOptions}
                placeholder={"Select Period"}
                onChange={handleDateFilterChange}
                value={dateFilter}
              />
            </div>
          </div>

          <div className="column is-4">
            <div className="field">
              <RadioButton
                choices={[
                  {
                    label: "PDF",
                    value: "pdf",
                    class: "radio is-outlined is-success",
                  },
                  {
                    label: "CSV",
                    value: "csv",
                    class: "radio is-outlined is-success",
                  },
                ]}
                selectedOption={fileFormat}
                onChange={(fileType) => setFileFormat(fileType)}
                name="kind"
              />
            </div>
          </div>

          <div className="column is-2">
            <Button
              isOutlined
              isPrimary
              onClick={exportCustomerLedger}
              isDisabled={!date.startDate && !date.endDate}
            >
              Export
            </Button>
          </div>

          <div className="column is-2">
            <Button
              isOutlined
              isPrimary
              onClick={() => setIsEmailModalVisible(true)}
              isDisabled={!date.startDate && !date.endDate}
            >
              Email
            </Button>
          </div>
        </div>
        {showCustomDateRangeSelector && (
          <div className="columns is-multiline" style={{ marginTop: "10px" }}>
            <div className="column is-3">
              <DateInput
                selectedDate={moment(date.startDate)}
                onDateChange={handleCustomStartDateChange}
              />
            </div>
            <div className="column is-3">
              <DateInput
                selectedDate={moment(date.endDate)}
                onDateChange={handleCustomEndDateChange}
              />
            </div>
          </div>
        )}
      </div>
      <SendEmailModal
        isEmailModalVisible={isEmailModalVisible}
        setIsEmailModalVisible={setIsEmailModalVisible}
        handleSendEmail={handleSendEmail}
        sendEmailFormData={sendEmailFormData}
        setSendEmailFormData={setSendEmailFormData}
        fileName={`${contactName}_ledger_${moment(date.startDate).format(
          "YYYY-MM-DD"
        )}-to-${moment(date.endDate).format("YYYY-MM-DD")}`}
        title={"Send Ledger"}
      />
    </AdvancedCard>
  );
};

export default ContactLedger;
