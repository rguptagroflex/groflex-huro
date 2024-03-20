import React, { useState } from "react";
import Modal from "../modal/Modal";
import { Input } from "../input/Input";
import { TextArea } from "../textArea/TextArea";
import { Checkbox } from "../checkbox/Checkbox";
import FontAwesomeIcon from "../../fontAwesomeIcon/FontAwesomeIcon";
import HtmlInputComponent from "../input/HtmlInputComponent";

const TextModuleModal = ({ isActive, setIsActive, handleTextModule, textModuleType }) => {

    const [inputValue, setInputValue] = useState({
        introductionText: '',
        finalText: '',
        emailText: '',
        emailTextRecurring: '',
        emailSubjectRecurring: '',
        emailSubjectCN: '',
        emailTextCN: '',
    })

    console.log(inputValue)
    const handleInputChange = (name, value) => {
        setInputValue((prevInputValue) => ({
            ...prevInputValue,
            [name]: value
        }));
    }

    return (
        <div className="send-email-modal-wrapper">
            <Modal
                isActive={isActive}
                setIsAcive={setIsActive}
                title={'Text Modules'}
                onSubmit={handleTextModule}
                submitBtnName={"Save"}
                isBig
            >
                {/* sub title */}
                <div className="columns m-b-5 modal-form no-margin-left no-margin-right no-margin-top">
                    <div className="column is-4">
                        <div className="field">
                            <div className="title is-5 no-margin-bottom">{textModuleType ? textModuleType : ''}</div>
                            <label>{`Set your default texts for ${textModuleType} here`}</label>
                        </div>
                    </div>
                </div>

                {/* Introduction text*/}
                <div className="columns is-multiline m-b-5 no-margin-left no-margin-right m-b-15">
                    <div className="column is-4">
                        <div className="field m-t-35">
                            <h3 className="title is-5 is-thin">Introduction text</h3>
                        </div>
                    </div>
                    <div className="column is-8">
                        <div className="field">
                            <HtmlInputComponent
                                name='introductionText'
                                className={"textarea text-module-input"}
                                value={inputValue.introductionText}
                                onChange={(value) => handleInputChange('introductionText', value)}
                            />
                            {/* <ErrorText
                                visible={error.prefix}
                                text={error.prefix}
                            /> */}

                        </div>
                    </div>
                </div>
                {/* Final text*/}
                <div className="columns is-multiline m-b-5 no-margin-left no-margin-right m-b-15">
                    <div className="column is-4">
                        <div className="field m-t-35">
                            <h3 className="title is-5 is-thin">Final text</h3>
                        </div>
                    </div>
                    <div className="column is-8">
                        <div className="field">
                            <HtmlInputComponent
                                className={"textarea text-module-input"}
                                name='finalText'
                                value={inputValue.finalText}
                                onChange={(value) => handleInputChange('finalText', value)}
                            />
                            {/* <ErrorText
                                visible={error.prefix}
                                text={error.prefix}
                            /> */}

                        </div>
                    </div>
                </div>
                {/* Emails*/}
                <div className="columns is-multiline m-b-5 no-margin-left no-margin-right m-b-15">
                    <div className="column is-4">
                        <div className="field m-t-35">
                            <h3 className="title is-5 is-thin">Emails</h3>
                        </div>
                    </div>
                    <div className="column is-8">
                        <div className="field">
                            <HtmlInputComponent
                                name='introductionText'
                                className={"textarea text-module-input"}
                                value={inputValue.emailText}
                                onChange={(value) => handleInputChange('emailText', value)}
                            />
                            {/* <ErrorText
                                visible={error.prefix}
                                text={error.prefix}
                            /> */}

                        </div>
                    </div>
                </div>
                {/* Email subject for automatic recurring invoicing*/}
                <div className="columns is-multiline m-b-5 no-margin-left no-margin-right m-b-15">
                    <div className="column is-4">
                        <div className="field m-t-35">
                            <h3 className="title is-5 is-thin">Email subject for automatic recurring invoicing</h3>
                        </div>
                    </div>
                    <div className="column is-8">
                        <div className="field">
                            <HtmlInputComponent
                                className={"textarea text-module-input"}
                                name='finalText'
                                value={inputValue.emailSubjectRecurring}
                                onChange={(value) => handleInputChange('emailSubjectRecurring', value)}
                            />
                            {/* <ErrorText
                                visible={error.prefix}
                                text={error.prefix}
                            /> */}

                        </div>
                    </div>
                </div>
                {/* Email text for automatic recurring invoicing*/}
                <div className="columns is-multiline m-b-5 no-margin-left no-margin-right m-b-15">
                    <div className="column is-4">
                        <div className="field m-t-35">
                            <h3 className="title is-5 is-thin">Email text for automatic recurring invoicing</h3>
                        </div>
                    </div>
                    <div className="column is-8">
                        <div className="field">
                            <HtmlInputComponent
                                className={"textarea text-module-input"}
                                name='finalText'
                                value={inputValue.emailTextRecurring}
                                onChange={(value) => handleInputChange('emailTextRecurring', value)}
                            />
                            {/* <ErrorText
                                visible={error.prefix}
                                text={error.prefix}
                            /> */}

                        </div>
                    </div>
                </div>
                {/* Email subject for credit notes*/}
                <div className="columns is-multiline m-b-5 no-margin-left no-margin-right m-b-15">
                    <div className="column is-4">
                        <div className="field m-t-35">
                            <h3 className="title is-5 is-thin">Email subject for credit notes</h3>
                        </div>
                    </div>
                    <div className="column is-8">
                        <div className="field">
                            <HtmlInputComponent
                                className={"textarea text-module-input"}
                                name='finalText'
                                value={inputValue.emailSubjectCN}
                                onChange={(value) => handleInputChange('emailSubjectCN', value)}
                            />
                            {/* <ErrorText
                                visible={error.prefix}
                                text={error.prefix}
                            /> */}

                        </div>
                    </div>
                </div>
                {/* Email text for credit notes*/}
                <div className="columns is-multiline m-b-5 no-margin-left no-margin-right m-b-15">
                    <div className="column is-4">
                        <div className="field m-t-35">
                            <h3 className="title is-5 is-thin">Email text for credit notes</h3>
                        </div>
                    </div>
                    <div className="column is-8">
                        <div className="field">
                            <HtmlInputComponent
                                className={"textarea text-module-input"}
                                name='finalText'
                                value={inputValue.emailTextCN}
                                onChange={(value) => handleInputChange('emailTextCN', value)}
                            />
                            {/* <ErrorText
                                visible={error.prefix}
                                text={error.prefix}
                            /> */}

                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    );
};

export default TextModuleModal;
