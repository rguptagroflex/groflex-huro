import React, { useEffect, useState } from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { ListAdvancedComponent } from "../../../shared/components/list-advanced/ListAdvancedComponent";
import { formatCurrency } from "../../../helpers/formatCurrency";
import {
  ListAdvancedDefaultSettings,
  customerTypes,
} from "../../../helpers/constants";
import { CustomShowHeaderSum } from "../../../shared/components/list-advanced/CustomShowHeaderSum";
import config from "../../../../../config";
import groflexService from "../../../services/groflex.service";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components/button/Button";
import { isNil } from "../../../helpers/isNil";
import { FeatherIcon } from "../../../shared/featherIcon/FeatherIcon";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import { Switch } from "../../../shared/components/switch/Switch";
import { TextArea } from "../../../shared/components/textArea/TextArea";
import RadioButton from "../../../shared/components/button/RadioButton";
import { SelectInput } from "../../../shared/components/select/SelectInput";
import { Input } from "../../../shared/components/input/Input";
import TaskInformation from "./TaskInformation";
import MeetingInformation from "./MeetingInformation";
import ToDoInformation from "./ToDoInformation";
import EmailInformation from "./EmailInformation";
import CallInformation from "./CallInformation";

const TaskDetails = () => {
  const [taskType, setTaskType] = useState("task");

  const [cardInfo, setCardInfo] = useState({
    assignedUser: "",
    lead: "",
    taskDescription: "",
    startDate: "",
    dueDate: "",
    status: "",
    label: "",
  });
  const [reminder, setReminder] = useState({
    remind: false,
    reminderDate: "",
    reminderTime: "",
    notificationType: "",
    repeat: "",
  });
  const [notes, setNotes] = useState({
    showNotes: false,
    notesContent: "",
  });

  const [infoCard, setInfoCard] = useState("");

  useEffect(() => {
    createInfoCard();
  }, [taskType]);
  const navigate = useNavigate();

  const handleTaskTypeChange = (e) => {
    setTaskType(e);
  };

  const handleRemindeToggle = () => {
    setReminder({
      ...reminder,
      remind: !reminder.remind,
    });
  };

  const handleReminderDateChange = (e) => {
    setReminder({
      ...reminder,
      reminderDate: e.target.value,
    });
  };

  const handleReminderTimeChange = (e) => {
    setReminder({
      ...reminder,
      reminderTime: e.target.value,
    });
  };

  const handleReminderNotificationTypeChange = (option) => {
    setReminder({
      ...reminder,
      notificationType: option.value,
    });
  };

  const handleReminderRepeatChange = (option) => {
    setReminder({
      ...reminder,
      repeat: option.value,
    });
  };

  const handleNotesChange = (e) => {
    setNotes({
      ...notes,
      notesContent: e.target.value,
    });
  };
  const handleShowNotesToggle = () => {
    setNotes({
      ...notes,
      showNotes: !notes.showNotes,
    });
  };

  const createInfoCard = () => {
    let card = {};
    switch (taskType) {
      case "meeting":
        card = {
          title: "Meeting Information",
          content: <MeetingInformation />,
        };
        break;
      case "task":
        card = {
          title: "Task Information",
          content: (
            <TaskInformation
              cardInfo={cardInfo}
              handleAssignedUserChange={() => handleAssignedUserChange}
              handleLeadChange={() => handleLeadChange}
              handleTaskDecriptionChange={() => handleTaskDecriptionChange}
              handleStartDateChange={() => handleStartDateChange}
              handleDueDateChange={() => handleDueDateChange}
              handleStatusChange={() => handleStatusChange}
              handleLabelChange={() => handleLabelChange}
            />
          ),
        };
        break;
      case "toDo":
        card = {
          title: "To-do Information",
          content: <ToDoInformation />,
        };
        break;
      case "email":
        card = {
          title: "Email Information",
          content: <EmailInformation />,
        };
        break;
      case "call":
        card = {
          title: "Call Information",
          content: <CallInformation />,
        };
        break;
    }
    setInfoCard(card);
  };

  //Funtions to handle task information states
  const handleAssignedUserChange = (option) => {
    setCardInfo({
      ...cardInfo,
      assignedUser: option.value,
    });
  };

  const handleLeadChange = (e) => {
    setCardInfo({
      ...cardInfo,
      lead: e.target.value,
    });
  };

  const handleTaskDecriptionChange = (e) => {
    setCardInfo({
      ...cardInfo,
      taskDescription: e.target.value,
    });
  };

  const handleStartDateChange = (e) => {
    setCardInfo({
      ...cardInfo,
      startDate: e.target.value,
    });
  };

  const handleDueDateChange = (e) => {
    setCardInfo({
      ...cardInfo,
      dueDate: e.target.value,
    });
  };

  const handleStatusChange = (option) => {
    setCardInfo({
      ...cardInfo,
      status: option.value,
    });
  };

  const handleLabelChange = (option) => {
    setCardInfo({
      ...cardInfo,
      label: option.value,
    });
  };

  const taskTypes = [
    {
      label: "Meeting",
      value: "meeting",
      class: "radio is-outlined is-success",
    },
    {
      label: "Task",
      value: "task",
      class: "radio is-outlined is-success",
    },
    {
      label: "To-do",
      value: "toDo",
      class: "radio is-outlined is-success",
    },
    {
      label: "E-mail",
      value: "email",
      class: "radio is-outlined is-success",
    },
    {
      label: "Call",
      value: "call",
      class: "radio is-outlined is-success",
    },
  ];

  const leads = [
    { label: "Lead A", value: "leadA" },
    { label: "Lead B", value: "leadB" },
  ];
  console.log(taskType);
  return (
    <PageContent
      title="Create"
      titleIsBreadCrumb
      breadCrumbData={["Home", "CRM", "Leads"]}
      titleActionContent={
        <Button onClick={() => console.log("Saved")} isSuccess>
          Save
        </Button>
      }
    >
      <div className="crm-task-details-wrapper">
        <div className="columns is-multiline">
          <div className="column is-7 type-info-card">
            <div className="task-info-card">
              <AdvancedCard type={"s-card"}>
                <h2 className="title is-5">{infoCard.title}</h2>
                <div className="task-info">
                  <div className="columns is-multiline m-b-5">
                    <RadioButton
                      choices={taskTypes}
                      selectedOption={taskType}
                      onChange={handleTaskTypeChange}
                      name="kind"
                    />
                  </div>
                  {infoCard.content}
                  {/* <TaskInformation
                    cardInfo={cardInfo}
                    handleAssignedUserChange={handleAssignedUserChange}
                    handleLeadChange={handleLeadChange}
                    handleTaskDecriptionChange={handleTaskDecriptionChange}
                    handleStartDateChange={handleStartDateChange}
                    handleDueDateChange={handleDueDateChange}
                    handleStatusChange={handleStatusChange}
                    handleLabelChange={handleLabelChange}
                  /> */}
                </div>
              </AdvancedCard>
            </div>
          </div>

          <div className="column is-5">
            <div className="reminder-card">
              <AdvancedCard type={"s-card"}>
                <h2 className="title is-5">Reminder</h2>
                <div className="toggle-reminder">
                  <h5>Do you want a reminder?</h5>
                  <Switch
                    onChange={handleRemindeToggle}
                    checked={reminder.remind}
                    isSuccess
                  />
                </div>

                <div className="columns is-multiline m-b-5">
                  <div className="column is-6">
                    <div className="field">
                      <label>Choose Date *</label>
                      <Input
                        onChange={handleReminderDateChange}
                        type={"text"}
                        placeholder={"None"}
                        value={reminder.reminderDate}
                      />
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="field">
                      <label>Time *</label>
                      <Input
                        onChange={handleReminderTimeChange}
                        type={"text"}
                        placeholder={"None"}
                        value={reminder.reminderTime}
                      />
                    </div>
                  </div>
                </div>

                <div className="columns is-multiline m-b-5">
                  <div className="column is-12">
                    <div className="field">
                      <label>Notify *</label>
                      <SelectInput
                        options={leads}
                        placeholder={<p>Search or type lead</p>}
                        onChange={handleReminderNotificationTypeChange}
                        value={reminder.notificationType}
                      />
                    </div>
                  </div>
                </div>

                <div className="columns is-multiline m-b-5">
                  <div className="column is-12">
                    <div className="field">
                      <label>Repeat *</label>
                      <SelectInput
                        options={leads}
                        placeholder={<p>Search or type lead</p>}
                        onChange={handleReminderRepeatChange}
                        value={reminder.repeat}
                      />
                    </div>
                  </div>
                </div>
              </AdvancedCard>
            </div>
            <div className="m-t-20" />

            <div className="notes-card">
              <AdvancedCard
                type={"s-card"}
                footer
                footerContentLeft={"Show notes when creating new documents"}
                footerContentRight={
                  <Switch
                    onChange={handleShowNotesToggle}
                    checked={notes.showNotes}
                    isSuccess
                  />
                }
              >
                <h2 className="title is-5 is-bold">Notes</h2>
                <TextArea
                  rows={3}
                  placeholder="Enter notes here"
                  onChange={handleNotesChange}
                  value={notes.notesContent}
                />
              </AdvancedCard>
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  );
};

export default TaskDetails;
