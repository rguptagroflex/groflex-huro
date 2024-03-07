import React from "react";
import Modal from "../../shared/components/modal/Modal";
import groflexService from "../../services/groflex.service";
import oldConfig from "../../../../oldConfig";
const DeleteModal = ({
  isDeleteModalVisible,
  setIsDeleteModalVisible,
  contactId,
}) => {
  const delteContact = () => {
    groflexService
      .request(`${oldConfig.customer.resourceUrl}/${contactId}`, {
        auth: true,
        method: "DELETE",
      })
      .then((res) => {
        console.log(res);
        if (res) {
          groflexService.toast.success("Contact deleted successfully");
          setIsDeleteModalVisible(false);
        }
      });
  };
  return (
    <Modal
      isActive={isDeleteModalVisible}
      setIsAcive={setIsDeleteModalVisible}
      title={"Delete Contact"}
      onSubmit={delteContact}
      submitBtnName={"Delete"}
      isSmall
    >
      Are you sure you want to delete this contact?
    </Modal>
  );
};

export default DeleteModal;
