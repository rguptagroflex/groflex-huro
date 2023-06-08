import React, { useEffect, useState } from "react";
import { Button } from "../../shared/components/button/Button";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import { FileInput } from "../../shared/components/fileInput/FileInput";
import { Input } from "../../shared/components/input/Input";
import { InputAddons } from "../../shared/components/inputAddons/InputAddons";
import { Select } from "../../shared/components/select/Select";
import { TextArea } from "../../shared/components/textArea/TextArea";
import ApexChart from "../../shared/components/apexChart/ApexChart";
import PageContent from "../../shared/components/pageContent/PageContent";
import { Link, parsePath } from "react-router-dom";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";
import ChangeEmailModal from "./ChangeEmailModal";
import ErrorText from "../../shared/components/errorText/ErrorText";
import ChangePhoneNoModal from "./ChangePhoneNoModal";
import groflexService from "../../services/groflex.service";
import config from "../../../../config";
import { getCountries } from "../../helpers/getCountries";

const AccountSettings = () => {
  const [changeEmailModalActive, setChangeEmailModalActive] = useState(false);
  const [changePhoneNoModalActive, setChangePhoneNoModalActive] =
    useState(false);

  //${config.resourceHost}india/states
  useEffect(() => {
    groflexService
      .request(`${config.resourceHost}india/states`, { auth: true })
      .then((res) => {
        console.log(res.json());
      });
  }, []);

  //states for error handling in profile section
  const [profileError, setProfileError] = useState({
    firstNameError: "",
    lastNameError: "",
    phoneNoError: "",
    profileEmailError: "",
  });

  //states for error handling in company section
  const [companyError, setCompanyError] = useState({
    companyNameError: "",
    companyPhoneNoError: "",
    companyEmailError: "",
    cinError: "",
    gstError: "",
  });

  //states to store/update data in profile section
  const [profileInfo, setProfileInfo] = useState({
    registerEmail: "example@gmail.com",
    newEmail: "",
    currentPassword: "",
    phoneNo: 9856743215,
    firstName: "",
    lastName: "",
  });

  //states to store/update data in company section
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

  const handleProfileFirstnameChange = (e) => {
    const firstName = e.target.value.replace(/[^a-z]/gi, "");

    setProfileInfo({ ...profileInfo, firstName: firstName });
    setProfileError({
      ...profileError,
      firstNameError: "",
    });

    //check for empty field
    if (!firstName) {
      setProfileInfo({ ...profileInfo, firstName: "" });
      setProfileError({
        ...profileError,
        firstNameError: "This should not be empty",
      });
      return;
    }
  };

  //error handling for profile section last name
  const handleProfileLastnameChange = (e) => {
    const lastName = e.target.value.replace(/[^a-zA-Z]/gi, "");
    setProfileInfo({ ...profileInfo, lastName: lastName });
    setProfileError({ ...profileError, lastNameError: "" });

    //check for empty field
    if (!lastName) {
      setProfileInfo({ ...profileInfo, lastName: "" });
      setProfileError({
        ...profileError,
        lastNameError: "This should not be empty",
      });
      return;
    }
  };

  const profileSaveBtn = () => {
    // if (!profileInfo.phoneNo) {
    //   setProfileError({
    //     ...profileError,
    //     phoneNoError: "This should not be empty",
    //   });
    // }
    console.log(profileInfo);
  };

  //error handling for company section

  const handleCompanyNameChange = (e) => {
    const companyName = e.target.value.replace(/[^a-z]/gi, "");
    setCompanyError({ ...companyError, companyNameError: "" });
    setCompanyInfo({ ...companyInfo, companyName: companyName });

    //check for empty field
    if (!companyName) {
      setCompanyInfo({ ...companyInfo, companyName: "" });
      setCompanyError({
        ...companyError,
        companyNameError: "This should not be empty",
      });

      return;
    }
  };

  const handleCompanyPhoneNoChange = (e) => {
    const companyPhoneNumber = parseInt(e.target.value);

    // Handle more than 10 digit warning
    if (companyPhoneNumber.toString().length > 10) {
      return;
    }

    // Handle equal to 10 digit warning
    if (companyPhoneNumber.toString().length === 10) {
      setCompanyInfo({ ...companyInfo, companyPhoneNo: companyPhoneNumber });
      setCompanyError({ ...companyError, companyPhoneNoError: "" });
      return;
    }

    // Check for empty field
    if (!companyPhoneNumber) {
      setCompanyInfo({ ...companyInfo, companyPhoneNo: null });
      setCompanyError({
        ...companyError,
        companyPhoneNoError: "Phone number should be 10 digits",
      });
      return;
    }

    // Handle less than 10 digit warning
    if (companyPhoneNumber.toString().length < 10) {
      setCompanyInfo({ ...companyInfo, companyPhoneNo: companyPhoneNumber });
      setCompanyError({
        ...companyError,
        companyPhoneNoError: "Phone number should be 10 digits",
      });
      return;
    }
  };

  //check email id error handling in company section
  const handleCompanyEmailChange = (e) => {
    const companyEmail = e.target.value;
    if (isEmail(companyEmail)) {
      setCompanyInfo({ ...companyInfo, companyEmail: companyEmail });
      setCompanyError({ ...companyError, companyEmailError: "" });
      return;
    }
    setCompanyInfo({ ...companyInfo, companyEmail: "" });
    setCompanyError({ ...companyError, companyEmailError: "Invalid Email ID" });
  };

  //cin number error handling
  const handleCinNumberChange = (e) => {
    const cinNumber = e.target.value;

    // Handle more than 21 digit warning
    if (cinNumber.length > 21) {
      return;
    }

    // Handle equal to 21 digit warning
    if (cinNumber.length === 21) {
      setCompanyInfo({ ...companyInfo, cin: cinNumber });
      setCompanyError({ ...companyError, cinError: "" });
      return;
    }

    // Check for empty field
    if (!cinNumber) {
      setCompanyInfo({ ...companyInfo, cin: null });
      setCompanyError({
        ...companyError,
        cinError: "CIN  number should be of 21 digits",
      });
      return;
    }

    // Handle less than 21 digit warning
    if (cinNumber.length < 21) {
      setCompanyInfo({ ...companyInfo, cin: cinNumber });
      setCompanyError({
        ...companyError,
        cinError: "CIN  number should be of 21 digits",
      });
      return;
    }
  };

  const handleGstNumberChange = (e) => {
    const gstNumber = e.target.value;

    // Handle more than 15 digit warning
    if (gstNumber.length > 15) {
      return;
    }

    // Handle equal to 15 digit warning
    if (gstNumber.length === 15) {
      setCompanyInfo({ ...companyInfo, gstNo: gstNumber });
      setCompanyError({ ...companyError, gstError: "" });
      return;
    }

    // Check for empty field
    if (!gstNumber) {
      setCompanyInfo({ ...companyInfo, gstNo: null });
      setCompanyError({
        ...companyError,
        gstError: "GST  number should be of 15 digits",
      });
      return;
    }

    // Handle less than 15 digit warning
    if (gstNumber.length < 15) {
      setCompanyInfo({ ...companyInfo, gstNo: gstNumber });
      setCompanyError({
        ...companyError,
        gstError: "GST  number should be of 15 digits",
      });
      return;
    }
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
      <ChangePhoneNoModal
        setProfileInfo={setProfileInfo}
        profileInfo={profileInfo}
        isActive={changePhoneNoModalActive}
        setIsActive={setChangePhoneNoModalActive}
        setProfileError={setProfileError}
        profileError={profileError}
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
                            right={<FeatherIcon color="#00a353" name="Edit" />}
                            type="number"
                            disabled
                            value={9856743215}
                            placeholder={"Enter Details"}
                            // value={
                            //   profileInfo.phoneNo ? profileInfo.phoneNo : ""
                            // }
                            // onChange={handleProfilePhoneChange}
                            onRightAdornmentClick={() => {
                              setChangePhoneNoModalActive(true);
                            }}
                          />

                          <ErrorText
                            visible={profileError.phoneNoError}
                            text={profileError.phoneNoError}
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
                            onChange={handleProfileFirstnameChange}
                          />
                          <ErrorText
                            visible={profileError.firstNameError}
                            text={profileError.firstNameError}
                          />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>Last Name</label>
                          <Input
                            placeholder={"Enter Detials"}
                            value={profileInfo.lastName}
                            onChange={handleProfileLastnameChange}
                          />
                          <ErrorText
                            visible={profileError.lastNameError}
                            text={profileError.lastNameError}
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
                            onChange={handleCompanyNameChange}
                            value={companyInfo.companyName}
                          />
                          <ErrorText
                            visible={companyError.companyNameError}
                            text={companyError.companyNameError}
                          />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>Phone Number</label>
                          <InputAddons
                            left={"+91"}
                            type="number"
                            onChange={handleCompanyPhoneNoChange}
                            value={
                              companyInfo.companyPhoneNo
                                ? companyInfo.companyPhoneNo
                                : ""
                            }
                            placeholder={"Enter Details"}
                          />
                          <ErrorText
                            visible={companyError.companyPhoneNoError}
                            text={companyError.companyPhoneNoError}
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
                            onChange={handleCompanyEmailChange}
                          />
                          <ErrorText
                            visible={companyError.companyEmailError}
                            text={companyError.companyEmailError}
                          />
                        </div>
                      </div>
                      <div className="column is-6">
                        <div className="field">
                          <label>CIN</label>
                          <Input
                            type="text"
                            placeholder={"E.g.,U 31909 WB 2020 PTC 247113"}
                            onChange={handleCinNumberChange}
                            value={companyInfo.cin ? companyInfo.cin : ""}
                          />
                          <ErrorText
                            visible={companyError.cinError}
                            text={companyError.cinError}
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
                            type="text"
                            onChange={handleGstNumberChange}
                            value={companyInfo.gstNo ? companyInfo.gstNo : ""}
                          />
                          <ErrorText
                            visible={companyError.gstError}
                            text={companyError.gstError}
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
