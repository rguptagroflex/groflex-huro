import { useState } from "react"
import config from "../../../../../config";
import { ListAdvancedDefaultSettings } from "../../../helpers/constants";
import { formatCurrency } from "../../../helpers/formatCurrency";
import { CustomShowHeaderSum } from "../../../shared/components/list-advanced/CustomShowHeaderSum";
import { ListAdvancedComponent } from "../../../shared/components/list-advanced/ListAdvancedComponent";
import PageContent from "../../../shared/components/pageContent/PageContent";
import moment from "moment"
import Modal from "../../../shared/components/modal/Modal";
import groflexService from "../../../services/groflex.service";
import toastService from "../../../services/toast.service";

const CreditNotesList = () => {
  let [isDeletingModalActive, setIsDeletingModalActive] = useState(false)
  let [deletingRowAndParams, setDeletingRowAndParams] = useState()

  return <PageContent title="Credit Notes">
    <ListAdvancedComponent
      fetchUrl={config.resourceUrls.cancellation}
      columnDefs={[
        {
          field: "number",
          headerName: "Number"
        },
        {
          field: "customerData",
          headerName: "Customer Name",
          valueFormatter: ({ value }) => value.name
        },
        {
          field: "date",
          headerName: "Date Created",
          valueFormatter: ({ value }) => moment(value).format("DD-MM-YYYY")
        },
        {
          field: "totalGross",
          headerName: "Amount Credited",
          cellClass: ListAdvancedDefaultSettings.EXCEL_STYLE_IDS.Currency,
          valueFormatter: ({ value }) => formatCurrency(value),
          headerComponent: CustomShowHeaderSum,
          headerComponentParams: { value: "totalGross", headerName: "Amount Credited" }
        },
        {
          field: "refundType",
          headerName: "Refund Type",
          valueFormatter: ({ value }) => capitalize(value)
        }
      ]}
      actionMenuData={[
        { name: "Delete", icon: "trash-alt" }
      ]}
      onActionClick={(action, row, params) => {
        switch (action.name) {
          case "Delete":
            setDeletingRowAndParams([row, params])
            setIsDeletingModalActive(true)
            break;
        }
      }}/>
      <Modal
        isActive={isDeletingModalActive}
        setIsAcive={setIsDeletingModalActive}
        submitBtnName="Delete"
        title="Delete invoice"
        onSubmit={() => {
          let [row, params] = deletingRowAndParams

          // TODO: this doesn't work
          groflexService
            .request(`${config.resourceUrls.invoice}${row.id}`, {
              auth: true,
              method: "DELETE",
            })
            .then((res) => {
              if (!res?.body?.message) { // TODO better check
                params.api.applyTransaction({ remove: [row] });
              } else {
                toastService.error("Something went wrong")
              }
              setIsDeletingModalActive(false)
            })
        }}>
          Do you really want to delete the invoice? This cannot be undone!
      </Modal>
  </PageContent>
}
export default CreditNotesList

const capitalize = text =>
  text[0].toUpperCase() + text.slice(1)