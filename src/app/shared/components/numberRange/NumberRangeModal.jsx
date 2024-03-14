import React, { useState, useEffect, useRef } from 'react';
import Modal from "../modal/Modal";
import { Input } from '../input/Input';
import { SelectInput } from '../select/SelectInput';
import { InputAddons } from '../inputAddons/InputAddons';
import { AdvancedCard } from '../cards/AdvancedCard';
import { Switch } from '../switch/Switch';
import { TextArea } from '../textArea/TextArea';
import moment from 'moment';

const INVOICE_VIEW = "invoice";
const OFFER_VIEW = "offer";
const PURCHASE_ORDER_VIEW = "purchaseOrder";
const YEAR_KEY = "YYYY";
const YEAR_SHORT_KEY = "YY";
const YEAR_MONTH_KEY = "YYYYMM";
const YEAR_SHORT_MONTH_KEY = "YYMM";
const YEAR_MONTH_DAY_KEY = "YYYYMMDD";
const YEAR_SHORT_MONTH_DAY_KEY = "YYMMDD";
const FY_KEY = "YYYYYY";

const FREQUENCY_YEAR = "yearly";
const FREQUENCY_MONTH = "monthly";
const FREQUENCY_DAY = "daily";

const NumberRangeModal = ({ isActive = false, setIsActive, }) => {
    const [newNumberRange, setNewNumberRange] = useState({
        prefix: "",
        datePart: "",
        serialNumber: 4,
        surfix: "",
        placeholder1: "",
        placeholder2: "",
        placeholder3: "",
        resetPeriodically: false,
        resetInterval: "yearly",
        numberIncrement: 1,
        startFrom: 1,
        numberFrom: "",
        currentNumber: "0001"
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewNumberRange((prevNumberRange) => ({
            ...prevNumberRange,
            [name]: value
        }));
    };

    const handleResetPeriodically = () => {
        setNewNumberRange({
            ...newNumberRange,
            resetPeriodically: !newNumberRange.resetPeriodically,
        });
    };
    const handleResetIntervalChange = (options) => {
        setNewNumberRange((prevNewNumberRange) => ({
            ...prevNewNumberRange,
            resetInterval: options.value
        }));
    };

    const handlePlaceHolder1Change = (options) => {
        setNewNumberRange((prevNewNumberRange) => ({
            ...prevNewNumberRange,
            placeholder1: options.value
        }));
    };
    const handlePlaceHolder2Change = (options) => {
        setNewNumberRange((prevNewNumberRange) => ({
            ...prevNewNumberRange,
            placeholder2: options.value
        }));
    };
    const handlePlaceHolder3Change = (options) => {
        setNewNumberRange((prevNewNumberRange) => ({
            ...prevNewNumberRange,
            placeholder3: options.value
        }));
    };
    const handleSerialNumberChange = (options) => {
        const optionValue = options.value;
        const currentNumber = newNumberRange.currentNumber;

        // Pad the current number with leading zeros
        const paddedCurrentNumber = currentNumber.toString().padStart(optionValue, '0');

        // Update serial number based on the option value
        let newCurrentNumber;
        if (optionValue >= currentNumber.toString().length) {
            newCurrentNumber = paddedCurrentNumber;
        } else {
            newCurrentNumber = currentNumber.toString();
        }

        // Update state with the new serial number
        setNewNumberRange((prevNewNumberRange) => ({
            ...prevNewNumberRange,
            currentNumber: newCurrentNumber
        }));
        setNewNumberRange((prevNewNumberRange) => ({
            ...prevNewNumberRange,
            serialNumber: options.value
        }));
    };

    const handleDatePartChange = (options) => {
        let formattedDate = '';
        switch (options.value) {
            case YEAR_KEY:
                formattedDate = moment().format("YYYY");
                break;
            case YEAR_SHORT_KEY:
                formattedDate = moment().format("YY");
                break;
            case YEAR_MONTH_KEY:
                formattedDate = moment().format("YYYYMM");
                break;
            case YEAR_SHORT_MONTH_KEY:
                formattedDate = moment().format("YYMM");
                break;
            case YEAR_MONTH_DAY_KEY:
                formattedDate = moment().format("YYYYMMDD");
                break;
            case YEAR_SHORT_MONTH_DAY_KEY:
                formattedDate = moment().format("YYMMDD");
                break;
            case FY_KEY:
                const currentYear = moment().format("YYYY");
                const nextYear = moment().add(1, 'years').format("YYYY");
                formattedDate = currentYear + nextYear.slice(-2);
                break;
            default:
                // Handle default case
                break;
        }

        // Update state with the formattedDate
        setNewNumberRange((prevNewNumberRange) => ({
            ...prevNewNumberRange,
            datePart: formattedDate
        }));
    };
    console.log(newNumberRange.currentNumber)

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
    // const dateData = {None: 'None', YYMM: 'YYMM', YYYYMM: 'YYYYMM'}

    const dateOptions = [
        {
            label: "None",
            value: "",
            disabled: false,
        },
        {
            label: `YY`,
            value: YEAR_SHORT_KEY,
            disabled: false,
        },
        {
            label: `YYYY`,
            value: YEAR_KEY,
            disabled: false,
        },
        {
            label: `FY - YYYYYY`,
            value: FY_KEY,
            disabled: true,
        },
        {
            label: `YYMM`,
            value: YEAR_SHORT_MONTH_KEY,
            disabled: false,
        },
        {
            label: `YYYYMM`,
            value: YEAR_MONTH_KEY,
            disabled: false,
        },
        {
            label: `YYMMDD`,
            value: YEAR_SHORT_MONTH_DAY_KEY,
            disabled: false,
        },
        {
            label: `YYYYMMDD`,
            value: YEAR_MONTH_DAY_KEY,
            disabled: false,
        },
    ]
    const frequencyOptions = [
        {
            label: `Yearly`,
            value: FREQUENCY_YEAR,
        },
        {
            label: `Monthly`,
            value: FREQUENCY_MONTH,
        },
        {
            label: `Daily`,
            value: FREQUENCY_DAY,
        },
    ]

    const placeholderLoadedOptions = [
        {
            label: 'Empty',
            value: "",
        },
        {
            label: "-",
            value: "-",
        },
        {
            label: "/",
            value: "/",
        },
        {
            label: "|",
            value: "|",
        },
    ];

    const numberFrom = [
        { value: "January", label: "January" },
        { value: "February", label: "February" },
        { value: "March", label: "March" },
        { value: "April", label: "April" },
        { value: "May", label: "May" },
        { value: "June", label: "June" },
        { value: "July", label: "July" },
        { value: "August", label: "August" },
        { value: "September", label: "September" },
        { value: "October", label: "October" },
        { value: "November", label: "November" },
        { value: "December", label: "December" }
    ];

    const serialNumber = [
        { value: "2", label: "2-digit" },
        { value: "3", label: "3-digit" },
        { value: "4", label: "4-digit" },
        { value: "5", label: "5-digit" },
        { value: "6", label: "6-digit" },
        { value: "7", label: "7-digit" },
        { value: "8", label: "8-digit" },
        { value: "9", label: "9-digit" },
        { value: "10", label: "10-digit" }
    ];

    const containerRef = useRef(null);
    const [clickedElement, setClickedElement] = useState(null);

    const handleClick = (id) => {
        setClickedElement(id === clickedElement ? null : id);
    };

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setClickedElement(null);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);
    return (
        <Modal
            title="Number Range"
            submitBtnName="Save"
            isActive={isActive}
            setIsAcive={setIsActive}
            isBig="is-big"
        // onSubmit={handleSaveContactPerson}

        >
            <div className="numeration-result">
                <div className='column is-12' ref={containerRef}>
                    <div className='field m-1'>
                        <span className={clickedElement === 'prefixHover' ? "triggeredHover" : ""} onClick={() => handleClick('prefixHover')}>{newNumberRange.prefix}</span>
                    </div>
                    <div className='field m-1'>
                        <span className={clickedElement === 'placeHolder1Hover' ? "triggeredHover" : ""} onClick={() => handleClick('placeHolder1Hover')}>{newNumberRange.placeholder1}</span>
                    </div>
                    <div className='field m-1'>
                        <span className={clickedElement === 'datePart' ? "triggeredHover" : ""} onClick={() => handleClick('datePart')}>{newNumberRange.datePart}</span>
                    </div>
                    <div className='field m-1'>
                        <span className={clickedElement === 'placeHolder2Hover' ? "triggeredHover" : ""} onClick={() => handleClick('placeHolder2Hover')}>{newNumberRange.placeholder2}</span>
                    </div>
                    <div className={`field numeration-input-box digits-${newNumberRange.serialNumber} m-1`}>
                        <InputAddons
                            type="text"
                            name="currentNumber"
                            placeholder={newNumberRange.currentNumber}
                            value={newNumberRange.currentNumber}
                            // defaultValue= {newNumberRange.currentNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='field m-1'>
                        <span className={clickedElement === 'placeHolder3Hover' ? "triggeredHover" : ""} onClick={() => handleClick('placeHolder3Hover')}>{newNumberRange.placeholder3}</span>
                    </div>
                    <div className='field m-1'>
                        <span className={clickedElement === 'surfixHover' ? "triggeredHover" : ""} onClick={() => handleClick('surfixHover')}>{newNumberRange.surfix}</span>
                    </div>
                </div>
            </div>
            {/* onSubmit={handleSaveContactPerson} */}
            <form >

                <div className="columns is-multiline m-b-5">
                    <div className="column is-2">
                        <div className="field">
                            <label>Prefix</label>
                            <Input
                                type="text"
                                name="prefix"
                                placeholder=""
                                maxLength="3"
                                value={newNumberRange.prefix}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="column is-1 numeration-placeholder seperator-remove">
                        <div className="field numeration-dropdown">
                            <SelectInput
                                options={placeholderLoadedOptions}
                                // value={newNumberRange.placeholder1}
                                placeholder={''}
                                onChange={handlePlaceHolder1Change}
                            />
                        </div>
                    </div>
                    <div className="column is-3 seperator-remove">
                        <div className="field">
                            <label>Date</label>
                            <SelectInput
                                options={dateOptions}
                                value={newNumberRange.datePart}
                                placeholder={"None"}
                                onChange={handleDatePartChange}
                            />
                        </div>
                    </div>
                    <div className="column is-1 numeration-placeholder seperator-remove">
                        <div className="field numeration-dropdown">
                            <SelectInput
                                options={placeholderLoadedOptions}
                                // value={newNumberRange.placeholder1}
                                placeholder={''}
                                onChange={handlePlaceHolder2Change}
                            />
                        </div>
                    </div>
                    <div className="column is-2 seperator-remove">
                        <div className="field">
                            <label>Serial No.</label>
                            <SelectInput
                                options={serialNumber}
                                value={newNumberRange.serialNumber}
                                placeholder={newNumberRange.serialNumber + '-digits'}
                                onChange={handleSerialNumberChange}
                            />
                        </div>
                    </div>
                    <div className="column is-1 numeration-placeholder seperator-remove">
                        <div className="field numeration-dropdown">
                            <SelectInput
                                options={placeholderLoadedOptions}
                                // value={newNumberRange.placeholder3}
                                // placeholder={newNumberRange.placeholder3}
                                onChange={handlePlaceHolder3Change}
                                placeholder={""}
                            />
                        </div>
                    </div>
                    <div className="column is-2 ">
                        <div className="field">
                            <label>Suffix</label>
                            <Input
                                type="text"
                                name="surfix"
                                placeholder=""
                                value={newNumberRange.surfix}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="columns is-multiline m-b-5">
                    <div className="column is-4">
                        <div className="field">
                            <label>Increment number by</label>
                            <InputAddons
                                type="number"
                                name="numberIncrement"
                                placeholder=""
                                defaultValue={1}
                                value={newNumberRange.numberIncrement}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="columns is-multiline m-b-5">
                    <div className="column is-4">
                        <label className=''>Reset numbers periodically</label>
                    </div>
                    <div className="column is-4">
                        <Switch
                            onChange={handleResetPeriodically}
                            checked={newNumberRange.resetPeriodically}
                            isSuccess
                        />
                    </div>
                </div>
                {
                    newNumberRange.resetPeriodically ?
                        <div className="columns is-multiline m-b-5">
                            <div className="column is-4 seperator-remove">
                                <div className="field">
                                    <label>Number reset interval</label>
                                    <SelectInput
                                        options={frequencyOptions}
                                        value={newNumberRange.resetInterval}
                                        placeholder={''}
                                        onChange={handleResetIntervalChange}
                                    />
                                </div>
                            </div>
                            {
                                newNumberRange.resetInterval == FREQUENCY_YEAR ?
                                    <div className="column is-4 seperator-remove">
                                        <div className="field">
                                            <label>Reset number from</label>
                                            <SelectInput
                                                options={numberFrom}
                                                value={newNumberRange.numberFrom}
                                                placeholder={'Choose'}
                                            // onChange={handlePositionChange}
                                            />
                                        </div>
                                    </div> : ''
                            }
                            <div className="column is-4">
                                <div className="field">
                                    <label>Start number from</label>
                                    <InputAddons
                                        type="number"
                                        name="startFrom"
                                        placeholder=""
                                        defaultValue={1}
                                        value={newNumberRange.startFrom}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        : ''
                }
            </form>
        </Modal >
    );
};

export default NumberRangeModal;
