import React, { useState } from "react";
import PageContent from "../../shared/components/pageContent/PageContent";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import { Button } from "../../shared/components/button/Button";
import { ListAdvancedComponent } from "../../shared/components/list-advanced/ListAdvancedComponent";
import config from "../../../../config";
import { Input } from "../../shared/components/input/Input";
import { ListAdvancedDefaultSettings } from "../../helpers/constants";
import { CustomShowHeaderSum } from "../../shared/components/list-advanced/CustomShowHeaderSum";
import { formatCurrency } from "../../helpers/formatCurrency";
const ContactManagementDetails = () => {
  const contactList = [
    {
      contactName: "Arushi Nath",
      companyName: "Business Development at ASL India",
      contactEmail: "arushinath@mail.com",
      contactPhone: "+123456789",
    },
    {
      contactName: "Arushi Nath",
      companyName: "Business Development at ASL India",
      contactEmail: "arushinath@mail.com",
      contactPhone: "+123456789",
    },
    {
      contactName: "Arushi Nath",
      companyName: "Business Development at ASL India",
      contactEmail: "arushinath@mail.com",
      contactPhone: "+123456789",
    },
    {
      contactName: "Arushi Nath",
      companyName: "Business Development at ASL India",
      contactEmail: "arushinath@mail.com",
      contactPhone: "+123456789",
    },
    {
      contactName: "Arushi Nath",
      companyName: "Business Development at ASL India",
      contactEmail: "arushinath@mail.com",
      contactPhone: "+123456789",
    },
    {
      contactName: "Arushi Nath",
      companyName: "Business Development at ASL India",
      contactEmail: "arushinath@mail.com",
      contactPhone: "+123456789",
    },
  ];
  const [contactDetails, setContactDetails] = useState({
    email: "",
    state: "",
    createdDate: "",
    contactOwner: "",
    closedDeals: "",
  });

  const handleEmailChange = (e) => {
    setContactDetails({
      ...contactDetails,
      email: e.target.value,
    });
  };
  const handleStateChange = (e) => {
    setContactDetails({
      ...contactDetails,
      state: e.target.value,
    });
  };
  const handleCreatedDateChange = (e) => {
    setContactDetails({
      ...contactDetails,
      createdDate: e.target.value,
    });
  };
  const handleContactOwnerChange = (e) => {
    setContactDetails({
      ...contactDetails,
      contactOwner: e.target.value,
    });
  };
  const handleclosedDealsChange = (e) => {
    setContactDetails({
      ...contactDetails,
      closedDeals: e.target.value,
    });
  };
  const handleActionClick = () => {};
  const actions = [
    { name: "Edit", icon: "edit" },
    { name: "Delete", icon: "trash-alt" },
  ];

  return (
    <PageContent
      title="Contact Management"
      titleIsBreadCrumb
      breadCrumbData={["Home", "Crm"]}
      titleActionContent={""}
    >
      <div className="contact-management-details-wrapper">
        <div className="columns is-multiline">
          <div className="column is-7 left-content">
            <div className="contact-basic-info-container">
              <AdvancedCard type={"s-card"}>
                <h2 className="title is-5">Contact Info</h2>
                <div className="contact-image"></div>
                <div className="contact-basic-info-fields">
                  <div className="columns is-multiline m-b-5">
                    <div className="column is-12">
                      <div className="field">
                        <label>Email</label>
                        <Input
                          onChange={handleEmailChange}
                          type={"text"}
                          placeholder={"None"}
                          value={""}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="columns is-multiline m-b-5">
                    <div className="column is-12">
                      <div className="field">
                        <label>State</label>
                        <Input
                          onChange={handleStateChange}
                          type={"text"}
                          placeholder={"None"}
                          value={""}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="columns is-multiline m-b-5">
                    <div className="column is-12">
                      <div className="field">
                        <label>Created Date</label>
                        <Input
                          onChange={handleCreatedDateChange}
                          type={"text"}
                          placeholder={"None"}
                          value={""}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="columns is-multiline m-b-5">
                    <div className="column is-12">
                      <div className="field">
                        <label>Contact Owner</label>
                        <Input
                          onChange={handleContactOwnerChange}
                          type={"text"}
                          placeholder={"None"}
                          value={""}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="columns is-multiline m-b-5">
                    <div className="column is-12">
                      <div className="field">
                        <label>Closed Deals</label>
                        <Input
                          onChange={handleclosedDealsChange}
                          type={"text"}
                          placeholder={"None"}
                          value={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-divider"></div>
                <div className="contact-management-details-contact-list">
                  <h3 className="title is-5">Contact Info</h3>
                  {contactList.map((contact) => (
                    <div className="contact-container">
                      <h5 className="contact-name">{contact.contactName}</h5>
                      <span className="company-name">
                        {contact.companyName}
                      </span>
                      <span className="contact-email">
                        {contact.contactEmail}
                      </span>
                      <span className="contact-phone">
                        {contact.contactPhone}
                      </span>
                    </div>
                  ))}
                </div>
              </AdvancedCard>
            </div>
          </div>

          <div className="column is-5 right-content">
            <AdvancedCard type={"s-card"}>
              <h2 className="title is-5">Recent Activity</h2>
            </AdvancedCard>
            <div className="m-t-20" />
            <AdvancedCard type={"s-card"}>
              <h2 className="title is-5">Deals</h2>
              <ListAdvancedComponent
                onActionClick={handleActionClick}
                columnDefs={[
                  { field: "dealName", headerName: "Deal Name" },
                  { field: "amount", headerName: "Amount" },

                  {
                    field: "price",
                    headerName: "Price",
                    cellClass:
                      ListAdvancedDefaultSettings.EXCEL_STYLE_IDS.Currency,
                    valueFormatter: (evt) => {
                      return formatCurrency(0);
                    },

                    headerComponentParams: { value: "mrp", headerName: "MRP" },
                  },
                  { field: "closedDate", headerName: "Closed Date" },
                ]}
                fetchUrl={config.resourceUrls.customers}
                actionMenuData={actions}
              />
            </AdvancedCard>
          </div>
        </div>
      </div>
    </PageContent>
  );
};

export default ContactManagementDetails;