import React, { useEffect, useState } from "react";
import Modal from "../../shared/components/modal/Modal";
import { Input } from "../../shared/components/input/Input";
import RadioButton from "../../shared/components/button/RadioButton";
import groflexService from "../../services/groflex.service";
import config from "../../../../config";

const EditRoleModal = ({
  isEditRoleModalVisible,
  setIsEditRoleModalVisible,
  userData,
}) => {
  const [userRole, setUserRole] = useState("");
  const handleUserRoleChange = (e) => {
    setUserRole(e);
  };

  useEffect(() => {
    if (userData) setUserRole(userData.role[0]);
  }, [isEditRoleModalVisible]);
  const handleSubmit = () => {
    const payload = {
      role: userRole,
    };
    groflexService
      .request(config.resourceUrls.updateUserRole(userData.id), {
        auth: true,
        data: payload,
        method: "POST",
      })
      .then((res) => {
        setIsEditRoleModalVisible(false);
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
      value: "user",
      class: "radio is-outlined is-success",
    },
  ];

  return (
    <div className="teams-invite-new-user-wrapper">
      <Modal
        isActive={isEditRoleModalVisible}
        setIsAcive={setIsEditRoleModalVisible}
        submitBtnName={"Save"}
        title={
          <div className="teams-invite-title-container">
            <div className="invite-heading">Change role</div>
            <div className="invite-subheading">
              Determine the permissions for the user{" "}
              <span style={{ color: "#00a353", fontWeight: "600" }}>
                {userData && userData.firstName + " " + userData.lastName}
              </span>
            </div>
          </div>
        }
        ModalHeaderButton={" "}
        onSubmit={handleSubmit}
      >
        <div className="columns is-multiline m-b-5 user-type-container">
          <RadioButton
            choices={userTypes}
            selectedOption={userRole}
            onChange={handleUserRoleChange}
            name="kind"
          />
        </div>
      </Modal>
    </div>
  );
};

export default EditRoleModal;
