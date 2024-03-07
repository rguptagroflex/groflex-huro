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
  });

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = () => {
    groflexService
      .request(`${oldConfig.customer.resourceUrl}/${contactId}`, { auth: true })
      .then((res) => {
        console.log(res);
        if (res && res.body.data) {
          const customer = res.body.data;
          setContactData({
            ...contactData,
            customerNo: customer.number,
            website: customer.website,
            address: customer.address.street,
            email: customer.email,
            mobile: customer.phone1,
          });
        }
      });
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
                    <h3>{formatCurrency(20)} </h3>
                  </div>
                  <div className="contact-financial-card">
                    <img src={balanceSvg} alt="rupeeSvg" />
                    <h2>Openning Balance</h2>
                    <h3>{formatCurrency(20)} </h3>
                  </div>
                  <div className="contact-financial-card">
                    <img src={invoiceSvg} alt="rupeeSvg" />
                    <h2>Open Invoices</h2>
                    <h3>{formatCurrency(20)} </h3>
                  </div>
                </div>

                <div className="contact-financial-card-container">
                  <div className="contact-financial-card">
                    <img src={receivablesSvg} alt="rupeeSvg" />
                    <h2>Outstanding receivables</h2>
                    <h3>{formatCurrency(20)} </h3>
                  </div>
                  <div className="contact-financial-card">
                    <img src={eccessPaymentSvg} alt="rupeeSvg" />
                    <h2>Excess payment</h2>
                    <h3>{formatCurrency(20)} </h3>
                  </div>
                  <div className="contact-financial-card">
                    <img src={creditNoteSvg} alt="rupeeSvg" />
                    <h2 style={{ marginBottom: "18px" }}>Credit notes</h2>
                    <h3>{formatCurrency(20)} </h3>
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
                      <h3>{contactData.website}</h3>
                    </div>
                  </div>

                  <div className="basic-details-row">
                    <div style={{ width: "130px" }}>
                      <h2>Address</h2>
                      <h3>{contactData.address}</h3>
                    </div>
                    <div style={{ width: "130px" }}>
                      <h2>Email</h2>
                      <h3>{contactData.email}</h3>
                    </div>
                  </div>

                  <div className="basic-details-row">
                    <div style={{ width: "130px" }}>
                      <h2>Mobile</h2>
                      <h3>{contactData.mobile}</h3>
                    </div>
                    {/* <div>
                      <h2>Telephone</h2>
                      <h3>google.com</h3>
                    </div> */}
                  </div>
                </div>
              </AdvancedCard>
            </div>
          </div>
          <div className="columns is-multiline">
            <div className="column is-12">
              <AdvancedCard type={"s-card"}>
                <div className="contact-sales-and-purchases"></div>
              </AdvancedCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactOverviewTab;
