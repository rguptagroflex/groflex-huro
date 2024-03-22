import React from "react";
import Modal from "../../../shared/components/modal/Modal";
import moment from "moment";
import { formatCurrency } from "../../../helpers/formatCurrency";
import groflexService from "../../../services/groflex.service";
import oldConfig from "../../../../../oldConfig";
import { useNavigate } from "react-router-dom";

const DeleteRecordedTimeModal = ({
  isDeleteModalVisible,
  setIsDeleteModalVisible,
  rowData,
}) => {
  const handleDelete = () => {
    groflexService
      .request(`${oldConfig.timetracking.resourceUrl}/${rowData.id}`, {
        auth: true,
        method: "DELETE",
      })
      .then((res) => {
        if (res) {
          groflexService.toast.success("Track record deleted successfully");
          setIsDeleteModalVisible(false);
        } else {
          groflexService.toast.error("Something went wrong");
          setIsDeleteModalVisible(false);
        }
      });
  };
  return (
    <Modal
      isActive={isDeleteModalVisible}
      setIsAcive={setIsDeleteModalVisible}
      title={"Delete captured time"}
      onSubmit={handleDelete}
    >
      <div className="timesheet-billing-delete-modal-main">
        <h2>
          Do you really want to delete the recorded time? This cannot be undone!
        </h2>
        <ul>
          <li>
            <b>Customer</b>
            <span>{rowData?.customer?.name}</span>
          </li>
          <li>
            <b>Date</b>
            <span>{moment(rowData?.startDate).format("DD-MM-YYYY")}</span>
          </li>
          <li>
            <b>Duration</b>
            <span>{rowData?.trackedTimeString}</span>
          </li>
          <li>
            <b>Total amount</b>
            <span>{formatCurrency(rowData?.priceTotal)}</span>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default DeleteRecordedTimeModal;
