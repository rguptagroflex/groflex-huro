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

const AccountSettings = () => {
  const [changeEmailModalActive, setChangeEmailModalActive] = useState(false);

  return (
    <PageContent
      titleIsBreadCrumb
      breadCrumbData={["Home", "Account Settings", "Account details"]}
    >
      <ChangeEmailModal
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
                  footerContentRight={<Button isSuccess>Save</Button>}
                >
                  <h2 className="title is-5 is-bold">Profile Info</h2>

                  <>
                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>Registered E-mail Address</label>
                          <InputAddons
                            placeholder={"Enter Details"}
                            right={
                              <FeatherIcon
                                color="#06d6a0"
                                name="Edit"
                                onClick={() => {
                                  setChangeEmailModalActive(true);
                                }}
                              />
                            }
                          />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>Phone Number</label>
                          <InputAddons
                            left={"+91"}
                            placeholder={"Enter Details"}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="columns is-multiline">
                      <div className="column is-6">
                        <div className="field">
                          <label>First Name</label>
                          <Input placeholder={"Enter Detials"} />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>Last Name</label>
                          <Input placeholder={"Enter Detials"} />
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
                  footerContentRight={<Button isSuccess>Save</Button>}
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
                          <Input placeholder="Enter Details" />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>Phone Number</label>
                          <InputAddons
                            left={"+91"}
                            placeholder={"Enter Details"}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>Company Logo</label>
                          <FileInput
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
                          <TextArea rows={2} placeholder="Enter Details" />
                        </div>
                      </div>
                    </div>

                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>Country *</label>
                          <Select options={["India"]} />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>State *</label>
                          <Select options={["Karnataka"]} />
                        </div>
                      </div>
                    </div>

                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>E-mail Address</label>
                          <Input placeholder={"Enter Detials"} />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>GST Type *</label>
                          <Select options={["Registered"]} />
                        </div>
                      </div>
                    </div>

                    <div className="columns is-multiline">
                      <div className="column is-6">
                        <div className="field">
                          <label>GST</label>
                          <Input placeholder={"E.g.,07AAAA0000AZ6"} />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>CIN</label>
                          <Input
                            placeholder={"E.g.,U 31909 WB 2020 PTC 247113"}
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
