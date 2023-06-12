import React, { useState } from "react";
import { Button } from "../../shared/components/button/Button";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import { FileInput } from "../../shared/components/fileInput/FileInput";
import { Input } from "../../shared/components/input/Input";
import { InputAddons } from "../../shared/components/inputAddons/InputAddons";
import { Select } from "../../shared/components/select/Select";
import { TextArea } from "../../shared/components/textArea/TextArea";
import ApexChart from "../../shared/components/apexChart/ApexChart";
import PageContent from "../../shared/components/pageContent/PageContent";
import { Link } from "react-router-dom";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";
import ChangeEmailModal from "./ChangeEmailModal";
import ErrorText from "../../shared/components/errorText/ErrorText";
import { useSelector } from "react-redux";

const AccountSettings = () => {
  const [changeEmailModalActive, setChangeEmailModalActive] = useState(false);
  const tenantData = useSelector((state) => state.accountData.tenantData);

  const [profileError, setProfileError] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    profileEmail: "",
  });

  const [companyError, setCompanyError] = useState({
    companyName: "",
    phoneNo: "",
    companyEmail: "",
    cin: "",
    gst: "",
  });

  const [profileInfo, setProfileInfo] = useState({
    registerEmail: "example@gmail.com",
    newEmail: "",
    currentPassword: "",
    phoneNo: null,
    firstName: "",
    lastName: "",
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    companyPhoneNo: "",
    companyLogo: null,
    companyAddress: "",
    country: "",
    state: "",
    companyEmail: "",
    gstType: "",
    gstNo: null,
    cin: null,
  });

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  //error handling for profile section

  const handleProfileNameCheck = (e) => {
    if (!e.target.value) {
      setProfileError({ ...profileError, firstName: true });
      return;
    }
    setProfileError({ ...profileError, firstName: false });
    setProfileInfo({ ...profileInfo, firstName: e.target.value });
  };

  const handleProfileLastname = (e) => {
    if (!e.target.value) {
      setProfileError({ ...profileError, lastName: true });
      return;
    }
    setProfileError({ ...profileError, lastName: false });
    setProfileInfo({ ...profileInfo, lastName: e.target.value });
  };

  const handleProfilePhoneChange = (e) => {
    const phoneNumber = parseInt(e.target.value);
    console.log(phoneNumber.toString().length);

    // Handle more than 10 digit warning
    if (phoneNumber.toString().length > 10) {
      return;
    }

    // Handle equal to 10 digit warning
    if (phoneNumber.toString().length === 10) {
      setProfileInfo({ ...profileInfo, phoneNo: phoneNumber });
      setProfileError({ ...profileError, phoneNo: "" });
      return;
    }

    // Check for empty field
    if (!phoneNumber) {
      setProfileInfo({ ...profileInfo, phoneNo: null });
      setProfileError({
        ...profileError,
        phoneNo: "This is a mandatory field",
      });
      return;
    }

    // Handle less than 10 digit warning
    if (phoneNumber.toString().length < 10) {
      setProfileInfo({ ...profileInfo, phoneNo: phoneNumber });
      setProfileError({
        ...profileError,
        phoneNo: "Phone number should be 10 digits",
      });
      return;
    }
  };

  const profileSaveBtn = () => {
    if (profileError.phoneNo || !profileInfo.phoneNo) {
      console.log("clear the errors");
      return;
    }
    if (profileError.lastName || !profileInfo.lastName) {
      console.log("clear the errors");
      return;
    }
    if (profileError.firstName || !profileInfo.firstName) {
      console.log("clear the errors");
      return;
    }
    console.log(profileInfo);
  };

  //error handling for company section

  const handleCompanyNameCheck = (e) => {
    if (!e.target.value) {
      setCompanyError({ ...companyError, companyName: true });
      return;
    }
    setCompanyError({ ...companyError, companyName: false });
    setCompanyInfo({ ...companyInfo, companyName: e.target.value });
  };

  const handleCompanyPhoneNoCheck = (e) => {
    if (e.target.value.length == 0) {
      setCompanyError({ ...companyError, phoneNo: true });
      return;
    }
    if (e.target.value.length > 10 || e.target.value.length < 10) {
      setCompanyError({ ...companyError, phoneNo: true });
      return;
    }
    if (!companyError.phoneNo) {
      setCompanyInfo({ ...companyInfo, companyPhoneNo: e.target.value });
    }
    setCompanyError({ ...companyError, phoneNo: false });
  };

  const handleCinNumber = (e) => {
    if (e.target.value.length == 0) {
      setCompanyError({ ...companyError, cin: true });
      return;
    }
    if (e.target.value.length > 21 || e.target.value.length < 21) {
      setCompanyError({ ...companyError, cin: true });
      return;
    }
    if (!companyError.cin) {
      setCompanyInfo({ ...companyInfo, cin: e.target.value });
    }
    setCompanyError({ ...companyError, cin: false });
  };

  const handleGstNumber = (e) => {
    if (e.target.value.length == 0) {
      setCompanyError({ ...companyError, gst: true });
      return;
    }
    if (e.target.value.length > 15 || e.target.value.length < 15) {
      setCompanyError({ ...companyError, gst: true });
      return;
    }
    if (!companyError.cin) {
      setCompanyInfo({ ...companyInfo, gstNo: e.target.value });
    }
    setCompanyError({ ...companyError, gst: false });
  };

  const handleCompanyEmailCheck = (e) => {
    if (!isEmail(e.target.value)) {
      setCompanyError({ ...companyError, companyEmail: true });
      return;
    }
    setCompanyInfo({ ...companyInfo, companyEmail: e.target.value });
    setCompanyError({ ...companyError, companyEmail: false });
  };

  const handleCompanySaveBtn = () => {
    if (companyError.phoneNo || !companyInfo.companyPhoneNo) {
      console.log("clear the errors");
      return;
    }
    if (companyError.companyName || !companyInfo.companyName) {
      console.log("clear the errors");
      return;
    }
    if (companyError.gst || !companyInfo.gstNo) {
      console.log("clear the errors");
      return;
    }
    if (companyError.cin || !companyInfo.cin) {
      console.log("clear the errors");
      return;
    }
    if (companyError.companyEmail || !companyInfo.companyEmail) {
      console.log("clear the errors");
      return;
    }
    console.log(companyInfo);
  };

  console.log(tenantData, "ACCOUNT DATA");
  return (
    <PageContent
      titleIsBreadCrumb
      breadCrumbData={["Home", "Account Settings", "Account details"]}
    >
      <ChangeEmailModal
        setProfileInfo={setProfileInfo}
        profileInfo={profileInfo}
        isActive={changeEmailModalActive}
        setIsActive={setChangeEmailModalActive}
      />
      <div className="page-content-inner">
        <div className="tabs-wrapper">
          <div className="tabs-inner">
            <div className="tabs">
              <ul>
                <li data-tab="account-details-tab" className="is-active">
                  <Link to="/account-settings">Account Details</Link>
                </li>
                <li data-tab="projects-tab">
                  <Link to="/preferences">Preferences</Link>
                </li>
              </ul>
            </div>
          </div>

          <div id="account-details-tab" className="tab-content is-active">
            <div className="columns is-multiline">
              <div className="column is-7">
                {/* PROFILE INFO */}
                <AdvancedCard
                  type={"s-card"}
                  footer
                  footerContentRight={
                    <Button onClick={profileSaveBtn} isSuccess>
                      Save
                    </Button>
                  }
                >
                  <h2 className="title is-5 is-bold">Profile Info</h2>

                  <>
                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>Registered E-mail Address</label>
                          <InputAddons
                            value={"example@gmail.com"}
                            type="email"
                            disabled
                            placeholder={"Enter Details"}
                            right={<FeatherIcon color="#00a353" name="Edit" />}
                            onRightAdornmentClick={() => {
                              setChangeEmailModalActive(true);
                            }}
                          />
                        </div>
                      </div>

                      <div className="column is-6 ">
                        <div className="field ">
                          <label>Phone Number</label>
                          <InputAddons
                            left={"+91"}
                            type="number"
                            placeholder={"Enter Details"}
                            value={
                              profileInfo.phoneNo ? profileInfo.phoneNo : ""
                            }
                            onChange={handleProfilePhoneChange}
                          />

                          <ErrorText
                            visible={profileError.phoneNo}
                            text={profileError.phoneNo}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="columns is-multiline">
                      <div className="column is-6">
                        <div className="field">
                          <label>First Name</label>
                          <Input
                            placeholder={"Enter Detials"}
                            value={profileInfo.firstName}
                            onChange={(e) => handleProfileNameCheck(e)}
                          />
                          <ErrorText
                            visible={profileError.firstName}
                            text={"This should not be empty"}
                          />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>Last Name</label>
                          <Input
                            placeholder={"Enter Detials"}
                            value={profileInfo.lastName}
                            onChange={(e) => handleProfileLastname(e)}
                          />
                          <ErrorText
                            visible={profileError.lastName}
                            text={"This should not be empty"}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                </AdvancedCard>

                <div className="m-t-15" />

                {/* COMPANY INFO */}
                <AdvancedCard
                  type={"s-card"}
                  footer
                  footerContentRight={
                    <Button onClick={handleCompanySaveBtn} isSuccess>
                      Save
                    </Button>
                  }
                >
                  <h2 className="title is-5  is-bold">Company Info</h2>
                  <p className="subtitle is-6">
                    This details will appear in your invoices and expenses
                  </p>

                  <>
                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>Company Name *</label>
                          <Input
                            placeholder="Enter Details"
                            onChange={(e) => handleCompanyNameCheck(e)}
                          />
                          <ErrorText
                            visible={companyError.companyName}
                            text={"This should not be empty"}
                          />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>Phone Number</label>
                          <InputAddons
                            left={"+91"}
                            type="number"
                            onChange={(e) => handleCompanyPhoneNoCheck(e)}
                            placeholder={"Enter Details"}
                          />
                          <ErrorText
                            visible={companyError.phoneNo}
                            text={"Phone number should be of 10 digits"}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>Company Logo</label>
                          <FileInput
                            setCompanyInfo={setCompanyInfo}
                            companyInfo={companyInfo}
                            label={"Upload logo"}
                            description={
                              "(Upload jpeg/png image upto 2mb size)"
                            }
                          />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>Address</label>
                          <TextArea
                            rows={2}
                            placeholder="Enter Details"
                            onChange={(e) =>
                              setCompanyInfo({
                                ...companyInfo,
                                companyAddress: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>Country *</label>
                          <Select
                            options={["India"]}
                            onChange={(e) =>
                              setCompanyInfo({
                                ...companyInfo,
                                country: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>State *</label>
                          <Select
                            options={["Karnataka", "Maharashtra"]}
                            onChange={(e) =>
                              setCompanyInfo({
                                ...companyInfo,
                                state: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>E-mail Address</label>
                          <Input
                            placeholder={"Enter Detials"}
                            type="email"
                            onChange={(e) => handleCompanyEmailCheck(e)}
                          />
                          <ErrorText
                            visible={companyError.companyEmail}
                            text={"Invalid email address"}
                          />
                        </div>
                      </div>
                      <div className="column is-6">
                        <div className="field">
                          <label>CIN</label>
                          <Input
                            type="number"
                            placeholder={"E.g.,U 31909 WB 2020 PTC 247113"}
                            onChange={(e) => handleCinNumber(e)}
                          />
                          <ErrorText
                            visible={companyError.cin}
                            text={"CIN  number should be of 21 digits"}
                          />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>GST Type *</label>
                          <Select
                            options={["Registered"]}
                            onChange={(e) =>
                              setCompanyInfo({
                                ...companyInfo,
                                gstType: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="column is-6">
                        <div className="field">
                          <label>GST</label>
                          <Input
                            placeholder={"E.g.,07AAAA0000AZ6"}
                            type="number"
                            onChange={(e) => handleGstNumber(e)}
                          />
                          <ErrorText
                            visible={companyError.gst}
                            text={"GST number should be of 15 digits"}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                </AdvancedCard>
              </div>

              <div className="column is-5">
                {/* KYC FORM */}
                <AdvancedCard
                  type={"s-card"}
                  footer
                  footerContentRight={<Button isSuccess>View Form</Button>}
                >
                  <div className="columns is-multiline">
                    <div className="column is-8">
                      <h2 className="title is-5 is-bold">KYC Form</h2>

                      <p>
                        Complete your KYC documentation and start accepting
                        payments
                      </p>
                    </div>

                    <div className="column is-4">
                      <ApexChart />
                    </div>
                  </div>
                </AdvancedCard>

                <div className="m-t-15" />

                {/* YOUR PLAN */}
                <AdvancedCard
                  type={"s-card"}
                  footer
                  footerContentRight={
                    <Button isDisabled isLight>
                      Upgrade Plans
                    </Button>
                  }
                >
                  <div>
                    <h2 className="title is-5 is-bold">Your Plan</h2>

                    <p>
                      Current Plan -{" "}
                      <span className="is-weight-900">Basic Free Plan</span>{" "}
                      (renews automatically)
                    </p>

                    <div className="m-t-5 m-b-5">
                      <progress
                        className="progress is-info"
                        value="50"
                        max="100"
                      >
                        50%
                      </progress>
                    </div>

                    <div className="widget-toolbar">
                      <p className="left">Starts on 10.01.2023</p>
                      <p className="right">Ends on 10.01.2023</p>
                    </div>
                  </div>
                </AdvancedCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  );
};

export default AccountSettings;
