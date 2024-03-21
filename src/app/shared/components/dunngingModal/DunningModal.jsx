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
import { InputAddons } from "../inputAddons/InputAddons";

const DunningModal = ({ isActive, setIsActive, handleTextModule, textModuleType, isLoading }) => {

    const [dunningData, setDunningData] = useState([])

    // get dunning data
    const fetchDunningData = () => {
        GroflexService.request(`${config.resourceUrls.dunningLevel}`, {
            method: "GET",
            auth: true,
        })
            .then(async (response) => {
                const responseData = response.body.data;
                setDunningData(responseData)
            })
            .catch((error) => {
                console.error("Error fetching contact:", error);
            });
    };

    useEffect(() => {

        fetchDunningData();
    }, []);

    const handleSaveButton = () => {

        handleTextModule()
    }

    const [openModuleIndex, setOpenModuleIndex] = useState(-1);

    const handleToggleModule = (idx) => {
        setOpenModuleIndex(idx === openModuleIndex ? -1 : idx);
    };

    return (
        <div className="send-email-modal-wrapper">
            <Modal
                isActive={isActive}
                setIsAcive={setIsActive}
                title={'Dunning'}
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
                    <div className="column is-12">
                        <div className="field">
                            {/* <div className="title is-5 no-margin-bottom">{textModuleType ? textModuleType : ''}</div> */}
                            <label>{`To collect overdue payments, you can activate up to 4 dunning levels. You can define the number of days between each dunning level. Additionally, you can define the amount of the overdue fine and the text modules to be used in the dunning notice for each dunning level individually.`}</label>
                        </div>
                    </div>
                </div>

                {
                    dunningData.map((data, idx) => (
                        <div key={idx}>
                            {/* Propose creation*/}
                            <div className="columns is-multiline m-b-5 no-margin-left no-margin-right m-b-15">
                                <div className="column is-12">
                                    <div className="field">
                                        <div className="title is-5 no-margin-bottom">{`Activate dunning level for ${idx == 0 ? 'Payment' : idx} Payment reminder`}</div>
                                    </div>
                                </div>
                                <div className="column is-4">
                                    <div className="field">
                                        <h3 className="title is-5 is-thin">Propose creation</h3>
                                    </div>
                                </div>
                                <div className="column is-4">
                                    <div className="field">
                                        <InputAddons
                                            type="number"
                                            name="proposeCreation"
                                            placeholder=""
                                            defaultValue={data.daysTillAlert}
                                        // value={newNumberRange.startFrom}
                                        // onChange={handleInputChange}
                                        />
                                        {/* <ErrorText
                                visible={error.prefix}
                                text={error.prefix}
                            /> */}

                                    </div>
                                </div>
                                <div className="column is-4">
                                    <div className="field">
                                        <h3 className="title is-6 is-thin m-l-100">{`days after due date`}</h3>
                                        {/* <ErrorText
                                visible={error.prefix}
                                text={error.prefix}
                            /> */}

                                    </div>
                                </div>
                            </div>

                            {/* Overdue fines*/}
                            <div className="columns is-multiline m-b-5 no-margin-left no-margin-right m-b-15">
                                <div className="column is-4">
                                    <div className="field">
                                        <h3 className="title is-5 is-thin">Overdue fines</h3>
                                    </div>
                                </div>
                                <div className="column is-4">
                                    <div className="field">
                                        <InputAddons
                                            type="number"
                                            name="overDuesFines"
                                            placeholder=""
                                            defaultValue={data.charge}
                                        // value={newNumberRange.startFrom}
                                        // onChange={handleInputChange}
                                        />
                                        {/* <ErrorText
                                visible={error.prefix}
                                text={error.prefix}
                            /> */}

                                    </div>
                                </div>
                            </div>
                            {openModuleIndex === idx && (
                                <>
                                    <div className="column is-12">
                                        <div className="field">
                                            <label>Introduction text</label>
                                            <HtmlInputComponent
                                                name='introductionText'
                                                className={"textarea text-module-input"}
                                                value={data.introduction}
                                            // onChange={(value) => handleInvoiceChange('introduction', value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="column is-12">
                                        <div className="field">
                                            <label>Closing text</label>
                                            <HtmlInputComponent
                                                name='introductionText'
                                                className={"textarea text-module-input"}
                                                value={data.conclusion}
                                            // onChange={(value) => handleInvoiceChange('introduction', value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="column is-12 ">
                                        <div className="field">
                                            <label>Email dispatch</label>
                                            <HtmlInputComponent
                                                name='introductionText'
                                                className={"textarea text-module-input"}
                                                value={data.email}
                                            // onChange={(value) => handleInvoiceChange('introduction', value)}
                                            />
                                        </div>
                                    </div>
                                </>
                            )
                            }
                            {/* show text module*/}
                            <div className="columns is-multiline m-b-5 no-margin-left no-margin-right m-b-15">
                                <div className="column is-4">
                                    <div className="field">
                                        {/* <h3 className="title is-5 is-thin">Overdue fines</h3> */}
                                    </div>
                                </div>
                                <div className="column is-4">
                                    <div className="field">
                                        {/* <InputAddons
                                            type="number"
                                            name="overDuesFines"
                                            placeholder=""
                                        value={newNumberRange.startFrom}
                                        onChange={handleInputChange}
                                        /> */}
                                        {/* <ErrorText
                                visible={error.prefix}
                                text={error.prefix}
                            /> */}

                                    </div>
                                </div>
                                <div className="column is-4">
                                    <div className="field">
                                        <h3 className="title is-6 is-thin m-l-100" style={{ color: '#0071ca', cursor: 'pointer' }} onClick={() => handleToggleModule(idx)}>{openModuleIndex === idx ? `Hide text modules` : `Show text modules`}</h3>
                                    </div>
                                </div>
                            </div>


                        </div>
                    ))
                }

            </Modal>
        </div>
    );
};

export default DunningModal;
