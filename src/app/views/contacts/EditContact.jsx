import React, { useState, useEffect } from "react";
import { Button } from "../../shared/components/button/Button";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import { FileInput } from "../../shared/components/fileInput/FileInput";
import { Input } from "../../shared/components/input/Input";
import { InputAddons } from "../../shared/components/inputAddons/InputAddons";
import { SelectInput } from "../../shared/components/select/SelectInput";
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
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const countriesOptions = getCountries().map((country) => ({
  label: country.label,
  value: country.iso2,
}));

const EditContact = () => {
  const { contactId } = useParams();
  const tenantData = useSelector((state) => state.accountData.tenantData);
  const [isModalActive, setIsModalActive] = useState(false);
  console.log("contactId:", contactId);
  const navigate = useNavigate();
  const location = useLocation();
  const { previousData } = location.state || {};

  // console.log('previousData:', { ...previousData });
  console.log('previousData:', previousData);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [contact, setContact] = useState(null);
  const [stateOptions, setStateOptions] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({
    id: contactId,
    kind:  "",
    type: "",
    number:"",
    companyName:  "",
    country:  "",
    state:  "",
    category: "",
    cinNumber:  "",
    gstType: "",
    gstNumber: "",
    street:  "",
    email: "",
    website: "",
    mobile:  "",
    phone1: "",
    fax:  "",
    paymentTerms:"",
    discount:  "",
    selectedOption: "",
    openingBalance: "",
    notesAlert: "",
    notes: "",
    payConditionId: 177,
    balance:  0,
    baseCurrency:  "",
    credits: 0,
    debits: 0,
    defaultExchangeRateToggle: false,
    lastName:  "",
    firstName:  "",
    exchangeRate:  0,
    outstandingAmount:  0,
    salutation:  "",
    title:"",
    address:  "",
    contactPersons: [],
  });

  // useEffect(() => {
  //   // Once the 'previousData' prop is received, update the 'contact' state variable
  //   // with the 'previousData' if it exists
  //   if (previousData) {
  //     setCompanyInfo({ ...previousData });
  //     console.log({ ...previousData })
  //   }
  // }, [previousData]);
  useEffect(() => {
    console.log("previousData:", previousData);
    if (previousData) {
      setCompanyInfo(prevCompanyInfo => ({
        ...prevCompanyInfo,
        // ...retrievedData,
      }));
    }
  }, [previousData]);




  const [editContactIndex, setEditContactIndex] = useState(null);
  const [editContactDetails, setEditContactDetails] = useState({
    firstName: "",
    email: "",
  });
  console.log("contactId", contactId)
  const handleEditContact = (index) => {
    const contact = companyInfo.contactPersons[index];
    setEditContactIndex(index);
    setEditContactDetails({ firstName: contact.firstName, email: contact.email });
    setIsModalEdit(true);
  };
  const handleSaveContact = () => {
    if (editContactIndex !== null) {
      const updatedContactPersons = [...companyInfo.contactPersons];
      updatedContactPersons[editContactIndex].firstName = editContactDetails.firstName;
      updatedContactPersons[editContactIndex].email = editContactDetails.email;
      setCompanyInfo((prevState) => ({
        ...prevState,
        contactPersons: updatedContactPersons,
      }));
      setIsModalEdit(false);
      setEditContactIndex(null);
      setEditContactDetails({ firstName: "", email: "" });
    }
  };
  const handleDeleteContact = (index) => {
    setDeleteIndex(index);
    setIsModalDelete(true);
  };

  const handleConfirmDelete = () => {
    const updatedContactPersons = [...companyInfo.contactPersons];
    updatedContactPersons.splice(deleteIndex, 1);
    setCompanyInfo((prevState) => ({
      ...prevState,
      contactPersons: updatedContactPersons,
    }));
    setIsModalDelete(false);
    setDeleteIndex(null);
  };

  const handleCancelDelete = () => {
    setIsModalDelete(false);
    setDeleteIndex(null);
  };


  useEffect(() => {
    GroflexService
      .request(`${config.resourceHost}india/states`, { auth: true })
      .then((res) => {
        const newStateOptions = res.data.map((state) => ({
          label: state.stateName,
          value: state.id,
        }));
        setStateOptions([...newStateOptions]);
      });
  }, []);

  const handleAddContactPerson = (newContactPerson) => {
    setCompanyInfo((prevState) => ({
      ...prevState,
      contactPersons: [...prevState.contactPersons, newContactPerson]
    }));
  };


  useEffect(() => {
    if (tenantData && stateOptions.length > 0) {
      console.log("tenantData", tenantData);
      // setAddContact({
      //   email: "",
      //   mobile: "",
      //   firstName: "",
      //   lastName: "",
      // });
      setCompanyInfo({
        companyName: tenantData.companyName,
        country:
          tenantData.companyAddress.country === "India"
            ? "IN"
            : tenantData.companyAddress.country,
        state: stateOptions.find((indianState) => {
          console.log(indianState.value, tenantData.indiaStateId);
          return indianState.value === tenantData.indiaStateId;
        }).value,
        gstType: tenantData.companyAddress.gstType,
        gstNumber: tenantData.companyAddress.gstNumber,
        cinNumber: tenantData.companyAddress.cinNumber,
        category: tenantData.category,
        discount: tenantData.discount,
        kind: tenantData.kind,
        notesAlert: tenantData.notesAlert,
        number: tenantData.number,
        companyName: tenantData.companyName,
        notes: tenantData.notes,
        paymentTerms: tenantData.paymentTerms,
        openingBalance: tenantData.openingBalance,
        selectedOption: tenantData.selectedOption,
        fax: tenantData.fax,
        phone1: tenantData.phone1,
        mobile: tenantData.mobile,
        website: tenantData.website,
        email: tenantData.email,
        street: tenantData.street,
        // payConditionId: tenantData.payConditionId,
      });
    }
  }, [tenantData, stateOptions])

  const categoryContact = [{ value: "not specified", label: "Not Specified" },
  { value: "advertising", label: "Advertising" },
  { value: "agency", label: "Agency" },
  { value: "insurance", label: "Insurance" },
  { value: "wholesale", label: "Wholesale" },
  { value: "retail", label: "Retail" },
  { value: "workshop", label: "Workshop" },
  { value: "end customer", label: "End customer" }]

  const [companyError, setCompanyError] = useState({
    companyNameError: "",
    countryError: "",
    numberError: "",
    cinError: "",
    gstError: "",
  })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prevCompanyInfo) => ({
      ...prevCompanyInfo,
      [name]: value,
    }));
  };
  const handleCompanyName = (e) => {
    const companyName = e.target.value.replace(/[^a-z]/gi, "");
    setCompanyError({ ...companyError, companyNameError: "" });
    setCompanyInfo({ ...companyInfo, companyName: companyName });

    //check for empty field
    if (!companyName) {
      setCompanyInfo({ ...companyInfo, companyName: "" });
      setCompanyError({
        ...companyError,
        companyNameError: "This field should not be empty",
      });

      return;
    }
  };
  const handleFaxChange = (e) => {
    const fax = e.target.value;
    setCompanyInfo({ ...companyInfo, fax: fax });
  };
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setCompanyInfo({ ...companyInfo, email: email });

  };
  const handleCinChange = (e) => {
    const cinNumber = e.target.value;

    // Handle more than 21 digit warning
    if (cinNumber.length > 21) {
      return;
    }

    // Handle equal to 21 digit warning
    if (cinNumber.length === 21) {
      setCompanyInfo({ ...companyInfo, cinNumber: cinNumber });
      setCompanyError({ ...companyError, cinError: "" });
      return;
    }

    // Check for empty field
    if (!cinNumber) {
      setCompanyInfo({ ...companyInfo, cinNumber: null });
      setCompanyError({
        ...companyError,
        cinError: "CIN  number should be of 21 digits",
      });
      return;
    }

    // Handle less than 21 digit warning
    if (cinNumber.length < 21) {
      setCompanyInfo({ ...companyInfo, cinNumber: cinNumber });
      setCompanyError({
        ...companyError,
        cinError: "CIN  number should be of 21 digits",
      });
      return;
    }
  };
  const handleGstChange = (e) => {
    const gstNumber = e.target.value;

    // Handle more than 15 digit warning
    if (gstNumber.length > 15) {
      return;
    }

    // Handle equal to 15 digit warning
    if (gstNumber.length === 15) {
      setCompanyInfo({ ...companyInfo, gstNumber: gstNumber });
      setCompanyError({ ...companyError, gstError: "" });
      return;
    }

    // Check for empty field
    if (!gstNumber) {
      setCompanyInfo({ ...companyInfo, gstNumber: null });
      setCompanyError({
        ...companyError,
        gstError: "GST  number should be of 15 digits",
      });
      return;
    }

    // Handle less than 15 digit warning
    if (gstNumber.length < 15) {
      setCompanyInfo({ ...companyInfo, gstNumber: gstNumber });
      setCompanyError({
        ...companyError,
        gstError: "GST  number should be of 15 digits",
      });
      return;
    }
  };
  const handleOpeningChange = (e) => {
    const balance = parseInt(e.target.value);
    setCompanyInfo({ ...companyInfo, openingBalance: balance });
  };
  const handleDiscountChange = (e) => {
    const discount = parseInt(e.target.value);
    setCompanyInfo({ ...companyInfo, discount: discount });
  };
  const handlePhoneChange = (e) => {
    const phone1 = parseInt(e.target.value);
    setCompanyInfo({ ...companyInfo, phone1: phone1 });
  };
  // const handleMobileChange = (e) => {
  //   const mobile = parseInt(e.target.value);
  //   setCompanyInfo({ ...companyInfo, mobile: mobile });
  // };
  const handleMobileChange = (e) => {
    const inputValue = e.target.value;
    const mobile = inputValue.slice(0, 10); // Extract the first 10 digits

    if (mobile.length === 10) {
      e.target.blur(); // Remove focus from the input field
    }

    setCompanyInfo({ ...companyInfo, mobile: mobile });
  };

  const handleNumberChange = (e) => {
    const number = parseInt(e.target.value);
    setCompanyInfo({ ...companyInfo, number: number });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(companyInfo);
    onAddContacts(companyInfo);
    navigate("/contacts")
  };
  // useEffect(() => {
  //   if (previousData) {
  //     setCompanyInfo((prevCompanyInfo) => ({
  //       ...prevCompanyInfo,
  //       id: previousData.id || "",
  //       kind: previousData.kind || "",
  //       type: previousData.type || "",
  //       companyName: previousData.companyName || "",
  //       // Update other fields as needed
  //     }));
  //     console.log("previousData1", previousData)
  //   }
  //   console.log("previousData2", previousData)
  // }, [previousData]);


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

  const kindOptions = [{ value: "company", label: "Company" },
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

  const handleNotesAlertChange = (e) => {
    const checked = e.target.checked;
    setCompanyInfo({ ...companyInfo, notesAlert: checked });
  };


  const onAddContacts = (contact) => {
    // const endpoint = config.resourceUrls.contact;
    const endpoint = `${config.resourceUrls.contact}/${contactId}`;

    const contactPerson = companyInfo.contactPersons.map((person) => ({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      mobile: person.mobile,
    }));

    const requestData = {
      address: {
        countryIso: companyInfo.country,
        gstType: companyInfo.gstType,
        gstNumber: companyInfo.gstNumber,
        cinNumber: companyInfo.cinNumber
      },
      indiaStateId: companyInfo.state,
      category: companyInfo.category,
      discount: companyInfo.discount,
      kind: companyInfo.kind,
      notesAlert: companyInfo.notesAlert,
      number: companyInfo.number,
      companyName: companyInfo.companyName,
      payConditionId: "1777",
      notes: companyInfo.notes,
      paymentTerms: companyInfo.paymentTerms,
      openingBalance: companyInfo.openingBalance,
      selectedOption: companyInfo.selectedOption,
      fax: companyInfo.fax,
      phone1: companyInfo.phone1,
      mobile: companyInfo.mobile,
      website: companyInfo.website,
      email: companyInfo.email,
      street: companyInfo.street,
      // contactPersons: [contactPerson] // Include the contact person data here
      contactPersons: contactPerson,
      id: contactId,
    };

    GroflexService.request(endpoint, {
      method: 'PUT',
      auth: true,
      data: requestData
    })
      .then((response) => {
        console.log("Contact added successfully:", response);
      })
      .catch((error) => {
        console.error("Error adding contact:", error);
      });
  };


  return (
    <PageContent
    title="Edit Contact"
      titleIsBreadCrumb
      breadCrumbData={["Home", "Contacts", <span style={{ color: "green" }}>Edit Contact</span>]}
    >
      {isModalActive && (
        <AddContactPerson
          isActive={isModalActive}
          setIsActive={setIsModalActive}
          setCompanyInfo={setCompanyInfo}
          companyInfo={companyInfo}
          contactPersons={companyInfo.contactPersons}
          addContactPerson={handleAddContactPerson}
        />


      )}
      {isModalEdit && (
        <EditModal
          isModalEdit={isModalEdit}
          setIsModalEdit={setIsModalEdit}
          editContactDetails={editContactDetails}
          setEditContactDetails={setEditContactDetails}
          handleSaveContact={handleSaveContact} />
      )}
      {isModalDelete && (
        <DeleteModal
          isModalDelete={isModalDelete}
          setIsModalDelete={setIsModalDelete}
          handleConfirmDelete={handleConfirmDelete}
          onSubmit={handleConfirmDelete}
          deleteIndex={deleteIndex}
          setDeleteIndex={setDeleteIndex}
          contactName={companyInfo.contactPersons[deleteIndex]?.firstName}
        />
      )

      }

      <div className="page-content-inner">
        <div className="tabs-wrapper">
          <div className="tabs-inner">
            <div
            >
              <ul>
                <li data-tab="account-details-tab" className="is-active">
                  {/* <Link to="/contacts"><h2 className="title is-5 ">Edit Contact</h2></Link> */}
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
                  <AdvancedCard
                    type={"s-card"}
                  >
                    <h2 className="title is-5 is-bold">Contact Info</h2>

                    <>
                      <div className="columns is-multiline m-b-5">
                        <div className="column is-6">
                          <div className="field">
                            <label>Contact Type</label>
                            <SelectInput options={kindOptions}
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
                              type="number"
                              // left={"+91"}
                              placeholder={"1059"}
                              value={companyInfo.number}
                              onChange={handleNumberChange}
                              name="number"
                            />
                          </div>
                        </div>

                        <div className="column is-6">
                          <div className="field">
                            <label>Company Name</label>
                            <Input
                              type="text"
                              placeholder={"Enter Company Name"} value={companyInfo.companyName
                                ? companyInfo.companyName
                                : ""}
                              onChange={handleCompanyName}
                              name="companyName" />
                            <ErrorText
                              visible={companyError.companyNameError}
                              text={companyError.companyNameError}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="columns is-multiline">
                        <div className="column is-6">
                          <div className="field">
                            <label>Country *</label>
                            <SelectInput
                              defaultValue={companyInfo.country}
                              options={countriesOptions}
                              value={companyInfo.country}
                              onChange={handleCountryChange}
                            />
                          </div>
                        </div>
                        {companyInfo.country === "IN" ? (
                          <div className="column is-6">
                            <div className="field">
                              <label>State *</label>
                              <SelectInput
                                defaultValue={companyInfo.state}
                                options={stateOptions}
                                onChange={handleStateChange}
                                value={companyInfo.state}
                              />
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="columns is-multiline">
                        <div className="column is-6">
                          <div className="field">
                            <label>Contact Category</label>
                            <SelectInput options={categoryContact}

                              value={companyInfo.category}
                              onChange={handleContactChange}
                              name="category"
                            />
                          </div>
                        </div>

                        <div className="column is-6">
                          <div className="field">
                            <label>CIN ?</label>
                            <Input
                              type="text"
                              placeholder={"E.g.,U 31909 WB 2020 PTC 247113"}

                              value={companyInfo.cinNumber ? companyInfo.cinNumber : ""}
                              onChange={handleCinChange}

                              name="cinNumber"
                            />
                            <ErrorText
                              visible={companyError.cinError}
                              text={companyError.cinError}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="columns is-multiline">
                        <div className="column is-6">
                          <div className="field">
                            <label>Business Type</label>
                            <SelectInput options={bussinessType}
                              onChange={handleBussinessChange}
                              value={companyInfo.gstType}

                              name="gstType" />
                          </div>
                        </div>

                        <div className="column is-6">
                          <div className="field">
                            <label>GST No ?</label>
                            <Input
                              type="text"
                              placeholder={"E.g.,07AAAAAOOOOA1Z6"}
                              onChange={handleGstChange}
                              value={companyInfo.gstNumber ? companyInfo.gstNumber : ""}

                              name="gstNumber" />
                            <ErrorText
                              visible={companyError.gstError}
                              text={companyError.gstError}
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
                              type="email"
                              placeholder="Enter email address"
                              onChange={handleEmailChange}
                              value={companyInfo.email}

                              name="email"
                            />
                          </div>
                        </div>

                        <div className="column is-6">
                          <div className="field">
                            <label>Website</label>
                            <Input
                              type="text"
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
                              type="number"
                              left={"+91"}
                              placeholder="Enter mobile number"
                              value={companyInfo.mobile}
                              onChange={handleMobileChange}
                              name="mobile"
                            />
                          </div>
                        </div>

                        <div className="column is-6">
                          <div className="field">
                            <label>Telephone No</label>
                            <InputAddons
                              type="number"
                              placeholder="Enter telephone number"
                              value={companyInfo.phone1}
                              onChange={handlePhoneChange}
                              name="phone1" />
                          </div>
                        </div>
                      </div>

                      <div className="columns is-multiline m-b-5">
                        <div className="column is-6">
                          <div className="field">
                            <label>Fax No</label>
                            <Input
                              type="text"
                              placeholder="Enter fax number"
                              value={companyInfo.fax}
                              onChange={handleFaxChange}
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
                            <Input
                              type="number"
                              placeholder="&#8377;"
                              value={companyInfo.openingBalance}
                              onChange={handleOpeningChange}
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
                          <SelectInput options={selectPayment}
                            value={companyInfo.paymentTerms}
                            onChange={handlePaymentChange}
                            name="paymentTerms" />
                        </div>
                      </div>
                      {/* </div> */}
                      <div className="column is-9">
                        <div className="field">
                          <label>Discount on List Prices</label>
                          <Input
                            type="number"
                            placeholder="0%"
                            value={companyInfo.discount}
                            onChange={handleDiscountChange}
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
                        <div className="contact-list">
                          <h2 className="title is-5 is-bold">Contact</h2>
                          <p>You can list all your contacts here</p>
                          {companyInfo.contactPersons && companyInfo.contactPersons.length > 0 ? (
                            <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px', width: "150%" }}>
                              <table>
                                <thead>
                                  <tr>
                                    <th style={{ paddingRight: '30px' }}>First Name</th>
                                    <th>Email</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {companyInfo.contactPersons.map((contact, index) => (
                                    <tr key={index}>
                                      <td style={{ paddingRight: '30px' }}>{contact.firstName}</td>
                                      <td style={{ paddingRight: '20px' }}>{contact.email}</td>
                                      <td>
                                        <FeatherIcon style={{ paddingRight: '5px' }} color="#00a353" name="Edit" onClick={() => handleEditContact(index)} /></td>
                                      <td>  <FeatherIcon color="#00a353" name="Trash" onClick={() => handleDeleteContact(index)} /></td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p>No contact persons available.</p>
                          )}
                        </div>
                      </div>
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

export default EditContact;

