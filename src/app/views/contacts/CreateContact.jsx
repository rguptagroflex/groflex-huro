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
// const countriesOptions = getCountries().map((country) => ({
//   label: country.label,
//   value: country.iso2,
// }));


const CreateContact = () => {
  const [isContactModalActive, setIsAddContactModalActive] = useState(false);

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
  const [countryState, setCountryState] = useState({
    id: "",
    stateName: "",
  })
  const [selectedOption, setSelectedOption] = useState([0]);

  const [companyInfo, setCompanyInfo] = useState({
    id: "",
    kind: kindOptions[0] ,
    type: "",
    number: "",
    companyName: "",
    countryIso: "",
    state: "",
    category: "",
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
  const handleOptionSelect = (selectedOption) => {

    setCompanyInfo((prevCompanyInfo) => ({
      ...prevCompanyInfo,
      kind: selectedOption.value,
    }));
    // console.log(companyInfo);
  };
  useEffect(() => {
    console.log(companyInfo);
  }, [companyInfo]);

  const kindOptions = [{  label: "Company",value: "company"}, 
  { label: "Payee" ,value: "payee"}]
  const handleKindTypeChange = (options) => {
    setCompanyInfo({ ...companyInfo, kind: options.value });
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
    const endpoint = config.contact;
    GroflexService.request(endpoint, { method: 'POST', auth: true }
    )
      .then((response) => {
        console.log("Contact added successfully:", response);
      })
      .catch((error) => {
        console.error("Error adding contact:", error);
      });
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     auth: true,
    //   },
    //   data: contactData,
    // };

    // request(endpoint, options)


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
                            <Select 
                            options={kindOptions}
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
                              onChange={handleOptionSelect}
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
                            <Select options={["India", "Indionesia", "Invoices (18)", "Iceland", "France", "Spain"]}
                              value={companyInfo.countryIso}
                              onChange={handleOptionSelect}
                              name="countryIso"
                            />
                          </div>
                        </div>

                        <div className="column is-6">
                          <div className="field">
                            <label>State *</label>
                            <Select options={["Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep"]}
                              value={companyInfo.state}
                              onChange={handleOptionSelect}
                              name="state" />
                          </div>
                        </div>
                      </div>
                      <div className="columns is-multiline">
                        <div className="column is-6">
                          <div className="field">
                            <label>Contact Category</label>
                            <Select options={["None", "Advertising", "Agency", "Insurance", "Wholesale", "Reatil", "Workshop", "End customer"]}

                              value={companyInfo.category}
                              onChange={handleOptionSelect}
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
                            <Select options={["Registered", "Unregistered"]}
                              onChange={handleOptionSelect}
                              value={companyInfo.gstType || ''}

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
                            onChange={handleChange}
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
                          <Select options={["Not Specified"]}
                            value={companyInfo.paymentTerms}
                            onChange={handleChange}
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
                    footerContentRight={<Button isSuccess onClick={() => setIsAddContactModalActive(true)}>Add New</Button>}
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
                        <Switch isSuccess value={companyInfo.notesAlert}
                          onChange={handleChange} name="notesAlert" />
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

