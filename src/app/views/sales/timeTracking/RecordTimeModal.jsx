import React, { useEffect, useState } from "react";
import Modal from "../../../shared/components/modal/Modal";
import config from "../../../../../oldConfig";
import groflexService from "../../../services/groflex.service";
import { SelectInput } from "../../../shared/components/select/SelectInput";
import DateInput from "../../../shared/components/datePicker/DateInput";
import moment from "moment";
import { Input } from "../../../shared/components/input/Input";
import { formatCurrency } from "../../../helpers/formatCurrency";
import { TextArea } from "../../../shared/components/textArea/TextArea";

const RecordTimeModal = ({
  recordTimeModalVisible,
  setRecordTimeModalVisible,
  title = "Reccord Time",
}) => {
  const [customerDropDownValues, setCustomerDropDownValues] = useState([]);
  const [recordTimeFormData, setRecordTimeFormData] = useState({
    customer: "",
    hoursMin: "",
    hourlyRate: "",
    type: "",
    jobDescription: "",
    from: "",
    to: "",
  });
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
    fetchCustomers();
  }, []);
  const fetchCustomers = () => {
    let customerDropDown = [];
    groflexService
      .request(`${config.getAllCustomers}?type=customer&search=%27*%27`, {
        auth: true,
      })
      .then((res) => {
        res.body.data.forEach((item) => {
          customerDropDown.push({ label: item.name, value: item.id });
        });

        setCustomerDropDownValues(customerDropDown);
      });
  };
  const handleCustomerChange = (option) => {
    setRecordTimeFormData({
      ...recordTimeFormData,
      customer: option.value,
    });
  };
  const handleHorulyRateChange = (e) => {
    setRecordTimeFormData({
      ...recordTimeFormData,
      hourlyRate: e.target.value,
    });
  };

  const handleTypeChange = (option) => {
    setRecordTimeFormData({
      ...recordTimeFormData,
      type: option.value,
    });
  };

  const handleJobDescriptionChange = (e) => {
    setRecordTimeFormData({
      ...recordTimeFormData,
      jobDescription: e.target.value,
    });
  };

  const handleFromChange = (e) => {
    setRecordTimeFormData({
      ...recordTimeFormData,
      from: e.target.value,
    });
  };
  const handleToChange = (e) => {
    setRecordTimeFormData({
      ...recordTimeFormData,
      to: e.target.value,
    });
  };

  const handleHourMinChange = (e) => {
    setRecordTimeFormData({
      ...recordTimeFormData,
      hoursMin: e.target.value,
    });
  };
  console.log(recordTimeFormData);

  //   console.log(selectedDate.toJSON());
  return (
    <Modal
      title={title}
      isActive={recordTimeModalVisible}
      setIsAcive={setRecordTimeModalVisible}
      isBig
    >
      <div className="record-time-main">
        <div className="columns is-multiline">
          <div className="column is-4">
            <div className="field">
              <label>Customers</label>
              <SelectInput
                options={customerDropDownValues}
                placeholder={"None"}
                onChange={handleCustomerChange}
                value={recordTimeFormData.customer}
              />
            </div>
          </div>
          <div className="column is-4">
            <div className="field">
              <label>Choose Date</label>
              <DateInput
                selectedDate={moment(selectedDate)}
                onDateChange={setSelectedDate}
              />
            </div>
          </div>
          <div className="column is-4">
            <div className="field">
              <label>Hourly rate</label>
              <Input
                onChange={handleHorulyRateChange}
                placeholder={"None"}
                type={"number"}
                value={recordTimeFormData.hourlyRate}
              />
            </div>
          </div>
        </div>

        <div className="columns is-multiline">
          <div
            className={`column is-${
              recordTimeFormData.type === "fromTo" ? "4" : "6"
            }`}
          >
            <div className="field">
              <label>Type</label>
              <SelectInput
                options={[
                  { label: "From - To", value: "fromTo" },
                  { label: "Hours / Min", value: "hourMin" },
                ]}
                placeholder={"None"}
                onChange={handleTypeChange}
                value={recordTimeFormData.type}
              />
            </div>
          </div>
          {recordTimeFormData.type === "fromTo" ? (
            <>
              <div className="column is-4">
                <div className="field">
                  <label>From</label>
                  <Input
                    onChange={handleFromChange}
                    placeholder={"None"}
                    type={"text"}
                    value={recordTimeFormData.from}
                  />
                </div>
              </div>
              <div className="column is-4">
                <div className="field">
                  <label>To</label>
                  <Input
                    onChange={handleToChange}
                    placeholder={"None"}
                    type={"text"}
                    value={recordTimeFormData.to}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="column is-6">
              <div className="field">
                <label>Hours / Min</label>
                <Input
                  onChange={handleHourMinChange}
                  placeholder={"None"}
                  type={"text"}
                  value={recordTimeFormData.hoursMin}
                />
              </div>
            </div>
          )}
        </div>

        <div className="columns is-mutliline">
          <div className="column is-12">
            <div className="field">
              <label>Job description</label>
              <TextArea
                rows={3}
                placeholder=""
                onChange={handleJobDescriptionChange}
                value={recordTimeFormData.jobDescription}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RecordTimeModal;
