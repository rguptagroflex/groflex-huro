import React from "react";
import Modal from "../../../shared/components/modal/Modal";

const DeleteBankModal = ({
  isActive,
  setIsActive,
  title,
  text,
  onConfirmDelete,
  // Receive bankId as a prop
}) => {
  const handleConfirmDelete = () => {
    // Pass bankId to onConfirmDelete
    onConfirmDelete();
  };

  return (
    <Modal
      title={title}
      submitBtnName="Delete"
      isActive={isActive}
      setIsActive={setIsActive}
      onSubmit={handleConfirmDelete}
      isSmall
    >
      Are you sure you want to delete {text}?
    </Modal>
  );
};

export default DeleteBankModal;
