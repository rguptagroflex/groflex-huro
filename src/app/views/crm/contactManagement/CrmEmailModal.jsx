import React, { useState } from "react";
import Modal from "../../../shared/components/modal/Modal";
import { SelectInput } from "../../../shared/components/select/SelectInput";
import { Input } from "../../../shared/components/input/Input";
import DateInput from "../../../shared/components/datePicker/DateInput";
import TimeInput from "../../../shared/components/timePicker/TimeInput";
import moment from "moment";
import { Switch } from "../../../shared/components/switch/Switch";

const CrmEmailModal = ({ isEmailModalVisible, setIsEmailModalVisible }) => {
  const [emailInfo, setEmailInfo] = useState({
    contacts: "",
    emails: "",
    description: "",
  });
  const [reminder, setReminder] = useState({
    remind: false,
    reminderDate: "",
    reminderTime: moment(),
    notificationType: "",
    repeat: "daily",
  });

  const handleSend = () => {
    setIsEmailModalVisible(false);
  };
  const handleEmailChange = (option) => {
    setEmailInfo({
      ...emailInfo,
      emails: option.value,
    });
  };
  const handleContactsChange = (option) => {
    setEmailInfo({
      ...emailInfo,
      contacts: option.value,
    });
  };
  const handleDescriptionChange = () => {
    setEmailInfo({
      ...emailInfo,
      description: e.target.value,
    });
  };

  const handleRemindeToggle = () => {
    setReminder({
      ...reminder,
      remind: !reminder.remind,
    });
  };

  const handleReminderDateChange = (date) => {
    setReminder({
      ...reminder,
      reminderDate: date,
    });
  };

  const handleReminderTimeChange = (time) => {
    setReminder({
      ...reminder,
      reminderTime: time,
    });
  };

  const handleReminderRepeatChange = (option) => {
    setReminder({
      ...reminder,
      repeat: option.value,
    });
  };
  const emails = [
    { label: "a@gmail.com", value: "a@gmail.com" },
    { label: "b@gmail.com", value: "b@gmail.com" },
  ];
  const contacts = [
    { label: "User A", value: "userA" },
    { label: "User B", value: "userB" },
  ];

  const repeatDropDownValues = [
    { label: "Daily", value: "daily" },
    { label: "weekly", value: "weekly" },
    { label: "Yearly", value: "yearly" },
  ];
  console.log(reminder);
  return (
    <div className="crm-email-modal-wrapper">
      <Modal
        isActive={isEmailModalVisible}
        setIsAcive={setIsEmailModalVisible}
        title={"Email"}
        onSubmit={handleSend}
        submitBtnName={"Send"}
        isMedium
      >
        <div className="columns is-multiline m-b-5">
          <div className="column is-12">
            <div className="field">
              <label>Send To</label>
              <SelectInput
                options={contacts}
                placeholder={<p>Search or type name</p>}
                onChange={handleContactsChange}
                value={emailInfo.contacts}
              />
            </div>
          </div>
        </div>
        <div className="columns is-multiline m-b-5">
          <div className="column is-12">
            <div className="field">
              <label>Emails</label>
              <SelectInput
                options={emails}
                placeholder={<p>Search or type email</p>}
                onChange={handleEmailChange}
                value={emailInfo.emails}
              />
            </div>
          </div>
        </div>

        <div className="columns is-multiline m-b-5">
          <div className="column is-12">
            <div className="field">
              <label>Description</label>
              <Input
                onChange={handleDescriptionChange}
                type={"text"}
                placeholder={"Enter email description"}
                value={emailInfo.description}
              />
            </div>
          </div>
        </div>

        <div className="reminder-container">
          <div className="toggle-reminder">
            <h5>Do you want a reminder?</h5>
            <Switch
              onChange={handleRemindeToggle}
              checked={reminder.remind}
              isSuccess
            />
          </div>
          {reminder.remind && (
            <div className="reminder-fields-container">
              <div className="reminder-fields">
                <div className="field">
                  <label>Choose Date *</label>

                  <DateInput
                    selectedDate={reminder.reminderDate}
                    onDateChange={handleReminderDateChange}
                  />
                </div>
              </div>
              <div className="reminder-fields">
                <div className="field">
                  <label>Time *</label>

                  <TimeInput
                    size={"small"}
                    onChange={handleReminderTimeChange}
                    value={moment(reminder.reminderTime)}
                  />
                </div>
              </div>

              <div className="reminder-fields">
                <div className="field">
                  <label>Repeat *</label>
                  <SelectInput
                    options={repeatDropDownValues}
                    placeholder={<p>Select when to repeat</p>}
                    onChange={handleReminderRepeatChange}
                    value={reminder.repeat}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CrmEmailModal;
