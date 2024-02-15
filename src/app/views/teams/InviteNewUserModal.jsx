import React, { useState } from "react";
import Modal from "../../shared/components/modal/Modal";
import { Input } from "../../shared/components/input/Input";
import RadioButton from "../../shared/components/button/RadioButton";

const InviteNewUserModal = ({
  isNewUserModalVisible,
  setIsNewUserModalVisible,
}) => {
  const [newUserInviteFormData, setNewUserInviteFormData] = useState({
    email: "",
    userType: "",
  });

  const handleEmailChange = (e) => {
    setNewUserInviteFormData({
      ...newUserInviteFormData,
      email: e.target.value,
    });
  };

  const handleUserTypeChange = (e) => {
    setNewUserInviteFormData({
      ...newUserInviteFormData,
      userType: e,
    });
  };

  const userTypes = [
    {
      label: (
        <div>
          <div className="role-select-heading">Admin</div>
          <div className="role-select-subheading">
            Full access to all functions. No authorization to carry out paid
            promotions.
          </div>
        </div>
      ),
      value: "admin",
      class: "radio is-outlined is-success",
    },
    {
      label: (
        <div>
          <div className="role-select-heading">Accountant</div>
          <div className="role-select-subheading">
            Create and edit invoices, customers, articles, offers, expenses,
            delivery notes and time records. No insight into finances and sales.
          </div>
        </div>
      ),
      value: "accountant",
      class: "radio is-outlined is-success",
    },
    {
      label: (
        <div>
          <div className="role-select-heading">Limited User</div>
          <div className="role-select-subheading">
            Create and edit invoices, quotations and expenses only. Very limited
            access to perform administrative tasks and no insight into finances
            and sales.
          </div>
        </div>
      ),
      value: "limitedUser",
      class: "radio is-outlined is-success",
    },
  ];
  console.log(newUserInviteFormData);
  return (
    <div className="teams-invite-new-user-wrapper">
      <Modal
        isActive={isNewUserModalVisible}
        setIsAcive={setIsNewUserModalVisible}
        submitBtnName={"Send Invitation"}
        title={
          <div className="teams-invite-title-container">
            <div className="invite-heading">Invite an additional user</div>
            <div className="invite-subheading">
              Invite a user to join your Groflex account as one of the roles
              below by sending them an invitation by e-mail.
            </div>
          </div>
        }
        ModalHeaderButton={" "}
      >
        <div className="columns is-multiline m-b-15">
          <div className="column is-12">
            <div className="field">
              <label>Email *</label>
              <Input
                onChange={handleEmailChange}
                placeholder={"Email"}
                type={"text"}
                value={newUserInviteFormData.email}
              />
            </div>
          </div>
        </div>

        <div className="columns is-multiline m-b-5 user-type-container">
          <RadioButton
            choices={userTypes}
            selectedOption={newUserInviteFormData.userType}
            onChange={handleUserTypeChange}
            name="kind"
          />
        </div>
      </Modal>
    </div>
  );
};

export default InviteNewUserModal;
