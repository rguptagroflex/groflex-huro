import React, { useState, useEffect } from "react";
import store from "../../redux/store";
import { IconButton } from "../../shared/components/button/IconButton";
import { Button } from "../../shared/components/button/Button";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import { FileInput } from "../../shared/components/fileInput/FileInput";
import { Input } from "../../shared/components/input/Input";
import { InputAddons } from "../../shared/components/inputAddons/InputAddons";
import { Select } from "../../shared/components/select/Select";
import { TextArea } from "../../shared/components/textArea/TextArea";
import PageContent from "../../shared/components/pageContent/PageContent";
import { Link } from "react-router-dom";
import { Switch } from "../../shared/components/switch/Switch";
import RadioButton from "../../shared/components/button/RadioButton";
import GroflexService from "../../services/groflex.service";
import config from "../../../../config";
import ErrorText from "../../shared/components/errorText/ErrorText";
import AddContactPerson from "./AddContactPerson";
import { getCountries } from "../../helpers/getCountries";
import { useSelector } from "react-redux";
const countriesOptions = getCountries().map((country) => ({
  label: country.label,
  value: country.iso2,
}));

const CreateContact = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [contact, setContact] = useState(null);
  const handleAddContact = (newContact) => {
    setContact(newContact);
    setIsModalActive(false);
  };
  const [stateOptions, setStateOptions] = useState([]);

  //${config.resourceHost}india/states
  useEffect(() => {
    GroflexService
      .request(`${config.resourceHost}india/states`, { auth: true })
      .then((res) => {
        // console.log(res.data);
        const newStateOptions = res.data.map((state) => ({
          label: state.stateName,
          value: state.id,
        }));
        setStateOptions([...newStateOptions]);
      });
  }, []);


  // const [conditions, setConditions] = useState({
  //   paymentTerms: '',
  //   discount: '',
  // });

  // const handleChangeCondition = (event) => {
  //   const { name, value } = event.target;
  //   setConditions((prevConditions) => ({
  //     ...prevConditions,
  //     [name]: value,
  //   }));
  // };

  // const [openingBalance, setOpeningBalance] = useState({
  //   selectedOption: 'Previous Dues',
  //   openingBalance: '',
  // });

  // const handleOptionSelectBalance = (selectedOption) => {
  //   setOpeningBalance((prevOpeningBalance) => ({
  //     ...prevOpeningBalance,
  //     selectedOption,
  //   }));
  // };

  // const handleChangeBalance = (event) => {
  //   const { name, value } = event.target;
  //   setOpeningBalance((prevOpeningBalance) => ({
  //     ...prevOpeningBalance,
  //     [name]: value,
  //   }));
  // };

  // const handleSave = () => {
  //   console.log(openingBalance);
  // };

  // const [communicationInfo, setCommunicationInfo] = useState({
  //   street: '',
  //   email: '',
  //   website: '',
  //   mobile: '',
  //   phone1: '',
  //   fax: '',
  // });

  // const handleChangeCommunication = (event) => {
  //   const { name, value } = event.target;
  //   setCommunicationInfo((prevCommunicationInfo) => ({
  //     ...prevCommunicationInfo,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmitCommunication = (event) => {
  //   event.preventDefault();
  //   console.log(communicationInfo);
  //   onAddContacts(communicationInfo);
  // };
  // const [addContact,setAddContact] = useState({
  //   jobTitles:"",
  //   email:"",
  //   mobile:"",
  //   companyName:""
  const categoryContact = [{ value: "not specified", label: "Not Specified" },
  { value: "advertising", label: "Advertising" },
  { value: "agency", label: "Agency" },
  { value: "insurance", label: "Insurance" },
  { value: "wholesale", label: "Wholesale" },
  { value: "retail", label: "Retail" },
  { value: "Workshop", label: "Workshop" },
  { value: "end customer", label: "End customer" }]

  // })

  const [companyInfo, setCompanyInfo] = useState({
    id: "",
    kind: "",
    type: "",
    number: "",
    companyName: "",
    // countryIso: "",
    state: "",
    category: categoryContact[0].value,
    cinNumber: "",
    gstType: "",
    gstNumber: "",
    street: '',
    email: '',
    website: '',
    mobile: '',
    phone1: '',
    fax: '',
    paymentTerms: '',
    discount: '',
    selectedOption: 'Previous Dues',
    openingBalance: '',
    notesAlert: "",
    notes: "",
    payConditionId: "1777"
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

  useEffect(() => {
    console.log(companyInfo);
  }, [companyInfo]);
  const handleStateChange = (options) => {
    // console.log(options.label);
    setCompanyInfo({ ...companyInfo, state: options.value });
  };
  const handleCountryChange = (options) => {
    setCompanyInfo({ ...companyInfo, country: options.value });
  };

  const kindOptions = [{ value: "company", label: "company" },
  { value: "payee", label: "Payee" }]

  const handleKindTypeChange = (options) => {
    setCompanyInfo({ ...companyInfo, kind: options.value });
  };


  const handleContactChange = (options) => {
    setCompanyInfo({ ...companyInfo, category: options.value });
  };
  const bussinessType = [{ value: "registered", label: "Registered" },
  { value: "unregistered", label: "Unregistered" }]
  const handleBussinessChange = (options) => {
    setCompanyInfo({ ...companyInfo, gstType: options.value });
  };
  const selectPayment = [{ value: "not specified", label: "Not Specified" }]
  const handlePaymentChange = (options) => {
    setCompanyInfo({ ...companyInfo, paymentTerms: options.value });
  };

  const handleRadioChange = (choices) => {
    setCompanyInfo({ ...companyInfo, type: choices });
  };
  const handleSelectChange = (choices) => {
    setCompanyInfo({ ...companyInfo, selectedOption: choices });
  };

  const handleNotesAlertChange = (event) => {
    const checked = event.target.checked;
    setCompanyInfo({ ...companyInfo, notesAlert: checked });
  };




  // const handleAccountSubTypeChange = (option) => {
  // 	setAccountSubType(option.value);
  // };

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
  // const states = () => {
  //   const endpoint = config.states;
  //   GroflexService.request(endpoint, { method: 'POST', auth: true }
  //   )
  //     .then((response) => {
  //       console.log("Contact added successfully:", response);
  //     })
  //     .catch((error) => {
  //       console.error("Error adding contact:", error);
  //     });
  // }
  const onAddContacts = (contactData) => {
    const endpoint = config.resourceUrls.contact;
    GroflexService.request(endpoint, { method: 'POST', auth: true }
    )
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
      {isModalActive && (
        <AddContactPerson
          isActive={isModalActive}
          setIsActive={handleAddContact}
        />

      )}
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
          <AdvancedCard
            type={"s-card"}
            footer
            footerContentRight={<Button isSuccess onClick={handleSubmit} >Save</Button>}
          >
            <div id="account-details-tab" className="tab-content is-active">
              <div className="columns is-multiline">
                <div className="column is-7">
                  {/* PROFILE INFO */}
                  <AdvancedCard
                    type={"s-card"}
                  // footer
                  // footerContentRight={<Button isSuccess onClick={handleSubmit}>Save</Button>}
                  >
                    <h2 className="title is-5 is-bold">Contact Info</h2>

                    <>
                      <div className="columns is-multiline m-b-5">
                        <div className="column is-6">
                          <div className="field">
                            <label>Contact Type</label>
                            <Select options={kindOptions}
                              onChange={handleKindTypeChange}
                              value={companyInfo.kind}

                              name="kind"
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
                              onChange={handleRadioChange}
                              name="type"
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
                              value={companyInfo.number}
                              onChange={handleChange}
                              name="number"
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
                            <Select options={countriesOptions}
                              value={companyInfo.countryIso}
                              onChange={handleCountryChange}
                              name="countryIso"
                            />
                          </div>
                        </div>
                        {companyInfo.country == "IN" ||
                          companyInfo.country == "" ? (
                          <div className="column is-6">
                            <div className="field">
                              <label>State *</label>
                              <Select
                                options={stateOptions}
                                onChange={handleStateChange}
                              />
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        {/* <div className="column is-6">
                          <div className="field">
                            <label>State *</label>
                            <Select options={["Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep"]}
                              value={companyInfo.state}
                              onChange={handleOptionSelect}
                              name="state" />
                          </div>
                        </div> */}
                      </div>
                      <div className="columns is-multiline">
                        <div className="column is-6">
                          <div className="field">
                            <label>Contact Category</label>
                            <Select options={categoryContact}

                              value={companyInfo.category}
                              onChange={handleContactChange}
                              name="category"
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
                            <Select options={bussinessType}
                              onChange={handleBussinessChange}
                              value={companyInfo.gstType}

                              name="gstType" />
                          </div>
                        </div>

                        <div className="column is-6">
                          <div className="field">
                            <label>GST No ?</label>
                            <Input placeholder={"E.g.,07AAAAAOOOOA1Z6"}
                              onChange={handleChange}
                              value={companyInfo.gstNumber}

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
                  // footer
                  // footerContentRight={<Button isSuccess onClick={handleSubmitCommunication}>Save</Button>}
                  >
                    <h2 className="title is-5  is-bold">Communication</h2>

                    <>
                      <div className="columns is-multiline m-b-5">
                        <div className="column is-6">
                          <div className="field">
                            <label>Address</label>
                            <TextArea
                              rows={2}
                              placeholder="Enter Details"
                              value={companyInfo.street}
                              onChange={handleChange}
                              name="street"
                            />
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
                            <Input
                              placeholder="Enter email address"
                              onChange={handleChange}
                              value={companyInfo.email}

                              name="email"
                            />
                          </div>
                        </div>

                        <div className="column is-6">
                          <div className="field">
                            <label>Website</label>
                            <Input
                              placeholder="Enter website URL"
                              value={companyInfo.website}
                              onChange={handleChange}
                              name="website" />
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
                              value={companyInfo.mobile}
                              onChange={handleChange}
                              name="mobile"
                            />
                          </div>
                        </div>

                        <div className="column is-6">
                          <div className="field">
                            <label>Telephone No</label>
                            <Input
                              placeholder="Enter telephone number"
                              value={companyInfo.phone1}
                              onChange={handleChange}
                              name="phone1" />
                          </div>
                        </div>
                      </div>

                      <div className="columns is-multiline m-b-5">
                        <div className="column is-6">
                          <div className="field">
                            <label>Fax No</label>
                            <Input
                              placeholder="Enter fax number"
                              value={companyInfo.fax}
                              onChange={handleChange}
                              name="fax" />
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
                  // footer
                  // footerContentRight={<Button isSuccess onClick={handleSave}>Save</Button>}
                  >
                    <div className="columns is-multiline">
                      <div className="column is-8">
                        <h2 className="title is-5 is-bold">Opening Balance</h2>
                      </div>

                      <div className="columns is-multiline m-b-5">
                        {/* <div className="column is-9"> */}
                        <div className="field">
                          <RadioButton

                            choices={[
                              { label: "Previous Dues", value: "customer", class: "radio is-outlined is-success" },
                              { label: "Excess Payments", value: "payee", class: "radio is-outlined is-success" },
                            ]}
                            selectedOption={companyInfo.selectedOption}
                            onChange={handleSelectChange}
                            name="selectedOption"
                          />
                        </div>
                        {/* </div> */}
                        <div className="column is-8">
                          <div className="field">
                            <label>Customer owes you</label>
                            <Input placeholder="&#8377;"
                              value={companyInfo.openingBalance}
                              onChange={handleChange}
                              name="openingBalance" />
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
                          <Select options={selectPayment}
                            value={companyInfo.paymentTerms}
                            onChange={handlePaymentChange}
                            name="paymentTerms" />
                        </div>
                      </div>
                      {/* </div> */}
                      <div className="column is-9">
                        <div className="field">
                          <label>Discount on List Prices</label>
                          <Input placeholder="0%"
                            value={companyInfo.discount}
                            onChange={handleChange}
                            name="discount" />
                        </div>
                      </div>

                    </div>
                  </AdvancedCard>
                  <div className="m-t-15" />
                  <AdvancedCard
                    type={"s-card"}
                    footer
                    footerContentRight={<Button isSuccess onClick={() => setIsModalActive(true)}>Add New</Button>}
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
                          <TextArea rows={3} placeholder="Enter Additional Notes here" value={companyInfo.notes}
                            onChange={handleChange} name="notes" />
                        </div>
                      </div>
                      <div className="column is-9">
                        <span>Show notes when creating new documents</span>
                      </div>
                      <div className="column is-3 has-text-right">
                        <Switch isSuccess checked={companyInfo.notesAlert}
                          onChange={handleNotesAlertChange} name="notesAlert" />
                      </div>



                      {/* </div> */}
                    </div>
                  </AdvancedCard>

                </div>
              </div>
            </div>
          </AdvancedCard>
        </div>
      </div>
    </PageContent>
  );
};

export default CreateContact;

