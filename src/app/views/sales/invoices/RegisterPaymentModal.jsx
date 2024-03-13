import React, { useState } from "react";
import Modal from "../../../shared/components/modal/Modal";
import Invoice from "../../../models/invoice.model";
import { Input } from "../../../shared/components/input/Input";

const RegisterPaymentModal = ({
  isActive,
  closeFunction,
  onSubmit,
  invoice,
}) => {
  const modeledInvoice = new Invoice(invoice);

  const [formData, setFormData] = useState({
    outStandingBalance: modeledInvoice.outstandingAmount,
    paymentMethod: 3,
  });

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Modal
      title="Register payment"
      isActive={isActive}
      closeModalFunction={closeFunction}
      onSubmit={handleSubmit}
    >
      <Input placeholder={"Payment method"} />
      <Input placeholder={"Date of Receipt of payment"} />
      <Input placeholder={"Payment amount"} />
      <Input placeholder={"Note"} />
    </Modal>
  );
};

export default RegisterPaymentModal;
