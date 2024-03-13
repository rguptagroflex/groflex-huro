import React, { useState, useEffect } from 'react';
import Modal from "../modal/Modal";
import { Input } from '../input/Input';
import { SelectInput } from '../select/SelectInput';
import { InputAddons } from '../inputAddons/InputAddons';

const NumberRangeModal = ({ isActive = false, setIsActive, }) => {
    const [newNumberRange, setNewNumberRange] = useState({
        prefix: "",
        date: "",
        serialNumber: "",
        surfix: "",
        placeholder1: "",
        placeholder2: "",
        placeholder3: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewNumberRange((prevNumberRange) => ({
            ...prevNumberRange,
            [name]: value
        }));
    };
    // const handlePositionChange = (options) => {
    //     setNewContactPerson((prevContactPerson) => ({
    //         ...prevContactPerson,
    //         job: options.value
    //     }));
    // };

    // const handleMobileChange = (e) => {
    //     const inputValue = e.target.value;
    //     const mobile = inputValue.slice(0, 10); // Extract the first 10 digits

    //     if (mobile.length === 10) {
    //         e.target.blur();
    //     }

    //     setNewContactPerson({ ...newContactPerson, mobile: mobile });
    // };

    // const handleSaveContactPerson = (event) => {
    //     event.preventDefault();

    //     let updatedContactPersons = [];

    //     if (Array.isArray(companyInfo.contactPersons)) {
    //         updatedContactPersons = [...companyInfo.contactPersons];
    //     } else {
    //         console.error("companyInfo.contactPersons is not an array. Initializing as an empty array.");
    //     }

    //     const updatedCompanyInfo = {
    //         ...companyInfo,
    //         contactPersons: [...updatedContactPersons, newContactPerson]
    //     };

    //     setCompanyInfo(updatedCompanyInfo);
    //     setIsActive(false);
    // };

    return (
        <Modal
            title="Number Range"
            submitBtnName="Save"
            isActive={isActive}
            setIsAcive={setIsActive}
        // onSubmit={handleSaveContactPerson}

        >
            {/* onSubmit={handleSaveContactPerson} */}
            <form >

                <div className="columns is-multiline m-b-5">
                    <div className="column is-2">
                        <div className="field">
                            <Input
                                type="text"
                                name="prefix"
                                placeholder=""
                            // value={newContactPerson.firstName}
                            // onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="column is-1">
                        <div className="field">
                            <Input
                                type="text"
                                name="placeHolder1"
                                placeholder=""
                            // value={newContactPerson.email}
                            // onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="column is-4">
                        <div className="field">
                            <Input
                                type="text"
                                name="seperator"
                                placeholder=""
                            // value={newContactPerson.email}
                            // onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="column is-1">
                        <div className="field">
                            <Input
                                type="text"
                                name="placeHolder2"
                                placeholder=""
                            // value={newContactPerson.email}
                            // onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="column is-4">
                        <div className="field">
                            <Input
                                type="text"
                                name="serialNumber"
                                placeholder=""
                            // value={newContactPerson.email}
                            // onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="column is-1">
                        <div className="field">
                            <Input
                                type="text"
                                name="placeHolder3"
                                placeholder=""
                            // value={newContactPerson.email}
                            // onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="column is-2">
                        <div className="field">
                            <Input
                                type="text"
                                name="prefix"
                                placeholder=""
                            // value={newContactPerson.firstName}
                            // onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="columns is-multiline m-b-5">
                    <div className="column is-6">
                        <div className="field">
                            <label>Increment number by</label>
                            <InputAddons
                                type="number"
                                name="increment"
                                placeholder=""
                            // value={newContactPerson.mobile}
                            // onChange={handleMobileChange}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Modal >
    );
};

export default NumberRangeModal;
