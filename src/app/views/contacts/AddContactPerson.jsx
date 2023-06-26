import React, { useState, useEffect } from 'react';
import Modal from '../../shared/components/modal/Modal';
import { Input } from '../../shared/components/input/Input';
import { Checkbox } from '../../shared/components/checkbox/Checkbox';
import { SelectInput } from '../../shared/components/select/SelectInput';
import { InputAddons } from '../../shared/components/inputAddons/InputAddons';

const AddContactPerson = ({ setCompanyInfo, companyInfo, isActive = false, setIsActive, }) => {
  const [newContactPerson, setNewContactPerson] = useState({
    firstName: "",
    // lastName: "",
    job: "",
    email: "",
    mobile: ""
  });
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const position = [{ value: "Head Of Department", label: "Head Of Department" },
  { value: "managing director", label: "Managing Director" }, { value: "owner", label: "Owner" }, { value: "ceo", label: "CEO" }, { value: "cfo", label: "CFO" }, { value: "cto", label: "CTO" }, { value: "others", label: "Others" }]
  // ({ isActive = false, setIsActive,
  //     addContact,
  //    setAddContact }) => {

  //     useEffect(()=>{
  //       console.log(addContact);
  //     })

  //   const handleCloseModal = () => {
  //     setIsActive(false);
  //   };


  // const handleSave = (event) => {
  //   event.preventDefault();
  //   console.log("Data submit here",);
  //   handleCloseModal();
  // };

  // const handleName = (event) => {
  //   setAddContact({ ...addContact, companyName: event.target.value })
  // }
  // const handleEmail = (event) => {
  //   setAddContact({ ...addContact, email: event.target.value })
  // }
  // const handlePosition = (event) => {
  //   setAddContact({ ...addContact, job: event.target.value })
  // }
  // const handlePhone = (e) => {
  //   const mobile = parseInt(e.target.value)
  //   setAddContact({ ...addContact, mobile: mobile })
  // }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewContactPerson((prevContactPerson) => ({
      ...prevContactPerson,
      [name]: value
    }));
  };
  const handlePositionChange = (options) => {
    setNewContactPerson((prevContactPerson) => ({
      ...prevContactPerson,
      job: options.value
    }));
  };

  // const handleMobileChange = (e) => {
  //   const mobile = parseInt(e.target.value);
  //   setNewContactPerson({ ...newContactPerson, mobile: mobile });
  // };
  const handleMobileChange = (e) => {
    const inputValue = e.target.value;
    const mobile = inputValue.slice(0, 10); // Extract the first 10 digits

    if (mobile.length === 10) {
      e.target.blur(); // Remove focus from the input field
    }

    setNewContactPerson({ ...newContactPerson, mobile: mobile });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setCompanyInfo((prevState) => ({
  //     ...prevState,
  //     contactPersons: [...prevState.contactPersons, newContactPerson]
  //   }));
  ////////////////
  const handleSaveContactPerson = (event) => {
    event.preventDefault();

    let updatedContactPersons = [];

    if (Array.isArray(companyInfo.contactPersons)) {
      updatedContactPersons = [...companyInfo.contactPersons];
    } else {
      console.error("companyInfo.contactPersons is not an array. Initializing as an empty array.");
    }

    const updatedCompanyInfo = {
      ...companyInfo,
      contactPersons: [...updatedContactPersons, newContactPerson]
    };

    setCompanyInfo(updatedCompanyInfo);
    setIsActive(false);
  };
  // Make an API call to send the newContactPerson data to the server
  // Reset the newContactPerson state if needed
  //   setNewContactPerson({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     mobile: ""
  //   });
  // };


  return (
    <Modal
      title="Add Contact"
      submitBtnName="Save"
      isActive={isActive}
      setIsAcive={setIsActive}
      // onSubmit={handleSave}
      onSubmit={handleSaveContactPerson}
    // onRequestClose={handleCancel}
    // isLarge
    >
      <form onSubmit={handleSaveContactPerson}>

        <div className="columns is-multiline m-b-5">
          <div className="column is-6">
            <div className="field">
              <label>Contact Name *</label>
              <Input
                type="text"
                name="firstName"
                placeholder="Enter Name"
                value={newContactPerson.firstName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* <div className="column is-6">
            <div className="field">
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={newContactPerson.lastName}
                onChange={handleInputChange}
              />
            </div> */}
          <div className="column is-6">
            <div className="field">
              {/* <SelectInput
                options={position}
                // name="lastName"
                // placeholder="Last Name"
                value={newContactPerson.job}
                onChange={handlePositionChange}
              /> */}
              <label>Email *</label>
              <Input
                type="email"
                name="email"
                placeholder=" Enter email address"
                value={newContactPerson.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="columns is-multiline m-b-5">
          <div className="column is-6">
            <div className="field">
              <label>Mobile Number</label>
              <InputAddons
                type="number"
                name="mobile"
                left={"+91"}
                placeholder="Enter mobile number"
                value={newContactPerson.mobile}
                onChange={handleMobileChange}
              />
            </div>
          </div>
          <div className="column is-6">
            <div className="field">
              <label>Position</label>
              <SelectInput
                options={position}
                // name="lastName"
                // placeholder="Last Name"
                value={newContactPerson.job}
                onChange={handlePositionChange}
              />
            </div>
          </div>
        </div>
        {/* <div className="field column is-6">
          <Checkbox
            isSolid={true}
            isSuccess={true}
            checked={true}
            onChange={handleCheckboxChange}
          />

        </div> */}
      </form>
    </Modal >
  );
};

export default AddContactPerson;
