import React from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import config from "../../../../../config";
import { ListAdvancedComponent } from "../../../shared/components/list-advanced/ListAdvancedComponent";
import moment from "moment"
import { ListAdvancedDefaultSettings } from "../../../helpers/constants";
import { formatCurrency } from "../../../helpers/formatCurrency";
import { CustomShowHeaderSum } from "../../../shared/components/list-advanced/CustomShowHeaderSum";
import { useNavigate } from "react-router-dom";
import groflexService from "../../../services/groflex.service";
import { Button } from "../../../shared/components/button/Button";
import { FeatherIcon } from "../../../shared/featherIcon/FeatherIcon";

// Filter by date remaining
// Settings remaining
const InvoicesList = () => {
  const navigate = useNavigate();

  return <PageContent
    breadCrumbData={["Home", "Sales", "Invoices"]}
    title="Invoices"
    titleActionContent={<div style={{ display: "flex", gap: 16 }}>
      <Button onClick={() => navigate("/invoice/new")} isSuccess>
        Create Invoice
      </Button>
    </div>}>
      <ListAdvancedComponent
        fetchUrl={config.resourceUrls.invoices}
        columnDefs={[
          { field: "number", headerName: "Number" },
          {
            field: "date",
            headerName: "Date",
            valueFormatter: ({ value }) => moment(value).format("DD/MM/YYYY")
          },
          {
            field: "customerData",
            headerName: "Customer",
            valueFormatter: ({ value }) => value.companyName
          },
          {
            field: "state",
            headerName: "Status",
            cellRenderer: Status
          },
          {
            field: "dueToDate",
            headerName: "Due Date",
            valueFormatter: ({ value }) => moment(value).format("DD/MM/YYYY")
          },
          {
            field: "totalGross",
            headerName: "Total Gross",
            cellClass: ListAdvancedDefaultSettings.EXCEL_STYLE_IDS.Currency,
            valueFormatter: ({ value }) => formatCurrency(value),
            headerComponent: CustomShowHeaderSum,
            headerComponentParams: { value: "totalGross", headerName: "Total Gross" }
          },
          {
            field: "outstandingAmount",
            headerName: "Outstanding Balance",
            cellClass: ListAdvancedDefaultSettings.EXCEL_STYLE_IDS.Currency,
            valueFormatter: ({ value }) => formatCurrency(value),
            headerComponent: CustomShowHeaderSum,
            headerComponentParams: { value: "outstandingAmount", headerName: "Outstanding Balance" }
          },
          {
            field: "type",
            headerName: "Type",
            valueFormatter: ({ value }) =>
              value === "invoice" ? "Invoice" : 
              value === "recurringInvoice" ? "Recurring Invoice" :
              value === "pos_receipt" ? "Pos Receipt" :
              undefined
          }
        ]}
        onRowClicked={(e) => {
          navigate(`/invoice/${e.data.id}`);
        }}
        actionMenuData={[
          { name: "Edit", icon: "edit" },
          { name: "Delete", icon: "trash-alt" },
        ]}
        onActionClick={(action, row, params) => {
          switch (action.name) {
            case "Delete":
              groflexService
                .request(`${config.resourceUrls.invoice}${row.id}`, {
                  auth: true,
                  method: "DELETE",
                })
                .then((res) => {
                  if (!res?.body?.message) { // TODO better check
                    params.api.applyTransaction({ remove: [row] });
                  }
                });
              break;
            case "Edit":
              navigate(`/invoice/edit/${row.id}`);
              break;
          }
        }}/>
  </PageContent>;
};

export default InvoicesList;

const Status = ({ value }) => {
  const icon = {
    color:
      value === "draft" ? "#888787" :
      value === "locked" ? "#00A353" :
      value === "dunned" ? "#D94339" :
      value === "partiallyPaid" ? "#FFAA2C" :
      value === "cancelled" ? "#000000" :
      value === "paid" ? "#00A353" :
      undefined,
    name: 
      value === "draft" ? "Edit" :
      value === "locked" ? "Clock" :
      value === "dunned" ? "AlertCircle" :
      value === "partiallyPaid" ? "Clock" :
      value === "cancelled" ? "MinusCircle" :
      value === "paid" ? "CheckCircle" :
      undefined
  }

  return <div style={{ display: "flex", alignItems: "center", gap: 10, width: "110px" }}>
    <FeatherIcon {...icon} size={20} style={{ flexShrink: 0 }} />
    <div style={{ color: "black" }}>{
      value === "locked" ? "Open" :
      value === "dunned" ? "Reminded" :
      value === "partiallyPaid" ? "Partially Paid" :
      capitalize(value)
    }</div>
  </div>
}

const capitalize = text =>
  text[0].toUpperCase() + text.slice(1)