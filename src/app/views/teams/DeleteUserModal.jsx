import React from "react";
import Modal from "../../shared/components/modal/Modal";
import groflexService from "../../services/groflex.service";
import config from "../../../../newConfig";

const DeleteUserModal = ({
  isDeleteUserModalVisible,
  setIsDeleteUserModalVisible,
  userData,
}) => {
  const handleDeleteUser = () => {
    groflexService
      .request(`${config.resourceUrls.deleteUser}${userData.id}`, {
        auth: true,
        method: "DELETE",
      })
      .then((res) => {
        setIsDeleteUserModalVisible(false);
        groflexService.toast.success("User deleted");
      });
  };

  return (
    <div className="teams-invite-new-user-wrapper">
      <Modal
        isActive={isDeleteUserModalVisible}
        setIsAcive={setIsDeleteUserModalVisible}
        submitBtnName={"Delete User"}
        title={
          <div className="teams-invite-title-container">
            <div className="invite-heading">Delete User</div>
          </div>
        }
        ModalHeaderButton={" "}
        onSubmit={handleDeleteUser}
      >
        <div className="columns is-multiline m-b-5">
          Are you sure that you would like to delete user
          {userData && userData.email} from this Groflex account? Please note
          you can always invite this user back later.
        </div>
      </Modal>
    </div>
  );
};

export default DeleteUserModal;
