import React, { useState } from "react";
import store from "../../redux/store";
import { IconButton } from "../../shared/components/button/IconButton";
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
import ChangeEmailModal from ".././accountSettings/ChangeEmailModal";
import { Switch } from "../../shared/components/switch/Switch";
import RadioButton from "../../shared/components/button/RadioButton";
import GroflexService from "../../services/groflex.service";
import config from "../../config";
import ErrorText from "../../shared/components/errorText/ErrorText";
import { request } from "../../helpers/request";
import AddContactPerson from "./AddContactPerson";

const CreateContact = () => {
  const [isContactModalActive, setIsAddContactModalActive] = useState(false);


  const [changeEmailModalActive, setChangeEmailModalActive] = useState(false);
  // const [contactType, setContactType] = useState('Customer');
  // const [customerNo, setCustomerNo] = useState('');
  // const [companyName, setCompanyName] = useState('');
  // const [country, setCountry] = useState('');
  // const [state, setState] = useState('');
  // const [contactCategory, setContactCategory] = useState('');
  // const [cin, setCIN] = useState('');
  // const [businessType, setBusinessType] = useState('');
  // const [gstNo, setGSTNo] = useState('');

  const [conditions, setConditions] = useState({
    paymentTerms: '',
    discount: '',
  });

  const handleChangeCondition = (event) => {
    const { name, value } = event.target;
    setConditions((prevConditions) => ({
      ...prevConditions,
      [name]: value,
    }));
  };

  // const handleSaveCondition = () => {
  //   console.log(conditions); 
  // };
  const [openingBalance, setOpeningBalance] = useState({
    selectedOption: 'Previous Dues',
    customerOwesYou: '',
  });

  const handleOptionSelectBalance = (selectedOption) => {
    setOpeningBalance((prevOpeningBalance) => ({
      ...prevOpeningBalance,
      selectedOption,
    }));
  };

  const handleChangeBalance = (event) => {
    const { name, value } = event.target;
    setOpeningBalance((prevOpeningBalance) => ({
      ...prevOpeningBalance,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log(openingBalance); // Perform your save logic here
  };

  const [communicationInfo, setCommunicationInfo] = useState({
    address: '',
    email: '',
    website: '',
    mobileNumber: '',
    telephoneNo: '',
    faxNo: '',
  });

  const handleChangeCommunication = (event) => {
    const { name, value } = event.target;
    setCommunicationInfo((prevCommunicationInfo) => ({
      ...prevCommunicationInfo,
      [name]: value,
    }));
  };

  const handleSubmitCommunication = (event) => {
    event.preventDefault();
    console.log(communicationInfo);
  };
  const [companyInfo, setCompanyInfo] = useState({
    contactType: "",
    type: "",
    customerNo: "",
    companyName: "",
    countryIso: "",
    state: "",
    contactCategory: "",
    cinNumber: "",
    gstType: "",
    gstNumber: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCompanyInfo((prevCompanyInfo) => ({
      ...prevCompanyInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(companyInfo);
    onAddContacts(companyInfo);
  };
  const handleOptionSelect = (selectedValue) => {
    console.log('Selected Option:', selectedValue);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log({
  //     contactType,
  //     customerNo,
  //     companyName,
  //     country,
  //     state,
  //     contactCategory,
  //     cin,
  //     businessType,
  //     gstNo,
  //   });
  // };
  const onAddContacts = (contactData) => {
    const endpoint = config.contact;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        auth: true,
      },
      data: contactData,
    };

    return request(endpoint, options)

      .then((response) => {
        console.log("Contact added successfully:", response);
      })
      .catch((error) => {
        console.error("Error adding contact:", error);
      });
  }


  return (
    <PageContent
      titleIsBreadCrumb
      breadCrumbData={["Home", "Contacts", "Create Contact"]}
    >
      <AddContactPerson
        isActive={isContactModalActive}
        setIsActive={setIsAddContactModalActive}
      />
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
                  footerContentRight={<Button isSuccess onClick={handleSubmit}>Save</Button>}
                >
                  <h2 className="title is-5 is-bold">Contact Info</h2>

                  <>
                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>Contact Type</label>
                          <Select options={["Customer", "Payee"]} value={companyInfo.contactType}
                            onChange={handleChange}
                            name="contactType"
                          />
                        </div>
                      </div>


                      <div className="column is-6">
                        <div className="field">
                          <RadioButton
                            choices={[
                              { label: "Customer", value: "customer", class: "radio is-outlined is-success" },
                              { label: "Payee", value: "payee", class: "radio is-outlined is-success" },
                            ]}
                            selectedOption={companyInfo.type}
                            onChange={handleOptionSelect}
                            name="selectContact"
                          />
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
                            value={companyInfo.customerNo}
                            onChange={handleChange}
                            name="customerNo"
                          />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>Company Name</label>
                          <Input placeholder={"Enter Company Name"} value={companyInfo.companyName}
                            onChange={handleChange}
                            name="companyName" />
                        </div>
                      </div>
                    </div>
                    <div className="columns is-multiline">
                      <div className="column is-6">
                        <div className="field">
                          <label>Country *</label>
                          <Select options={["India", "Indionesia", "Invoices (18)", "Iceland", "France", "Spain"]}
                            value={companyInfo.countryIso}
                            onChange={handleChange}
                            name="country"
                          />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>State *</label>
                          <Select options={["Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep"]}
                            value={companyInfo.state}
                            onChange={handleChange}
                            name="state" />
                        </div>
                      </div>
                    </div>
                    <div className="columns is-multiline">
                      <div className="column is-6">
                        <div className="field">
                          <label>Contact Category</label>
                          <Select options={["None", "Advertising", "Agency", "Insurance", "Wholesale", "Reatil", "Workshop", "End customer"]}
                            value={companyInfo.contactCategory}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>CIN ?</label>
                          <Input placeholder={"E.g.,U 31909 WB 2020 PTC 247113"}
                            value={companyInfo.cinNumber}
                            onChange={handleChange}
                            name="cinNumber"
                          />

                          {/* <p>A Corporate Identification Number (CIN) is a unique identification number that is assigned by the Registrar of Companies (ROC).</p> */}
                        </div>
                      </div>
                    </div>
                    <div className="columns is-multiline">
                      <div className="column is-6">
                        <div className="field">
                          <label>Business Type</label>
                          <Select options={["Registered", "Unregistered"]}
                            value={companyInfo.gstType || ''}
                            onChange={(e) =>
                              setCompanyInfo({
                                ...companyInfo,
                                countryIso: e.target.value,
                              })
                            }
                            name="gstType" />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>GST No ?</label>
                          <Input placeholder={"E.g.,07AAAAAOOOOA1Z6"}
                            value={companyInfo.gstNumber}
                            onChange={handleChange}
                            name="gstNumber" />
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
                  footerContentRight={<Button isSuccess onClick={handleSubmitCommunication}>Save</Button>}
                >
                  <h2 className="title is-5  is-bold">Communication</h2>

                  <>
                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>Address</label>
                          <TextArea name="address"
                            rows={2}
                            placeholder="Enter Details"
                            value={communicationInfo.address}
                            onChange={handleChangeCommunication} />
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
                          <Input name="email"
                            placeholder="Enter email address"
                            value={communicationInfo.email}
                            onChange={handleChangeCommunication} />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>Website</label>
                          <Input name="website"
                            placeholder="Enter website URL"
                            value={communicationInfo.website}
                            onChange={handleChangeCommunication} />
                        </div>
                      </div>
                    </div>

                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>Mobile Number</label>
                          <InputAddons
                            left={"+91"}
                            placeholder="Enter mobile number"
                            value={communicationInfo.mobileNumber}
                            onChange={handleChangeCommunication}
                            name="mobileNumber"
                          />
                        </div>
                      </div>

                      <div className="column is-6">
                        <div className="field">
                          <label>Telephone No</label>
                          <Input name="telephoneNo"
                            placeholder="Enter telephone number"
                            value={communicationInfo.telephoneNo}
                            onChange={handleChangeCommunication} />
                        </div>
                      </div>
                    </div>

                    <div className="columns is-multiline m-b-5">
                      <div className="column is-6">
                        <div className="field">
                          <label>Fax No</label>
                          <Input name="faxNo"
                            placeholder="Enter fax number"
                            value={communicationInfo.faxNo}
                            onChange={handleChangeCommunication} />
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
                  footerContentRight={<Button isSuccess onClick={handleSave}>Save</Button>}
                >
                  <div className="columns is-multiline">
                    <div className="column is-8">
                      <h2 className="title is-5 is-bold">Opening Balance</h2>
                    </div>

                    <div className="columns is-multiline m-b-5">
                      <div className="column is-9">
                        <div className="field">
                          <RadioButton

                            choices={[
                              { label: "Previous Dues", value: "customer", class: "radio is-outlined is-success" },
                              { label: "Excess Payments", value: "payee", class: "radio is-outlined is-success" },
                            ]}
                            selectedOption={openingBalance.selectedOption}
                            onChange={handleOptionSelectBalance}
                          />
                        </div>
                      </div>
                      <div className="column is-8">
                        <div className="field">
                          <label>Customer owes you</label>
                          <Input placeholder="&#8377;"
                            value={openingBalance.customerOwesYou}
                            onChange={handleChangeBalance}
                            name="customerOwesYou" />
                        </div>
                      </div>

                    </div>
                  </div>
                </AdvancedCard>

                <div className="m-t-15" />

                {/* YOUR PLAN */}
                <AdvancedCard
                  type={"s-card"}
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
                        <Select options={["Not Specified"]}
                          value={conditions.paymentTerms}
                          onChange={handleChangeCondition}
                          name="paymentTerms" />
                      </div>
                    </div>
                    {/* </div> */}
                    <div className="column is-9">
                      <div className="field">
                        <label>Discount on List Prices</label>
                        <Input placeholder="0%"
                          value={conditions.discount}
                          onChange={handleChangeCondition}
                          name="discount" />
                      </div>
                    </div>

                  </div>
                </AdvancedCard>
                <div className="m-t-15" />
                <AdvancedCard
                  type={"s-card"}
                  footer
                  footerContentRight={<Button isSuccess  onClick={() => setIsAddContactModalActive(true)}>Add New</Button>}
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
                    <div className="column is-9">
                      <span>Show notes when creating new documents</span>
                    </div>
                    <div className="column is-3 has-text-right">
                      <Switch isSuccess />
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

