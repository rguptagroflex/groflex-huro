import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import { Input } from "../input/Input";
import { TextArea } from "../textArea/TextArea";
import { Checkbox } from "../checkbox/Checkbox";
import FontAwesomeIcon from "../../fontAwesomeIcon/FontAwesomeIcon";
import HtmlInputComponent from "../input/HtmlInputComponent";
import config from "../../../../../newConfig";
import GroflexService from '../../../services/groflex.service';
import LoaderSpinner from "../loaderSpinner/LoaderSpinner";

const TextModuleModal = ({ isActive, setIsActive, handleTextModule, textModuleType, isLoading }) => {

    const [invoice, setInvoice] = useState({
        id: '',
        introduction: '',
        email: '',
        emailSubject: '',
        conclusion: ''
    })
    const [cancellation, setCancellation] = useState({
        id: '',
        introduction: '',
        email: '',
        emailSubject: '',
        conclusion: ''
    })
    const [offer, setOffer] = useState({
        id: '',
        introduction: '',
        email: '',
        emailSubject: '',
        conclusion: ''
    })
    const [posReceipt, setPosReceipt] = useState({
        id: '',
        introduction: '',
        email: '',
        emailSubject: '',
        conclusion: ''
    })
    const [purchaseOrder, setPurchaseOrder] = useState({
        id: '',
        introduction: '',
        email: '',
        emailSubject: '',
        conclusion: ''
    })
    const [recurringInvoice, setRecurringInvoice] = useState({
        id: '',
        introduction: '',
        email: '',
        emailSubject: '',
        conclusion: ''
    })

    const handleInvoiceChange = (name, value) => {
        setInvoice((preState) => ({
            ...preState,
            [name]: value
        }));
    };
    const handlePosChange = (name, value) => {
        setPosReceipt((preState) => ({
            ...preState,
            [name]: value
        }));
    };
    const handleRecurringChange = (name, value) => {
        setRecurringInvoice((preState) => ({
            ...preState,
            [name]: value
        }));
    };
    const handleCancellationChange = (name, value) => {
        setCancellation((preState) => ({
            ...preState,
            [name]: value
        }));
    };
    const handleOfferChange = (name, value) => {
        setOffer((preState) => ({
            ...preState,
            [name]: value
        }));
    };

    // get text module data
    const fetchTextModuleData = () => {
        GroflexService.request(`${config.resourceUrls.textModule}`, {
            method: "GET",
            auth: true,
        })
            .then(async (response) => {
                const responseData = response.body.data;
                if (responseData.hasOwnProperty('invoice')) {
                    let invoiceData = responseData['invoice']
                    setInvoice(prevState => ({
                        ...prevState,
                        id: invoiceData.id,
                        introduction: invoiceData.introduction,
                        email: invoiceData.email,
                        emailSubject: invoiceData.emailSubject,
                        conclusion: invoiceData.conclusion
                    }));
                }
                if (responseData.hasOwnProperty('recurringInvoice')) {
                    let recurringInvoiceData = responseData['recurringInvoice']
                    setRecurringInvoice(prevState => ({
                        ...prevState,
                        id: recurringInvoiceData.id,
                        introduction: recurringInvoiceData.introduction,
                        email: recurringInvoiceData.email,
                        emailSubject: recurringInvoiceData.emailSubject,
                        conclusion: recurringInvoiceData.conclusion
                    }));
                }
                if (responseData.hasOwnProperty('cancellation')) {
                    let CNData = responseData['cancellation']
                    setCancellation(prevState => ({
                        ...prevState,
                        id: CNData.id,
                        introduction: CNData.introduction,
                        email: CNData.email,
                        emailSubject: CNData.emailSubject,
                        conclusion: CNData.conclusion
                    }));
                }
                if (responseData.hasOwnProperty('posReceipt')) {
                    let posData = responseData['posReceipt']
                    setPosReceipt(prevState => ({
                        ...prevState,
                        id: posData.id,
                        introduction: posData.introduction,
                        email: posData.email,
                        emailSubject: posData.emailSubject,
                        conclusion: posData.conclusion
                    }));
                }
                if (responseData.hasOwnProperty('offer')) {
                    let offerData = responseData['offer']
                    setOffer(prevState => ({
                        ...prevState,
                        id: offerData.id,
                        introduction: offerData.introduction,
                        email: offerData.email,
                        emailSubject: offerData.emailSubject,
                        conclusion: offerData.conclusion
                    }));
                }
                if (responseData.hasOwnProperty('purchaseOrder')) {
                    let purchaseData = responseData['purchaseOrder']
                    setPurchaseOrder(prevState => ({
                        ...prevState,
                        id: purchaseData.id,
                        introduction: purchaseData.introduction,
                        email: purchaseData.email,
                        emailSubject: purchaseData.emailSubject,
                        conclusion: purchaseData.conclusion
                    }));
                }

            })
            .catch((error) => {
                console.error("Error fetching contact:", error);
            });
    };

    useEffect(() => {
        if (textModuleType) {
            fetchTextModuleData();
        }
    }, [textModuleType]);

    const handleSaveButton = () => {

        let textModuleData = [
            invoice,
            cancellation,
            offer,
            posReceipt,
            purchaseOrder,
            recurringInvoice
        ]

        handleTextModule(textModuleData)
    }

    return (
        <div className="send-email-modal-wrapper">
            <Modal
                isActive={isActive}
                setIsAcive={setIsActive}
                title={'Text Modules'}
                onSubmit={handleSaveButton}
                submitBtnName={"Save"}
                isBig
            >
                <LoaderSpinner
                    visible={isLoading}
                    message={"Wait..."}
                    size="50"
                />
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
                                value={invoice.introduction}
                                onChange={(value) => handleInvoiceChange('introduction', value)}
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
                                value={invoice.conclusion}
                                onChange={(value) => handleInvoiceChange('conclusion', value)}
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
                                className={"textarea text-module-input"}
                                value={invoice.email}
                                onChange={(value) => handleInvoiceChange('email', value)}
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
                                value={recurringInvoice.emailSubject}
                                onChange={(value) => handleRecurringChange('emailSubject', value)}
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
                                value={recurringInvoice.email}
                                onChange={(value) => handleRecurringChange('email', value)}
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
                                value={cancellation.emailSubject}
                                onChange={(value) => handleCancellationChange('emailSubject', value)}
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
                                value={cancellation.email}
                                onChange={(value) => handleCancellationChange('email', value)}
                            />
                            {/* <ErrorText
                                visible={error.prefix}
                                text={error.prefix}
                            /> */}

                        </div>
                    </div>
                </div>

                {textModuleType && textModuleType == 'invoice' ?
                    <>
                        {/* sub title */}
                        <div className="columns m-b-5 modal-form no-margin-left no-margin-right no-margin-top">
                            <div className="column is-12">
                                <div className="field">
                                    <div className="title is-5 no-margin-bottom">{'POS Receipt'}</div>
                                    <label>{`Set your default texts for POS receipt here`}</label>
                                </div>
                            </div>
                        </div>

                        {/* Terms & Conditions*/}
                        <div className="columns is-multiline m-b-5 no-margin-left no-margin-right m-b-15">
                            <div className="column is-4">
                                <div className="field m-t-35">
                                    <h3 className="title is-5 is-thin">Terms & Conditions</h3>
                                </div>
                            </div>
                            <div className="column is-8">
                                <div className="field">
                                    <HtmlInputComponent
                                        className={"textarea text-module-input"}
                                        name='finalText'
                                        value={posReceipt.introduction}
                                        onChange={(value) => handlePosChange('introduction', value)}
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
                                        value={posReceipt.conclusion}
                                        onChange={(value) => handlePosChange('conclusion', value)}
                                    />
                                    {/* <ErrorText
                            visible={error.prefix}
                            text={error.prefix}
                        /> */}

                                </div>
                            </div>
                        </div>

                        {/* emails*/}
                        <div className="columns is-multiline m-b-5 no-margin-left no-margin-right m-b-15">
                            <div className="column is-4">
                                <div className="field m-t-35">
                                    <h3 className="title is-5 is-thin">Emails</h3>
                                </div>
                            </div>
                            <div className="column is-8">
                                <div className="field">
                                    <HtmlInputComponent
                                        className={"textarea text-module-input"}
                                        value={posReceipt.email}
                                        onChange={(value) => handlePosChange('email', value)}
                                    />
                                    {/* <ErrorText
                            visible={error.prefix}
                            text={error.prefix}
                        /> */}

                                </div>
                            </div>
                        </div>
                    </>

                    : ''

                }

            </Modal>
        </div>
    );
};

export default TextModuleModal;
