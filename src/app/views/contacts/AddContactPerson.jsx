import React, { useState } from 'react';
import Modal from '../../shared/components/modal/Modal';
import { Input } from '../../shared/components/input/Input';
import { Checkbox } from '../../shared/components/checkbox/Checkbox';

const AddContactPerson = ({ isActive = false, setIsActive }) => {
  const [contact, setContact] = useState({
    contactName: '',
    email: '',
    mobileNumber: '',
    position: ''
  });

  const handleCloseModal = () => {
    setIsActive(false);
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const handleSave = () => {
    console.log('Contact:', contact);
    handleCloseModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value
    }));
  };

  return (
    <Modal
      title="Add Contact Person"
      submitBtnName="Save"
      isActive={isActive}
      onSubmit={handleSave}
      onRequestClose={handleCancel}
      // isLarge
    >
      <form>
        <div className="columns">
          <div className="field column is-6">
            <label>Contact Name *</label>
            <Input
              name="contactName"
              value={contact.contactName}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="field column is-6">
            <label>Email *</label>
            <Input
              name="email"
              value={contact.email}
              onChange={handleChange}
              type="email"
            />
          </div>
        </div>
        <div className="columns">
          <div className="field column is-6">
            <label>Mobile Number</label>
            <Input
              name="mobileNumber"
              value={contact.mobileNumber}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="field column is-6">
            <label>Position</label>
            <Input
              name="position"
              value={contact.position}
              onChange={handleChange}
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
