import React, { useState } from 'react';
import Modal from '../../shared/components/modal/Modal';
import { Input } from '../../shared/components/input/Input';
import { Checkbox } from '../../shared/components/checkbox/Checkbox';

const AddContactPerson = ({ isActive = false, setIsActive }) => {
  // const [contact, setContact] = useState({
  //   contactName: '',
  //   email: '',
  //   mobileNumber: '',
  //   position: ''
  // });
  const [addContact, setAddContact] = useState({
    jobTitles: "",
    email: "",
    mobile: "",
    companyName: ""
  })

  const handleCloseModal = () => {
    setIsActive(false);
  };

  // const handleCancel = () => {
  //   handleCloseModal();
  // };

  const handleSave = () => {
    event.preventDefault();
    // console.log('Contact:', contact);
    handleCloseModal();
  };

  const handleName = (event) => {
    setAddContact({ ...addContact, companyName: event.target.value })
  }
  const handleEmail = (event) => {
    setAddContact({ ...addContact, email: event.target.value })
  }
  const handlePosition = (event) => {
    setAddContact({ ...addContact, jobTitles: event.target.value })
  }
  const handlePhone = (event) => {
    setAddContact({ ...addContact, mobile: event.target.value })
  }


  return (
    <Modal
      title="Add Contact Person"
      submitBtnName="Save"
      isActive={isActive}
      setIsAcive={setIsActive}
      onSubmit={handleSave}
    // onRequestClose={handleCancel}
    // isLarge
    >
      <form>
        <div className="columns">
          <div className="field column is-6">
            <label>Contact Name *</label>
            <Input
              name="contactName"
              value={addContact.companyName}
              onChange={handleName}
              type="text"
            />
          </div>
          <div className="field column is-6">
            <label>Email *</label>
            <Input
              name="email"
              value={addContact.email}
              onChange={handleEmail}
              type="email"
            />
          </div>
        </div>
        <div className="columns">
          <div className="field column is-6">
            <label>Mobile Number</label>
            <Input
              name="mobileNumber"
              value={addContact.mobile}
              onChange={handlePhone}
              type="text"
            />
          </div>
          <div className="field column is-6">
            <label>Position</label>
            <Input
              name="position"
              value={addContact.jobTitles}
              onChange={handlePosition}
              type="text"
            />
          </div>

        </div>
        {/* <div className="field column is-6">
            <Checkbox isSolid={true}
                      // isSuccess= {true}
                      checked=  {true}
                      />
          
          </div> */}
      </form>
    </Modal>
  );
};

export default AddContactPerson;
