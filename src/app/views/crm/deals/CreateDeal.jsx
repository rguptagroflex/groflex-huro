import React, { useEffect, useState } from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import { Input } from "../../../shared/components/input/Input";
import { SelectInput } from "../../../shared/components/select/SelectInput";
import { TextArea } from "../../../shared/components/textArea/TextArea";
import { Switch } from "../../../shared/components/switch/Switch";
import { Button } from "../../../shared/components/button/Button";
import DateInput from "../../../shared/components/datePicker/DateInput";

const CreateDeal = () => {
  const [createDealFormData, setCreateDealFormData] = useState({
    dealName: "",
    dealOwner: "",
    type: "",
    stage: "",
    closingDate: "",
    amount: "",
    leadSource: "",
    priority: "",
    contactName: "",
    notes: "",
    showNotes: false,
  });

  const [topbarButton, setTopbarButton] = useState(false);

  const handleDealNameChange = (e) => {
    setCreateDealFormData({
      ...createDealFormData,
      dealName: e.target.value,
    });
  };

  const handleDealOwnerChange = (option) => {
    setCreateDealFormData({
      ...createDealFormData,
      dealOwner: option.value,
    });
  };

  const handleTypeChange = (option) => {
    setCreateDealFormData({
      ...createDealFormData,
      type: option.value,
    });
  };

  const handleStageChange = (option) => {
    setCreateDealFormData({
      ...createDealFormData,
      stage: option.value,
    });
  };

  const handleAmountChange = (e) => {
    setCreateDealFormData({
      ...createDealFormData,
      amount: e.target.value,
    });
  };

  const handleLeadSourceChange = (option) => {
    setCreateDealFormData({
      ...createDealFormData,
      leadSource: option.value,
    });
  };

  const handlePriorityChange = (option) => {
    setCreateDealFormData({
      ...createDealFormData,
      priority: option.value,
    });
  };

  const handleContactNameChange = (e) => {
    setCreateDealFormData({
      ...createDealFormData,
      contactName: e.target.value,
    });
  };

  const handleNotesChange = (e) => {
    setCreateDealFormData({
      ...createDealFormData,
      notes: e.target.value,
    });
  };
  const handleShowNotesToggle = () => {
    setCreateDealFormData({
      ...createDealFormData,
      showNotes: !createDealFormData.showNotes,
    });
  };

  const disableTopbarButton = () => {
    let isDisabled = false;
    if (!createDealFormData.dealName) {
      isDisabled = true;
    }

    setTopbarButton(isDisabled);
  };

  const handleClosingDateChange = (date) => {
    setCreateDealFormData({
      ...createDealFormData,
      closingDate: date,
    });
  };

  useEffect(() => {
    disableTopbarButton();
  }, [createDealFormData]);

  const types = [
    { label: "New Business", value: "newBusiness" },
    { label: "Existing Business", value: "existingBusiness" },
  ];

  const priorities = [
    { label: "Cold", value: "cold" },
    { label: "Warm", value: "warm" },
    { label: "Hot", value: "hot" },
  ];
  const leadSources = [
    { label: "Web Visitors", value: "webVisitors" },
    { label: "Social Media", value: "socialMedia" },
    { label: "Web Forms", value: "webForms" },
    { label: "Import", value: "import" },
    { label: "ChatBot", value: "chatBot" },
    { label: "Manually Created", value: "manuallyCreated" },
    { label: "Automations", value: "automations" },
    { label: "Other", value: "other" },
  ];

  const stages = [
    { label: "Prospect", value: "prospect" },
    { label: "Contact", value: "contact" },
    { label: "Proposal", value: "proposal" },
    { label: "Negotiation", value: "negotiation" },
    { label: "Closing", value: "closing" },
  ];

  return (
    <PageContent
      title={"Create Deal"}
      titleIsBreadCrumb
      breadCrumbData={["Home", "Crm", "Create Deal"]}
      titleActionContent={
        <Button onClick={() => alert("")} isSuccess isDisabled={topbarButton}>
          Save
        </Button>
      }
    >
      <div className="columns is-multiline">
        <div className="column is-7">
          <AdvancedCard type={"s-card"}>
            <h2 className="title is-5 is-bold">Deal Info</h2>
            <div className="columns is-multiline m-b-5">
              <div className="column is-12">
                <div className="field">
                  <label>Deal Name *</label>
                  <Input
                    onChange={handleDealNameChange}
                    placeholder={"None"}
                    type={"text"}
                    value={createDealFormData.dealName}
                  />
                </div>
              </div>
            </div>

            <div className="columns is-multiline m-b-5">
              <div className="column is-12">
                <div className="field">
                  <label>Deal Owner</label>
                  <SelectInput
                    options={[
                      { label: "Technology", value: "technology" },
                      { label: "Healthcare", value: "healthcare" },
                      { label: "Finance", value: "finance" },
                      { label: "Manufacturing", value: "manufacturing" },
                      { label: "Retail", value: "retail" },
                      { label: "Education", value: "education" },
                      { label: "Other", value: "other" },
                    ]}
                    placeholder={"None"}
                    onChange={handleDealOwnerChange}
                    value={createDealFormData.dealOwner}
                  />
                </div>
              </div>
            </div>

            <div className="columns is-multiline m-b-5">
              <div className="column is-6">
                <div className="field">
                  <label>Type</label>
                  <SelectInput
                    options={types}
                    placeholder={"None"}
                    onChange={handleTypeChange}
                    value={createDealFormData.type}
                  />
                </div>
              </div>
              <div className="column is-6">
                <div className="field">
                  <label>Stage</label>
                  <SelectInput
                    options={stages}
                    placeholder={"None"}
                    onChange={handleStageChange}
                    value={createDealFormData.stage}
                  />
                </div>
              </div>
            </div>

            <div className="columns is-multiline m-b-5">
              <div className="column is-6">
                <div className="field">
                  <label>Closing Date</label>
                  <DateInput
                    selectedDate={createDealFormData.closingDate}
                    onDateChange={handleClosingDateChange}
                  />
                </div>
              </div>
              <div className="column is-6">
                <div className="field">
                  <label>Amount</label>
                  <Input
                    onChange={handleAmountChange}
                    placeholder={"None"}
                    type={"text"}
                    value={createDealFormData.amount}
                  />
                </div>
              </div>
            </div>

            <div className="columns is-multiline m-b-5">
              <div className="column is-6">
                <div className="field">
                  <label>Lead Source</label>
                  <SelectInput
                    options={leadSources}
                    placeholder={"None"}
                    onChange={handleLeadSourceChange}
                    value={createDealFormData.leadSource}
                  />
                </div>
              </div>
              <div className="column is-6">
                <div className="field">
                  <label>Priority</label>
                  <SelectInput
                    options={priorities}
                    placeholder={"None"}
                    onChange={handlePriorityChange}
                    value={createDealFormData.priority}
                  />
                </div>
              </div>
            </div>

            <div className="columns is-multiline m-b-5">
              <div className="column is-12">
                <div className="field">
                  <label>Contact Name</label>
                  <Input
                    onChange={handleContactNameChange}
                    type={"text"}
                    placeholder={"None"}
                    value={createDealFormData.contactName}
                  />
                </div>
              </div>
            </div>
          </AdvancedCard>
        </div>

        {/* Notes section */}
        <div className="column is-5">
          <AdvancedCard
            type={"s-card"}
            footer
            footerContentLeft={"Show notes when creating new documents"}
            footerContentRight={
              <Switch
                onChange={handleShowNotesToggle}
                checked={createDealFormData.showNotes}
                isSuccess
              />
            }
          >
            <h2 className="title is-5 is-bold">Notes</h2>
            <TextArea
              rows={3}
              placeholder="Enter notes here"
              onChange={handleNotesChange}
              value={createDealFormData.notes}
            />
          </AdvancedCard>
        </div>
      </div>
    </PageContent>
  );
};

export default CreateDeal;
