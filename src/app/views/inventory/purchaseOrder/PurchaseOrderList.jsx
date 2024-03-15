import React from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";

import { ListAdvancedComponent } from "../../../shared/components/list-advanced/ListAdvancedComponent";
import { ListAdvancedDefaultSettings } from "../../../helpers/constants";
import {
  localeCompare,
  localeCompareNumeric,
} from "../../../helpers/sortComparators";
import { formatCurrency } from "../../../helpers/formatCurrency";
import moment from "moment";
import FontAwesomeIcon from "../../../shared/fontAwesomeIcon/FontAwesomeIcon";
import groflexService from "../../../services/groflex.service";
import { Button } from "../../../shared/components/button/Button";
import config from "../../../../../newConfig";

const actions = [
  { name: "Edit" },
  { name: "Copy and edit" },
  { name: "Delete" },
];
const createActivity = (params) => {
  let val = "";
  let iconColor = "";

  switch (params.value.toLowerCase()) {
    case "accepted":
      val = "Approved";
      iconColor = "#0071CA";
      break;
    case "draft":
      val = "Draft";
      iconColor = "#DDDDDD";
      break;
    case "cancelled":
      val = "Cancelled";
      iconColor = "#888787";
      break;
    case "paid":
      val = "Paid";
      iconColor = "#00A353";
      break;
    case "open":
      val = "Open";
      iconColor = "#00A353";
      break;
    default:
      iconColor = "#D94339";
      val = "Overdue";
      break;
  }
  return (
    <div className="quotations-status">
      <FontAwesomeIcon name={"circle"} size={11} color={iconColor} />
      {val}
    </div>
  );
};
const PurchaseOrderList = () => {
  const handleActionClick = (action, row, params) => {
    switch (action.name) {
      case "Delete":
        groflexService
          .request(`${config.resourceUrls.purchase}${row.id}`, {
            auth: true,
            method: "DELETE",
          })
          .then((res) => {
            if (res?.body?.message) {
              console.log(res, "Delete Failed");
            } else {
              params.api.applyTransaction({ remove: [row] });
              console.log(res, "Deleted Succesfullyyy");
            }
          });
        break;
      // case "Edit":
      //   navigate(`/purchase/edit/${row.id}`);;
    }
  };
  return (
    <PageContent
      title="Purchase Order List"
      titleActionContent={<Button isSuccess>Create Purchase Order</Button>}
    >
      <ListAdvancedComponent
        onActionClick={handleActionClick}
        columnDefs={[
          {
            headerName: "Number",
            field: "number",
            sort: "desc",
            minWidth: ListAdvancedDefaultSettings.COLUMN_MIN_WIDTH,
            cellRenderer: (evt) => {
              return evt.value === Infinity ? "" : evt.value;
            },
            comparator: localeCompareNumeric,
            cellClass: ListAdvancedDefaultSettings.EXCEL_STYLE_IDS.String,
            filter: "agNumberColumnFilter",
            filterParams: {
              suppressAndOrCondition: true,
            },
            customProps: {
              longName: "Purchase order number",
              convertNumberToTextFilterOnDemand: true,
            },
          },
          {
            headerName: "Payee",
            field: "customerData.name",
            minWidth: ListAdvancedDefaultSettings.COLUMN_MIN_WIDTH,
            comparator: localeCompare,
            filter: "agSetColumnFilter",
          },
          {
            headerName: "Status",
            field: "state",
            minWidth: ListAdvancedDefaultSettings.COLUMN_MIN_WIDTH,
            cellRenderer: createActivity,
          },
          {
            headerName: "Date",
            field: "date",
            filter: true,
            comparator: (date1, date2) =>
              dateCompareSort(date1, date2, config.dateFormat.client),
            cellRenderer: (evt) => {
              return moment(evt.value).format(config.dateFormat.client);
            },
          },
          {
            headerName: "Currency",
            field: "baseCurrency",
            minWidth: ListAdvancedDefaultSettings.COLUMN_MIN_WIDTH,
            comparator: localeCompare,
            hide: true,
            filterParams: {
              suppressMiniFilter: true,
            },
            valueFormatter: (evt) => {
              return evt.value === "" || evt.value === null ? "INR" : evt.value;
            },
          },
          {
            headerName: "Total gross",
            field: "totalGross",
            minWidth: ListAdvancedDefaultSettings.COLUMN_MIN_WIDTH,
            comparator: localeCompareNumeric,
            cellClass: ListAdvancedDefaultSettings.EXCEL_STYLE_IDS.Currency,
            valueFormatter: (evt) => {
              return formatCurrency(evt.value);
            },
            filter: "agNumberColumnFilter",
            filterParams: {
              suppressAndOrCondition: true,
            },
            customProps: {
              calculateHeaderSum: true,
            },
          },
        ]}
        fetchUrl={config.resourceUrls.purchase}
        actionMenuData={actions}
      />
    </PageContent>
  );
};

export default PurchaseOrderList;
