import React, { useState } from "react";
import Modal from "../modal/Modal";
import SelectMultipleInput from "../select/SelectMultipleInput";

const SendEmailModalComponent = ({
  isActive,
  closeFunction,
  title,
  submitBtnName,
  otherActionButtons,
  onSubmit,
  allowPdf = true,
  allowCsv,
  emailList,
  subject,
  allowAttachment,
}) => {
  const [formData, setFormData] = useState({
    attachmentName: "Invoice No. 0028.pdf",
    attachments: [],
    recipients: [], //["rgupta@groflex.io"],
    sendCopy: false,
    subject: subject, //"Payment reminder on account No. 0028",
    text: "", //"<p>Dear Ladies and Gentlemen,</p><p><br></p><p>in the hustle and bustle of everyday life, one can easily overlook an invoice. That's why we write to you today. For the items listed in the attachment, we have not yet received any payment from you.</p><p><br></p><p>We therefore allow us to remind you accordingly and ask you to settle the invoice amount in a timely manner. Maybe the thing is already done? In that case, thank you very much!</p>",
    textAdditional: "", //"<p>Yours sincerely,</p>",
  });

  return (
    <Modal
      title={title}
      isActive={isActive}
      submitDisabled={submitDisabled}
      otherActionButtons={otherActionButtons}
    >
      <div className="columns is-multiline">
        <div className="column is-12 field m-b-0">
          <SelectMultipleInput />
        </div>
        <div className="column is-12 field m-b-0"></div>
        <div className="column is-12 field m-b-0"></div>
      </div>
    </Modal>
  );
};

export default SendEmailModalComponent;
