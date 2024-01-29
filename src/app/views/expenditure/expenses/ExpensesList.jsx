import moment from "moment"
import config from "../../../../../config"
import { ListAdvancedComponent } from "../../../shared/components/list-advanced/ListAdvancedComponent"
import PageContent from "../../../shared/components/pageContent/PageContent"
import { ListAdvancedDefaultSettings } from "../../../helpers/constants";
import { formatCurrency } from "../../../helpers/formatCurrency";
import { CustomShowHeaderSum } from "../../../shared/components/list-advanced/CustomShowHeaderSum";
import Modal from "../../../shared/components/modal/Modal";
import { useState } from "react";
import groflexService from "../../../services/groflex.service";

// TODO: filter select
// TODO: remove settings button
const ExpensesList = () => {
  let [isDeleteModalActive, setIsDeleteModalActive] = useState(false)
  let [deletingRowAndParams, setDeletingRowAndParams] = useState()

  let [isCancelModalActive, setIsCancelModalActive] = useState(false)
  let [cancellingRowAndParams, setCancellingRowAndParams] = useState()
  let [cancellationReason, setCancellationReason] = useState("")

  return <PageContent
    breadCrumbData={["Home", "Expenditure", "Expenses"]}
    titleIsBreadCrumb
    title="Expenses"
    titleIcon="DollarSign">
      <ListAdvancedComponent
        fetchUrl={config.resourceUrls.expenses}
        columnDefs={[
          {
            field: "date",
            headerName: "Recipient Date",
            valueFormatter: ({ value }) => moment(value).format("DD/MM/YYYY")
          },
          {
            field: "customerData",
            headerName: "Payee",
            valueFormatter: ({ value }) => value.companyName
          },
          {
            field: "type",
            headerName: "Type",
            valueFormatter: ({ value }) => capitalize(value)
          },
          {
            field: "status",
            headerName: "Status",
            cellRenderer: Status
          },
          {
            field: "payKind",
            headerName: "Payment Type",
            valueFormatter: ({ value, data }) => data.status === "cancelled" ? "Cancelled" : capitalize(value)
          },
          {
            field: "date",
            headerName: "Due since",
            valueFormatter: ({ value }) => moment(new Date()).diff(moment(value), "days") + " days"
          },
          {
            field: "totalGross",
            headerName: "Total Gross",
            cellClass: ListAdvancedDefaultSettings.EXCEL_STYLE_IDS.Currency,
            valueFormatter: ({ value }) => formatCurrency(value),
            headerComponent: CustomShowHeaderSum,
            headerComponentParams: { value: "totalGross", headerName: "Total Gross" }
          }
        ]}
        actionMenuData={[
          { name: "Edit", icon: "edit" },
          { name: "Copy and Edit", icon: "copy" },
          { name: "Cancel Expense", icon: "ban" },
          { name: "Delete", icon: "trash-alt" },
        ]}
        onActionClick={(action, row, params) => {
          switch (action.name) {
            case "Edit":
              navigate(`/expense/edit/${row.id}`);
              break;
            case "Copy and Edit":
              // TODO
              break;
            case "Cancel Expense":
              setIsCancelModalActive(true)
              setCancellingRowAndParams([row, params])
              break;
            case "Delete":
              setIsDeleteModalActive(true)
              setDeletingRowAndParams([row, params])
              break;
          }
        }}/>
    <Modal
      isActive={isCancelModalActive}
      setIsAcive={setIsCancelModalActive}
      title="Cancel Expense"
      submitBtnName="Cancel"
      cancelBtnName="Close"
      onSubmit={() => {
        // TODO: I don't know how to pass body in groflexService.request
        // TODO: I don't know how to update ag-grid row to mark it as cancelled
        setIsCancelModalActive(false)
      }}>
        <div className="field">
          <label className="label">Cancellation Reason (optional)</label>
          <div className="control">
            <textarea className="textarea" value={cancellationReason} onChange={e => setCancellationReason(e.target.value)}/>
          </div>
        </div>
    </Modal>
    <Modal
      isActive={isDeleteModalActive}
      setIsAcive={setIsDeleteModalActive}
      title="Delete Expense"
      submitBtnName="Delete"
      onSubmit={() => {
        let [row, params] = deletingRowAndParams
        groflexService
        .request(`${config.resourceUrls.expense}${row.id}`, {
          auth: true,
          method: "DELETE",
        })
        .then((res) => {
          if (!res?.body?.message) { // TODO better check
            params.api.applyTransaction({ remove: [row] });
          }
          setIsDeleteModalActive(false)
        });
      }}>
        Do you really want to delete this expense? This process cannot be undone.
    </Modal>
  </PageContent>
}
export default ExpensesList

const Status = ({ value }) => {
  let color = 
    value === "open" ? "#0071CA" :
    value === "paid" ? "#00A353" :
    value === "cancelled" ? "#888787" :
    undefined

  return <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
    <div style={{ height: 10, width: 10, borderRadius: "50%", backgroundColor: color }}/>
    <div>{capitalize(value)}</div>
  </div>
}

const capitalize = text =>
  text[0].toUpperCase() + text.slice(1)