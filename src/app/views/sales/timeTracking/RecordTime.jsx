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
import { useNavigate, useParams } from "react-router-dom";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import { Button } from "../../../shared/components/button/Button";

const RecordTime = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (trackId) {
      fetchTimeTrack();
    }
  }, []);

  const fetchTimeTrack = () => {
    groflexService
      .request(`${oldConfig.timetracking.resourceUrl}/${trackId}`, {
        auth: true,
      })
      .then((res) => {
        const response = res.body.data;

        setSelectedCustomer(response.customer.id);
        setSelectedDate(moment(response.startDate));
        setRecordTimeFormData({
          hourlyRate: response.pricePerHour,
          type: response.timeType,
          jobDescription: response.taskDescription,
          customer: response.customer,
        });
        setToTime(moment(response.endDate));
        setFromTime(moment(response.startDate));
        setLoading(false);
      });
  };

  const handleSave = () => {
    const method = trackId ? "PUT" : "POST";
    const numberOfHours = recordTimeFormData.hoursMin
      ? recordTimeFormData.hoursMin
      : moment.duration(toTime.diff(fromTime)).asHours();
    const durationInMinutes = numberOfHours * 60;

    const priceTotal = recordTimeFormData.hourlyRate * numberOfHours;
    const payload = trackId
      ? {
          customerId: recordTimeFormData.customer.id,
          customerName: recordTimeFormData.customer.name,
          id: trackId,
          status: "open",
          durationInMinutes: durationInMinutes,
          startDate: recordTimeFormData.hoursMin
            ? selectedDate.toJSON()
            : moment(
                moment(selectedDate).format("YYYY-MM-DD") +
                  " " +
                  moment(fromTime).format("HH:mm")
              ).toJSON(),
          endDate: recordTimeFormData.hoursMin
            ? selectedDate.toJSON()
            : moment(
                moment(selectedDate).format("YYYY-MM-DD") +
                  " " +
                  moment(toTime).format("HH:mm")
              ).toJSON(),
          pricePerHour: recordTimeFormData.hourlyRate,
          taskDescription: recordTimeFormData.jobDescription,
          priceTotal: priceTotal,
          timeType: recordTimeFormData.type,
          customer: recordTimeFormData.customer,
        }
      : {
          durationInMinutes: durationInMinutes,
          startDate: recordTimeFormData.hoursMin
            ? selectedDate.toJSON()
            : moment(
                moment(selectedDate).format("YYYY-MM-DD") +
                  " " +
                  moment(fromTime).format("HH:mm")
              ).toJSON(),
          endDate: recordTimeFormData.hoursMin
            ? selectedDate.toJSON()
            : moment(
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

    const url = trackId
      ? `${oldConfig.timetracking.resourceUrl}/${trackId}`
      : `${oldConfig.timetracking.resourceUrl}`;
    groflexService
      .request(url, {
        auth: true,
        method: method,
        data: payload,
      })
      .then((res) => {
        if (res.body.data.id) {
          navigate(
            `/sales/time-sheets/billed/customer/${recordTimeFormData.customer.id}/open`
          );

          if (trackId) {
            groflexService.toast.success("Time record updated successfully");
          } else {
            groflexService.toast.success("Time recorded");
          }
        } else {
          groflexService.toast.error("Something went wrong");
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
  const handleSaveDisable = () => {
    if (
      recordTimeFormData.customer &&
      recordTimeFormData.hourlyRate &&
      recordTimeFormData.type &&
      selectedDate &&
      recordTimeFormData.jobDescription
    ) {
      if (recordTimeFormData.type === "h:mm") {
        if (recordTimeFormData.hoursMin) {
          return false;
        } else {
          return true;
        }
      }
      if (recordTimeFormData.type === "fromDateTime_toDateTime") {
        if (toTime && fromTime) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return true;
    }
  };

  return (
    <PageContent
      loading={trackId && loading}
      title={trackId ? "Edit recorded time" : "Record Time"}
      titleActionContent={
        <Button onClick={handleSave} isSuccess isDisabled={handleSaveDisable()}>
          Save
        </Button>
      }
    >
      <AdvancedCard type={"s-card"}>
        <div className="record-time-main">
          <div className="columns is-multiline">
            <div className="column is-6">
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
            <div className="column is-3">
              <div className="field">
                <label>Choose Date</label>
                <div className="field">
                  <DateInput
                    selectedDate={moment(selectedDate)}
                    onDateChange={setSelectedDate}
                  />
                </div>
              </div>
            </div>
            <div className="column is-3">
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
                recordTimeFormData.type === "fromDateTime_toDateTime"
                  ? "6"
                  : "6"
              }`}
            >
              <div className="field">
                <label>Type</label>
                <SelectInput
                  options={[
                    { label: "From - To", value: "fromDateTime_toDateTime" },
                    { label: "Hours / Min", value: "h:mm" },
                  ]}
                  placeholder={"None"}
                  onChange={handleTypeChange}
                  value={recordTimeFormData.type}
                />
              </div>
            </div>
            {recordTimeFormData.type === "fromDateTime_toDateTime" ? (
              <>
                <div className="column is-3">
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
                <div className="column is-3">
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
      </AdvancedCard>
    </PageContent>
  );
};

export default RecordTime;
