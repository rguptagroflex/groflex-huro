import React, { useState } from "react";
import { IconButton } from "../../shared/components/button/IconButton";
import { Button } from "../../shared/components/button/Button";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
// import { FileInput } from "../../shared/components/fileInput/FileInput";
import { Input } from "../../shared/components/input/Input";
import { InputAddons } from "../../shared/components/inputAddons/InputAddons";
import { Select } from "../../shared/components/select/Select";
import { TextArea } from "../../shared/components/textArea/TextArea";
import ApexChart from "../../shared/components/apexChart/ApexChart";
import PageContent from "../../shared/components/pageContent/PageContent";
import { Link } from "react-router-dom";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";
import ChangeEmailModal from ".././accountSettings/ChangeEmailModal";
import { Switch } from "../../shared/components/switch/Switch";

const CreateContact = () => {
  const [changeEmailModalActive, setChangeEmailModalActive] = useState(false);

  return (
    <PageContent
      titleIsBreadCrumb
      breadCrumbData={["Home", "Contacts", "Create Contact"]}
    >
      {/* <ChangeEmailModal
        isActive={changeEmailModalActive}
        setIsActive={setChangeEmailModalActive}
      /> */}
      <div className="page-content-inner">
        <div className="tabs-wrapper">
          <div className="tabs-inner">
            <div
            //  className="tabs"
            >
              <ul>
                <li data-tab="account-details-tab" className="is-active">
                  <Link to="/contacts"><h2 className="title is-5 "> Create Contact</h2></Link>
                </li>
                {/* <li data-tab="projects-tab">
                  <Link to="/preferences">Preferences</Link>
                </li> */}
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
                  <h2 className="title is-5 is-bold">Contact Info</h2>

                  <>
                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>Contact Type</label>
                          <Select options={["Customer", "Payee"]} value={"Customer"} />
                        </div>
                      </div>


                      <div className="column is-6">
                        <div className="field">
                        {/* <RadioInputComponent
                  options={[
										{ label: "Customer", value: "customer" },
										{ label: "Payee", value: "payee" },
									]}
                  style={{ marginBottom: "10px" }} 
                          /> */}
                        </div>
                      </div> 
                    </div>

                    <div className="columns is-multiline">
                      <div className="column is-6">
                        <div className="field">
                          <label>Customer No *</label>
                          <InputAddons
                            // left={"+91"}
                            placeholder={"1059"}
                          />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>Company Name</label>
                          <Input placeholder={"Enter Comapny Name"} />
                        </div>
                      </div>
                    </div>
                    <div className="columns is-multiline">
                      <div className="column is-6">
                        <div className="field">
                          <label>Country *</label>
                          <Select options={["India", "Indionesia", "Invoices (18)", "Iceland", "France", "Spain"]} />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>State *</label>
                          <Select options={["Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep"]} />
                        </div>
                      </div>
                    </div>
                    <div className="columns is-multiline">
                      <div className="column is-6">
                        <div className="field">
                          <label>Contact Category</label>
                          <Select options={["None", "Advertising", "Agency", "Insurance", "Wholesale", "Reatil", "Workshop", "End customer"]} />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>CIN ?</label>
                          <Input placeholder={"E.g.,U 31909 WB 2020 PTC 247113"} />
                          {/* <p>A Corporate Identification Number (CIN) is a unique identification number that is assigned by the Registrar of Companies (ROC).</p> */}
                        </div>
                      </div>
                    </div>
                    <div className="columns is-multiline">
                      <div className="column is-6">
                        <div className="field">
                          <label>Business Type</label>
                          <Select options={["Registered", "Unregistered"]} />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>GST No ?</label>
                          <Input placeholder={"E.g.,07AAAAAOOOOA1Z6"} />
                          {/* <p>A unique 15-digit identification number assigned to every taxpayer registered under GST regime.</p> */}
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
                  <h2 className="title is-5  is-bold">Communication</h2>

                  <>
                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>Address</label>
                          <TextArea rows={2} placeholder="Enter Details" />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>Company Logo</label>
                          {/* <FileInput
                            label={"Upload"}
                            description={
                              "(Or Drop a file)"
                            }
                          /> */}
                        </div>
                      </div>
                    </div>

                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>Email</label>
                          <Input placeholder={"Enter email address"} />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>Website</label>
                          <Input placeholder={"Enter website url"} />
                        </div>
                      </div>
                    </div>

                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>Mobile Number</label>
                          <InputAddons
                            left={"+91"}
                            placeholder={"Enter Details"}
                          />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>Telephone No</label>
                          <Input placeholder={"Enter telephone no"} />
                        </div>
                      </div>
                    </div>

                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>Fax No</label>
                          <Input placeholder={"Enter fax no"} />
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
                  footerContentRight={<Button isSuccess>Save</Button>}
                >
                  <div className="columns is-multiline">
                    <div className="column is-8">
                      <h2 className="title is-5 is-bold">Opening Balance</h2>
                    </div>

                    {/* <div className="columns is-multiline m-b-5"> */}
                    {/* <div className="column is-9">
                      <div className="field">
                        <RadioInputComponent
                  options={[
										{ label: "Previous Dues", value: "customer" },
										{ label: "Excess Payments", value: "payee" },
									]}
                  // style={{ marginBottom: "10px" }} 
                          />
                      </div>
                    </div> */}
                    <div className="column is-8">
                      <div className="field">
                        <label>Customer owes you</label>
                        <Input placeholder="&#8377;" />
                      </div>
                    </div>

                    {/* </div> */}
                  </div>
                </AdvancedCard>

                <div className="m-t-15" />

                {/* YOUR PLAN */}
                <AdvancedCard
                  type={"s-card"}
                // footer
                // footerContentRight={
                // <Button isDisabled isLight>
                //   Upgrade Plans
                // </Button>
                // }
                >
                  <div>
                    <h2 className="title is-5 is-bold">Conditions</h2>

                    <p>
                      You can set your payment terms & discount % here
                    </p>

                    {/* <div className="m-t-5"> */}
                    <div className="column is-9">
                      <div className="field">
                        <label>Payment Terms</label>
                        <Select options={["Not Specified"]} />
                      </div>
                    </div>
                    {/* </div> */}
                    <div className="column is-9">
                      <div className="field">
                        <label>Discount on List Prices</label>
                        <Input placeholder="0%" />
                      </div>
                    </div>

                  </div>
                </AdvancedCard>
                <div className="m-t-15" />
                <AdvancedCard
                  type={"s-card"}
                  footer
                  footerContentRight={<Button isSuccess>Add New</Button>}
                >
                  <div className="columns is-multiline">
                    <div className="column is-8">
                      <h2 className="title is-5 is-bold">Contact Persons</h2>
                      <p>You can list all your contacts here</p>
                    </div>



                    {/* </div> */}
                  </div>
                </AdvancedCard>
                <div className="m-t-15" />
                <AdvancedCard
                  type={"s-card"}
                  footer
                  
                  footerContentRight={
                    <>
                     <>Show notes when creating new documents</>
                  <Switch isSuccess ></Switch>
                  </>
                }
                >
                  <div className="columns is-multiline">
                    <div className="column is-8">
                      <h2 className="title is-5 is-bold">Notes</h2>
                    </div>
                    <div className="column is-12">
                      <div className="field">
                        <TextArea rows={3} placeholder="Enter Additional Notes here" />
                      </div>
                    </div>



                    {/* </div> */}
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

export default CreateContact;

