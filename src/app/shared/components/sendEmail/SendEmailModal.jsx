import React, { useState } from "react";
import Modal from "../modal/Modal";
import { Input } from "../input/Input";
import { TextArea } from "../textArea/TextArea";
import { Checkbox } from "../checkbox/Checkbox";
import FontAwesomeIcon from "../../fontAwesomeIcon/FontAwesomeIcon";

const SendEmailModal = ({
  isEmailModalVisible,
  setIsEmailModalVisible,
  handleSendEmail,
  title,
  fileName,
  sendEmailFormData,
  setSendEmailFormData,
}) => {
  const handleEmailChange = (e) => {
    setSendEmailFormData({
      ...sendEmailFormData,
      emails: e.target.value,
    });
  };

  const handleSubjectChange = (e) => {
    setSendEmailFormData({
      ...sendEmailFormData,
      subject: e.target.value,
    });
  };
  const handleMessageChange = (e) => {
    setSendEmailFormData({
      ...sendEmailFormData,
      message: e.target.value,
    });
  };

  return (
    <div className="send-email-modal-wrapper">
      <Modal
        isActive={isEmailModalVisible}
        setIsAcive={setIsEmailModalVisible}
        title={title}
        onSubmit={handleSendEmail}
        submitBtnName={"Send Email"}
        isMedium
      >
        <div className="columns is-multiline m-b-5">
          <div className="column is-12">
            <div className="field">
              <label>Email</label>
              <Input
                onChange={handleEmailChange}
                type="text"
                placeholder={"Type email address"}
                value={sendEmailFormData.emails}
                name="emails"
              />
            </div>
          </div>
        </div>

        <div className="columns is-multiline m-b-5">
          <div className="column is-12">
            <div className="field">
              <label>Subject</label>
              <Input
                onChange={handleSubjectChange}
                type="text"
                placeholder={"Enter subject"}
                value={sendEmailFormData.subject}
                name="subject"
              />
            </div>
          </div>
        </div>

        <div className="columns is-multiline m-b-5">
          <div className="column is-12">
            <div className="field">
              <label>Message</label>
              <TextArea
                rows={3}
                placeholder="Enter message"
                onChange={handleMessageChange}
                value={sendEmailFormData.message}
              />
            </div>
          </div>
        </div>

        <div className="columns is-multiline m-b-5">
          <div className="column is-3">
            <div className="field">
              <Checkbox
                label={"PDF"}
                value={sendEmailFormData.pdf}
                checked={sendEmailFormData.pdf}
                onChange={() =>
                  setSendEmailFormData({
                    ...sendEmailFormData,
                    pdf: !sendEmailFormData.pdf,
                  })
                }
              />
            </div>
          </div>
          <div className="column is-3">
            <div className="field">
              <Checkbox
                label={"CSV"}
                value={sendEmailFormData.csv}
                checked={sendEmailFormData.csv}
                onChange={() =>
                  setSendEmailFormData({
                    ...sendEmailFormData,
                    csv: !sendEmailFormData.csv,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="columns is-multiline m-b-5">
          <div className="column is-12">
            <div className="field">
              <label>Attachments</label>
              {sendEmailFormData.pdf && (
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "10px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <FontAwesomeIcon
                      name={"circle-check"}
                      size={15}
                      color="#00A353"
                    />
                    {fileName + "." + "pdf"}
                  </div>

                  <FontAwesomeIcon
                    name={"trash"}
                    size={15}
                    color="#00A353"
                    onClick={() =>
                      setSendEmailFormData({
                        ...sendEmailFormData,
                        pdf: false,
                      })
                    }
                  />
                </div>
              )}
              {sendEmailFormData.csv && (
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "10px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <FontAwesomeIcon
                      name={"circle-check"}
                      size={15}
                      color="#00A353"
                    />
                    {fileName + "." + "csv"}
                  </div>

                  <FontAwesomeIcon
                    name={"trash"}
                    size={15}
                    color="#00A353"
                    onClick={() =>
                      setSendEmailFormData({
                        ...sendEmailFormData,
                        csv: false,
                      })
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SendEmailModal;
