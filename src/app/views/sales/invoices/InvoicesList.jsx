import React, { useEffect } from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { useNavigate } from "react-router-dom";
import config from "../../../../../config";
import { ListAdvancedDefaultSettings } from "../../../helpers/constants";
import { CustomShowHeaderSum } from "../../../shared/components/list-advanced/CustomShowHeaderSum";
import { ListAdvancedComponent } from "../../../shared/components/list-advanced/ListAdvancedComponent";
import { formatCurrency } from "../../../helpers/formatCurrency";
import { Button } from "../../../shared/components/button/Button";
import { FeatherIcon } from "../../../shared/featherIcon/FeatherIcon";

import {
  dateCompareSort,
  localeCompare,
  localeCompareNumeric,
} from "../../../helpers/sortComparators";
import groflexService from "../../../services/groflex.service";
import FontAwesomeIcon from "../../../shared/fontAwesomeIcon/FontAwesomeIcon";
const actions = [
  { name: "edit", icon: "edit" },
  { name: "delete", icon: "trash-alt" },
];

const type = (params) => {
  let res = "";
  switch (params.value) {
    case "recurringInvoice":
      res = "Recurring invoice";
      break;
    case "invoice":
      res = "Invoice";
      break;
    default:
      res = "default";
  }
  return <>{res}</>;
};

const createActivity = (params) => {
  let val = "";
  let iconColor = "";

  switch (params.value.toLowerCase()) {
    case "locked":
      iconColor = "#0071CA";
      val = "Open";
      break;
    case "draft":
      val = "Draft";
      iconColor = "#F2F2F2";
      break;
    default:
      iconColor = "#d94339";
      break;
  }

  return (
    <div className="invoices-status">
      <FontAwesomeIcon
        name={"circle"}
        size={11}
        color={iconColor}
        // style={{
        //   display: "inline-block",
        // }}
      />
      {val}
    </div>
  );
};

const InvoicesList = () => {
  const navigate = useNavigate();
  const handleActionClick = (action, row, params) => {
    switch (action.name) {
      case "Delete":
        groflexService
          .request(`${config.resourceUrls.quotation}${row.id}`, {
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
      //   navigate(`/article/edit/${row.id}`);
    }
  };
  return (
    <PageContent
      title="Invoices List"
      titleActionContent={<Button isSuccess>Create Invoices</Button>}
    >
      <ListAdvancedComponent
        // onRowClicked={(e) => {
        //   navigate(`/article/${e.data.id}`);
        // }}
        onActionClick={handleActionClick}
        columnDefs={[
          {
            field: "state",
            headerName: "status",
            cellRenderer: createActivity,
          },
          { field: "customerData.name", headerName: "Customer Name" },
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
              console.log(
                evt.value === "" || evt.value === null ? "INR" : evt.value
              );
              return evt.value === "" || evt.value === null ? "INR" : evt.value;
            },
          },
          {
            headerName: "Date created",
            field: "date",
            filter: true,
            comparator: (date1, date2) =>
              dateCompareSort(date1, date2, config.dateFormat.client),
          },

          {
            field: "dueToDate",
            filter: true,
            comparator: (date1, date2) =>
              dateCompareSort(date1, date2, config.dateFormat.client),
            headerName: "Due Date",
          },
          {
            field: "dueSince",
            comparator: localeCompareNumeric,
            filter: "agNumberColumnFilter",
            filterParams: {
              suppressAndOrCondition: true,
            },
            valueFormatter: (evt) => {
              return evt.value ? evt.value + " days" : "";
            },
            headerName: "Due Since",
          },

          {
            field: "totalGross",
            headerName: "Total Gross",
            cellClass: ListAdvancedDefaultSettings.EXCEL_STYLE_IDS.Currency,
            valueFormatter: (evt) => {
              return formatCurrency(evt.value);
            },
            headerComponent: CustomShowHeaderSum,
            headerComponentParams: { value: "totalGross", headerName: "Total Gross" },
          },
          {
            field: "outstandingAmount",
            headerName: "Outstanding",
            cellClass: ListAdvancedDefaultSettings.EXCEL_STYLE_IDS.Currency,
            valueFormatter: (evt) => {
              return formatCurrency(evt.value);
            },
            headerComponent: CustomShowHeaderSum,
            headerComponentParams: {
              value: "outstandingAmount",
              headerName: "outstanding",
            },
          },
          {
            field: "type",
            headerName: "type",
            cellRenderer: type,
            minWidth: 150,
          },
        ]}
        fetchUrl={config.resourceUrls.invoices}
        actionMenuData={actions}
      />
    </PageContent>
  );
};

export default InvoicesList;
