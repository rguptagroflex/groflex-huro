import React from "react";

import { InputAddons } from "../../shared/components/inputAddons/InputAddons";
import Modal from "../../shared/components/modal/Modal";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";
import ErrorText from "../../shared/components/errorText/ErrorText";

const ChangePhoneNoModal = ({
  isActive = false,
  setIsActive,
  setProfileInfo,
  profileInfo,
  profileError,
  setProfileError,
}) => {
  // const [newEmail, setNewEmail] = useState("");
  // const [currentPassword, setCurrentPassword] = useState("");

  const handlePhoneChange = (e) => {
    const phoneNumber = parseInt(e.target.value);

    // Handle more than 10 digit warning
    if (phoneNumber.toString().length > 10) {
      return;
    }

    // Handle equal to 10 digit warning
    if (phoneNumber.toString().length === 10) {
      setProfileInfo({ ...profileInfo, phoneNo: phoneNumber });
      setProfileError({ ...profileError, phoneNoError: "" });
      return;
    }

    // Check for empty field
    if (!phoneNumber) {
      setProfileInfo({ ...profileInfo, phoneNo: null });
      setProfileError({
        ...profileError,
        phoneNoError: "This should not be empty",
      });
      return;
    }

    // Handle less than 10 digit warning
    if (phoneNumber.toString().length < 10) {
      setProfileInfo({ ...profileInfo, phoneNo: phoneNumber });
      setProfileError({
        ...profileError,
        phoneNoError: "Phone number should be 10 digits",
      });
      return;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: handle form submission
    console.log("HI handleSUbmit here");
  };

  return (
    <Modal
      title="Change Phone Number"
      submitBtnName="Send OTP"
      isActive={isActive}
      setIsAcive={setIsActive}
      onSubmit={handleSubmit}
      isSmall
    >
      <form onSubmit={handleSubmit}>
        <div className="columns">
          <div className="field column is-9">
            <label>New Phone Number</label>
            <InputAddons
              left={"+91"}
              type="number"
              value={profileInfo.phoneNo ? profileInfo.phoneNo : ""}
              onChange={handlePhoneChange}
            />
            <ErrorText
              visible={profileError.phoneNoError}
              text={profileError.phoneNoError}
            />
          </div>
        </div>
      </form>
      <div style={{ margin: "10px 0 0 0", display: "flex" }}>
        <span>
          <FeatherIcon
            style={{ margin: "5px 10px 0 0" }}
            name="Info"
            size={14}
          />
        </span>
        <span>
          <p>
            We will send a 6 digit OTP to your new phone number for
            verification.
          </p>
        </span>
      </div>
    </Modal>
  );
};

export default ChangePhoneNoModal;
