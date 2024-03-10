import React, { useEffect, useState } from "react";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import { TextArea } from "../../shared/components/textArea/TextArea";
import quotationSvg from "../../../assets/groflex/icons/quotationsIcon.svg";
import balanceSvg from "../../../assets/groflex/icons/balanceIcon.svg";
import invoiceSvg from "../../../assets/groflex/icons/invoiceIcon.svg";
import oldConfig from "../../../../oldConfig";
import creditNoteSvg from "../../../assets/groflex/icons/creditNoteIcon.svg";
import eccessPaymentSvg from "../../../assets/groflex/icons/eccessPaymentIcon.svg";
import receivablesSvg from "../../../assets/groflex/icons/receivablesIcon.svg";
import { formatCurrency } from "../../helpers/formatCurrency";
import groflexService from "../../services/groflex.service";
import CreateChart from "../../shared/components/chartjs/CreateChart";
import ContactLedger from "./ContactLedger";
const ContactOverviewTab = ({ contactId }) => {
  const [notes, setNotes] = useState("");
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const [contactData, setContactData] = useState({
    openQuotations: "",
    openningBalance: "",
    openInvoices: "",
    outstandingReceivables: "",
    excessPayment: "",
    creditNotes: "",
    customerNo: "",
    website: "",
    address: "",
    email: "",
    mobile: "",
    turnoverTotal: 0,
    name: "",
  });

  const [chartValues, setChartValues] = useState([]);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = () => {
    Promise.all([
      groflexService.request(`${oldConfig.customer.resourceUrl}/${contactId}`, {
        auth: true,
      }),
      groflexService.request(
        `${oldConfig.customer.resourceUrl}/${contactId}/salesVolume`,
        {
          auth: true,
        }
      ),
    ]).then((res) => {
      if (res[0]?.body?.data && res[1]?.body?.data) {
        let chartValues = [];
        const customerInfo = res[0].body.data;
        const salesVolume = res[1].body.data;
        salesVolume.chartData.forEach((item) => {
          chartValues.push(item.sales);
        });
        setChartValues(chartValues);

        setContactData({
          ...contactData,
          customerNo: customerInfo.number,
          website: customerInfo.website,
          address: customerInfo.address.street,
          email: customerInfo.email,
          mobile: customerInfo.phone1,
          openningBalance: customerInfo.openingBalance,
          creditNotes: Math.abs(customerInfo.credits),
          openInvoices: salesVolume.openInvoicesTurnOver
            ? salesVolume.openInvoicesTurnOver
            : parseFloat(0).toFixed(2),
          openQuotations: salesVolume.openOffersTurnOver
            ? salesVolume.openOffersTurnOver
            : parseFloat(0).toFixed(2),
          outstandingReceivables: salesVolume.outstandingAmount
            ? salesVolume.outstandingAmount
            : parseFloat(0).toFixed(2),
          excessPayment: salesVolume.openTrackedTimesTurnOver
            ? salesVolume.openTrackedTimesTurnOver
            : parseFloat(0).toFixed(2),
          turnoverTotal: salesVolume.turnoverTotal,
          name: customerInfo.name,
        });
      }
    });
  };

  const chartData = {
    labels: ["A", "M", "J", "J", "A", "S", "O", "N", "D", "J", "F", "M"],

    datasets: [
      {
        label: "",
        data: chartValues,
        backgroundColor: ["#0071ca"],
      },
    ],
  };

  const chartOptions = {
    barThickness: 10,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="contact-overview-tab-main">
      <div className="columns is-multiline">
        <div className="column is-4">
          <AdvancedCard
            type={"s-card"}
            containerClassName={"left-card"}
          ></AdvancedCard>
          <AdvancedCard type={"s-card"} containerClassName={"left-card"}>
            <h2 className="title is-5 is-bold">Notes</h2>
            <div className="field">
              <TextArea
                rows={3}
                placeholder="Enter Additional Notes here"
                value={notes}
                onChange={handleNotesChange}
                name="notes"
              />
            </div>
          </AdvancedCard>
          <AdvancedCard type={"s-card"} containerClassName={"left-card"}>
            <h2 className="title is-5 is-bold">Conditions</h2>
            <div className="payment-conditions-container">
              <div className="payment-conditions-sub-container">
                <h2>PAYMENT</h2>
                <h2>DISCOUNT</h2>
              </div>
              <div className="payment-conditions-sub-container">
                <h3>Standard</h3>
                <h3>0 %</h3>
              </div>
            </div>
          </AdvancedCard>
        </div>
        <div className="column is-8">
          <div className="columns is-multiline">
            <div className="column is-7">
              <AdvancedCard type={"s-card"}>
                <div className="contact-financial-card-container">
                  <div className="contact-financial-card">
                    <img src={quotationSvg} alt="rupeeSvg" />
                    <h2>Open Quotations</h2>
                    <h3>{formatCurrency(contactData.openQuotations)} </h3>
                  </div>
                  <div className="contact-financial-card">
                    <img src={balanceSvg} alt="rupeeSvg" />
                    <h2>Openning Balance</h2>
                    <h3>{formatCurrency(contactData.openningBalance)} </h3>
                  </div>
                  <div className="contact-financial-card">
                    <img src={invoiceSvg} alt="rupeeSvg" />
                    <h2>Open Invoices</h2>
                    <h3>{formatCurrency(contactData.openInvoices)} </h3>
                  </div>
                </div>

                <div className="contact-financial-card-container">
                  <div className="contact-financial-card">
                    <img src={receivablesSvg} alt="rupeeSvg" />
                    <h2>Outstanding receivables</h2>
                    <h3>
                      {formatCurrency(contactData.outstandingReceivables)}
                    </h3>
                  </div>
                  <div className="contact-financial-card">
                    <img src={eccessPaymentSvg} alt="rupeeSvg" />
                    <h2>Excess payment</h2>
                    <h3>{formatCurrency(contactData.excessPayment)} </h3>
                  </div>
                  <div className="contact-financial-card">
                    <img src={creditNoteSvg} alt="rupeeSvg" />
                    <h2 style={{ marginBottom: "18px" }}>Credit notes</h2>
                    <h3>{formatCurrency(contactData.creditNotes)} </h3>
                  </div>
                </div>
              </AdvancedCard>
            </div>
            <div className="column is-5">
              <AdvancedCard type={"s-card"}>
                <div className="contact-basic-details">
                  <div className="basic-details-row">
                    <div style={{ width: "130px" }}>
                      <h2>Customer No</h2>
                      <h3>{contactData.customerNo}</h3>
                    </div>
                    <div style={{ width: "130px" }}>
                      <h2>Website</h2>
                      <h3>{contactData.website ? contactData.website : "-"}</h3>
                    </div>
                  </div>

                  <div className="basic-details-row">
                    <div style={{ width: "130px" }}>
                      <h2>Address</h2>
                      <h3>{contactData.address ? contactData.address : "-"}</h3>
                    </div>
                    <div style={{ width: "130px" }}>
                      <h2>Email</h2>
                      <h3>{contactData.email ? contactData.email : "-"}</h3>
                    </div>
                  </div>

                  <div className="basic-details-row">
                    <div style={{ width: "130px" }}>
                      <h2>Mobile</h2>
                      <h3>{contactData.mobile ? contactData.mobile : "-"}</h3>
                    </div>
                  </div>
                </div>
              </AdvancedCard>
            </div>
          </div>

          <div className="columns is-multiline">
            <div className="column is-12">
              <ContactLedger
                contactId={contactId}
                contactName={contactData.name}
              />
            </div>
          </div>
          <div className="columns is-multiline">
            <div className="column is-12">
              <AdvancedCard type={"s-card"}>
                <div className="contact-sales-and-purchases">
                  <div className="columns is-multiline">
                    <h2 className="title is-5 is-bold column is-9">
                      Sales Overview
                    </h2>
                    <div
                      className="column is-3"
                      style={{
                        textAlign: "right",
                        borderRadius: "10px",
                        background: "#f1f8fb",
                      }}
                    >
                      <h3 style={{ fontSize: "15px", fontWeight: "500" }}>
                        Total Revenue
                      </h3>
                      <h3 style={{ fontSize: "18px", color: "#00a353" }}>
                        {formatCurrency(contactData.turnoverTotal)}
                      </h3>
                    </div>
                  </div>

                  <h5 className="m-b-20">Sales over the last 12 months</h5>

                  <CreateChart
                    chartData={chartData}
                    chartOptions={chartOptions}
                    chartType={"barChart"}
                  />
                </div>
              </AdvancedCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactOverviewTab;
