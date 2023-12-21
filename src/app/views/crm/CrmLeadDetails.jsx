import React from "react";
import PageContent from "../../shared/components/pageContent/PageContent";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import { Button } from "../../shared/components/button/Button";

const CrmLeadDetails = () => {
  return (
    <PageContent
      title="Crm"
      titleIsBreadCrumb
      breadCrumbData={["Home", "Crm"]}
      titleActionContent={""}
    >
      <div className="crm-lead-details-wrapper">
        <div className="columns is-multiline">
          <div className="column is-7">
            <div className="lead-basic-info-card">
              <AdvancedCard type={"s-card"}>
                <div className="lead-image"></div>
                <div className="lead-details">
                  <h6 className="lead-name">Person</h6>
                  <h6 className="lead-role">Retailer</h6>
                </div>
                <div className="lead-button-container">
                  <Button isOutlined isPrimary isBold className={"mr-5"}>
                    Edit
                  </Button>
                  <Button isPrimary>Convert to deal</Button>
                </div>
              </AdvancedCard>
            </div>
            <div className="m-t-20" />
            <div className="lead-details-card">
              <AdvancedCard type={"s-card"}>
                <h2 className="title is-5">Lead Details</h2>
                <div className="columns is-multiline m-b-5">
                  <div className="column is-6">
                    <div className="field">
                      <label>First Name *</label>
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="field">
                      <label>Last Name *</label>
                    </div>
                  </div>
                </div>
              </AdvancedCard>
            </div>
            <div className="m-t-20" />
            <div className="lead-additional-details-card">
              <AdvancedCard type={"s-card"}>Second caard</AdvancedCard>
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  );
};

export default CrmLeadDetails;
