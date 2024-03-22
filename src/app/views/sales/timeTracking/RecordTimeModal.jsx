import React, { useEffect, useState } from "react";
import Modal from "../../../shared/components/modal/Modal";
import oldConfig from "../../../../../oldConfig";
import groflexService from "../../../services/groflex.service";
import { SelectInput } from "../../../shared/components/select/SelectInput";
import DateInput from "../../../shared/components/datePicker/DateInput";
import moment from "moment";
import { Input } from "../../../shared/components/input/Input";
import { formatCurrency } from "../../../helpers/formatCurrency";
import { TextArea } from "../../../shared/components/textArea/TextArea";
import TimeInput from "../../../shared/components/timePicker/TimeInput";
import { useNavigate } from "react-router-dom";

const RecordTimeModal = ({
  recordTimeModalVisible,
  setRecordTimeModalVisible,
  title = "Reccord Time",
}) => {
  const navigate = useNavigate();
  const [customerDropDownValues, setCustomerDropDownValues] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [recordTimeFormData, setRecordTimeFormData] = useState({
    customer: "",
    hoursMin: "",
    hourlyRate: "",
    type: "",
    jobDescription: "",
  });
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
    fetchCustomers();
  }, []);
  const fetchCustomers = () => {
    let customerDropDown = [];
    groflexService
      .request(`${oldConfig.getAllCustomers}?type=customer&search=%27*%27`, {
        auth: true,
      })
      .then((res) => {
        res.body.data.forEach((item) => {
          customerDropDown.push({ label: item.name, value: item.id });
        });

        setCustomerDropDownValues(customerDropDown);
      });
  };

  const handleSave = () => {
    const numberOfHours = moment.duration(toTime.diff(fromTime)).asHours();
    const durationInMinutes = numberOfHours * 60;

    const priceTotal = recordTimeFormData.hourlyRate * numberOfHours;
    const payload = {
      durationInMinutes: durationInMinutes,
      startDate: moment(
        moment(selectedDate).format("YYYY-MM-DD") +
          " " +
          moment(fromTime).format("HH:mm")
      ).toJSON(),
      endDate: moment(
        moment(selectedDate).format("YYYY-MM-DD") +
          " " +
          moment(toTime).format("HH:mm")
      ).toJSON(),
      pricePerHour: recordTimeFormData.hourlyRate,
      taskDescription: recordTimeFormData.jobDescription,
      priceTotal: priceTotal,
      timeType: recordTimeFormData.type,
      customer: recordTimeFormData.customer,
    };
    groflexService
      .request(`${oldConfig.timetracking.resourceUrl}`, {
        auth: true,
        method: "POST",
        data: payload,
      })
      .then((res) => {
        if (res.body.data.id) {
          navigate(
            `/sales/time-sheets/billed/customer/${recordTimeFormData.customer.id}/open`
          );
          setRecordTimeModalVisible(false);

          groflexService.toast.success("Time recorded");
        } else {
          groflexService.toast.error("Something went wrong");
          setRecordTimeModalVisible(false);
        }
      });
  };
  const handleCustomerChange = (option) => {
    setSelectedCustomer(option.value);
    setRecordTimeFormData({
      ...recordTimeFormData,
      customer: { id: option.value, name: option.label },
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

  const handleHourMinChange = (e) => {
    setRecordTimeFormData({
      ...recordTimeFormData,
      hoursMin: e.target.value,
    });
  };

  return (
    <Modal
      title={title}
      isActive={recordTimeModalVisible}
      setIsAcive={setRecordTimeModalVisible}
      isBig
      onSubmit={handleSave}
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
                value={selectedCustomer}
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
              recordTimeFormData.type === "fromDateTime_toDateTime" ? "4" : "6"
            }`}
          >
            <div className="field">
              <label>Type</label>
              <SelectInput
                options={[
                  { label: "From - To", value: "fromDateTime_toDateTime" },
                  { label: "Hours / Min", value: "hourMin" },
                ]}
                placeholder={"None"}
                onChange={handleTypeChange}
                value={recordTimeFormData.type}
              />
            </div>
          </div>
          {recordTimeFormData.type === "fromDateTime_toDateTime" ? (
            <>
              <div className="column is-4">
                <div className="field">
                  <label>From</label>

                  <TimeInput
                    ampm={false}
                    value={moment(fromTime)}
                    onChange={setFromTime}
                    size={"small"}
                  />
                </div>
              </div>
              <div className="column is-4">
                <div className="field">
                  <label>To</label>
                  <TimeInput
                    ampm={false}
                    value={moment(toTime)}
                    onChange={setToTime}
                    size={"small"}
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
                  type={"number"}
                  value={recordTimeFormData.hoursMin}
                  min="0"
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
