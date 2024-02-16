import React, { useState } from "react";
import Modal from "../../shared/components/modal/Modal";
import { Input } from "../../shared/components/input/Input";
import groflexService from "../../services/groflex.service";
import config from "../../../../config";

const InviteCaModal = ({ isCaModalVisible, setIsCaModalVisible }) => {
  const [sendCaInviteFormData, setSendCaInviteFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    companyName: "",
    officeAddress: "",
  });

  const handleEmailChange = (e) => {
    setSendCaInviteFormData({
      ...sendCaInviteFormData,
      email: e.target.value,
    });
  };

  const handleFirstNameChange = (e) => {
    setSendCaInviteFormData({
      ...sendCaInviteFormData,
      firstName: e.target.value,
    });
  };

  const handleLastNameChange = (e) => {
    setSendCaInviteFormData({
      ...sendCaInviteFormData,
      lastName: e.target.value,
    });
  };

  const handlePhoneNumberChange = (e) => {
    setSendCaInviteFormData({
      ...sendCaInviteFormData,
      phone: e.target.value,
    });
  };

  const handleCompanyNameChange = (e) => {
    setSendCaInviteFormData({
      ...sendCaInviteFormData,
      companyName: e.target.value,
    });
  };

  const handleOfficeAddressChange = (e) => {
    setSendCaInviteFormData({
      ...sendCaInviteFormData,
      officeAddress: e.target.value,
    });
  };

  const handleSendInvite = () => {
    const inviteUserPayload = {
      email: sendCaInviteFormData.email,
      role: "charteredaccountant",
    };
    const inviteCaPayload = {
      caRoleAddress: sendCaInviteFormData.officeAddress,
      caRoleCompanyName: sendCaInviteFormData.companyName,
      caRoleFirstName: sendCaInviteFormData.firstName,
      caRoleLastName: sendCaInviteFormData.lastName,
      caRolePhone: sendCaInviteFormData.phone,
      email: sendCaInviteFormData.email,
      role: "charteredaccountant",
    };
    Promise.all([
      groflexService.request(config.resourceUrls.inviteNewUser, {
        auth: true,
        data: inviteUserPayload,
        method: "POST",
      }),
      groflexService.request(config.resourceUrls.inviteCa, {
        auth: true,
        data: inviteCaPayload,
        method: "POST",
      }),
    ]).then((newUserResponse, caResponse) => {
      if (newUserResponse.body) {
        groflexService.toast.error("Something went wrong");
      } else {
        groflexService.toast.success("Invitation Successfully sent");
      }
      console.log(res);
      setIsCaModalVisible(false);
    });
  };
  return (
    <div className="teams-invite-ca-wrapper">
      <Modal
        isActive={isCaModalVisible}
        setIsAcive={setIsCaModalVisible}
        submitBtnName={"Send Invitation"}
        title={
          <div className="teams-invite-title-container">
            <div className="invite-heading">Invite a Chartered Accountant</div>
            <div className="invite-subheading">
              Creation and processing of invoices, expenses, tax consultants
              export and GST. Insight into finances and sales.
            </div>
          </div>
        }
        ModalHeaderButton={" "}
        onSubmit={handleSendInvite}
      >
        <div className="columns is-multiline m-b-5">
          <div className="column is-12">
            <div className="field">
              <label>Email *</label>
              <Input
                onChange={handleEmailChange}
                placeholder={"Email"}
                type={"text"}
                value={sendCaInviteFormData.email}
              />
            </div>
          </div>
        </div>
        <div className="columns is-multiline m-b-5">
          <div className="column is-12">
            <div className="field">
              <label>First Name *</label>
              <Input
                onChange={handleFirstNameChange}
                placeholder={"First Name"}
                type={"text"}
                value={sendCaInviteFormData.firstName}
              />
            </div>
          </div>
        </div>

        <div className="columns is-multiline m-b-5">
          <div className="column is-12">
            <div className="field">
              <label>Last Name *</label>
              <Input
                onChange={handleLastNameChange}
                placeholder={"Last Name"}
                type={"text"}
                value={sendCaInviteFormData.lastName}
              />
            </div>
          </div>
        </div>

        <div className="columns is-multiline m-b-5">
          <div className="column is-12">
            <div className="field">
              <label>Phone</label>
              <Input
                onChange={handlePhoneNumberChange}
                placeholder={"Phone number"}
                type={"text"}
                value={sendCaInviteFormData.phone}
              />
            </div>
          </div>
        </div>

        <div className="columns is-multiline m-b-5">
          <div className="column is-12">
            <div className="field">
              <label>Company Name *</label>
              <Input
                onChange={handleCompanyNameChange}
                placeholder={"Company name"}
                type={"text"}
                value={sendCaInviteFormData.companyName}
              />
            </div>
          </div>
        </div>

        <div className="columns is-multiline m-b-5">
          <div className="column is-12">
            <div className="field">
              <label>Office address *</label>
              <Input
                onChange={handleOfficeAddressChange}
                placeholder={"Office address"}
                type={"text"}
                value={sendCaInviteFormData.officeAddress}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InviteCaModal;
