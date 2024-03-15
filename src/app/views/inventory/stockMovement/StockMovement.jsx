import moment from "moment";

import { ListAdvancedDefaultSettings } from "../../../helpers/constants";
import { formatCurrency } from "../../../helpers/formatCurrency";
import {
  localeCompare,
  localeCompareNumeric,
} from "../../../helpers/sortComparators";
import { Button } from "../../../shared/components/button/Button";
import { ListAdvancedComponent } from "../../../shared/components/list-advanced/ListAdvancedComponent";
import PageContent from "../../../shared/components/pageContent/PageContent";
import config from "../../../../../newConfig";

const actions = [{ name: "Delete entry" }];
const stocks = [
  {
    action: "outgoing",
    currentStock: 6,
    title: "vyu",
    historyStock: 6,
    id: 667,
    unit: "pcs",
    inventoryId: 284,
    itemModifiedDate: "2024-02-21T11:33:31.103Z",
    openingQuantity: 6,
    purchasePrice: 470.34,
    quantity: 6,
    source: "",
  },
  {
    action: "incoming",
    currentStock: 6,
    historyStock: 6,
    id: 668,
    title: "vyu",
    unit: "pcs",
    inventoryId: 284,
    itemModifiedDate: "2024-02-21T11:33:31.138Z",
    openingQuantity: 0,
    purchasePrice: 470.34,
    quantity: 0,
    source: "manual",
    value: 0,
  },
];
const StockMovement = () => {
  return (
    <PageContent
      title="Stock Movement"
      titleActionContent={<Button isSuccess>New Manual Entry</Button>}
    >
      <ListAdvancedComponent
        // onRowClicked={(e) => {
        //   navigate(`/article/${e.data.id}`);
        // }}
        //onActionClick={handleActionClick}
        columnDefs={[
          {
            field: "title",
            headerName: "Article Name",
          },
          {
            field: "itemModifiedDate",
            filter: true,
            comparator: (date1, date2) =>
              dateCompareSort(date1, date2, config.dateFormat.client),
            cellRenderer: (evt) => {
              return moment(evt.value).format(config.dateFormat.client);
            },
            headerName: "Date Modified",
          },
          {
            headerName: "Action",
            field: "action",
            minWidth: ListAdvancedDefaultSettings.COLUMN_MIN_WIDTH,
            cellStyle: () => {
              return { textTransform: "capitalize" };
            },
            cellRenderer: (evt) => {
              // return evt.value === undefined || evt.value === null ? `Opening balance` : evt.value;
              return evt.value;
            },
            comparator: localeCompare,
          },
          {
            headerName: "Quantity Moved",
            field: "openingQuantity",
            maxWidth: 200,
            comparator: localeCompareNumeric,
            // cellClass: ListAdvancedDefaultSettings.EXCEL_STYLE_IDS.Currency,
            cellRenderer: (evt) => {
              return evt.value === Infinity
                ? ""
                : evt.data.action === "incoming" || evt.data.action === null
                ? `+ ${evt.value} ${evt.data.unit}`
                : `- ${evt.value} ${evt.data.unit}`;
            },
            filter: "agNumberColumnFilter",
            filterParams: {
              suppressAndOrCondition: true,
            },
          },

          {
            field: "currentStock",
            headerName: "Historical Stock",
            maxWidth: 200,
            minWidth: ListAdvancedDefaultSettings.COLUMN_MIN_WIDTH,
            //width: getScaledValue(86, window.innerWidth, 1600),
            cellRenderer: (evt) => {
              return evt.value === Infinity
                ? ""
                : `${evt.value} ${evt.data.unit}`;
            },
            comparator: localeCompareNumeric,
            cellClass: ListAdvancedDefaultSettings.EXCEL_STYLE_IDS.String,
            filter: "agNumberColumnFilter",
            filterParams: {
              suppressAndOrCondition: true,
            },
            customProps: {
              longName: "Historical stock",
              convertNumberToTextFilterOnDemand: true,
            },
          },
          {
            maxWidth: 250,
            headerName: "Purchase Price",
            field: "purchasePrice",
            minWidth: ListAdvancedDefaultSettings.COLUMN_MIN_WIDTH,
            comparator: localeCompareNumeric,
            cellClass: ListAdvancedDefaultSettings.EXCEL_STYLE_IDS.Currency,
            valueFormatter: (evt) => {
              return formatCurrency(evt.value);
            },
            cellRenderer: (evt) => {
              //return evt.data.action === 'outgoing' ? null : formatCurrency(evt.value);
              return evt.data.action === `outgoing`
                ? null
                : formatCurrency(evt.value);
            },
            filter: "agNumberColumnFilter",
            filterParams: {
              suppressAndOrCondition: true,
            },
            cellStyle: (evt) => {
              return { textAlign: "left" };
            },
          },

          {
            headerName: "Purchase Value",
            field: "value",
            minWidth: ListAdvancedDefaultSettings.COLUMN_MIN_WIDTH,
            comparator: localeCompareNumeric,
            cellClass: ListAdvancedDefaultSettings.EXCEL_STYLE_IDS.Currency,
            cellRenderer: (evt) => {
              return evt.data.action === "outgoing"
                ? null
                : formatCurrency(
                    evt.data.openingQuantity * evt.data.purchasePrice
                  );
            },
            filter: "agNumberColumnFilter",
            filterParams: {
              suppressAndOrCondition: true,
            },
            cellStyle: (evt) => {
              return { textAlign: "left" };
            },
          },
          {
            field: "source",
            headerName: "Source",

            minWidth: ListAdvancedDefaultSettings.COLUMN_MIN_WIDTH,
            cellStyle: () => {
              return { textTransform: "capitalize" };
            },
            cellRenderer: (evt) => {
              const sourceValues =
                evt.value !== null ? evt.value.split(",") : [];
              if (sourceValues.length >= 2 && sourceValues !== null) {
                if (sourceValues[0] === "invoice") {
                  return `<a href=/${sourceValues[0]}/${sourceValues[2]}>${sourceValues[0]} ${sourceValues[1]}</a>`;
                } else if (sourceValues[0] === "expense") {
                  return `<a href=/${sourceValues[0]}/edit/${sourceValues[2]}>${sourceValues[0]} ${sourceValues[1]}</a>`;
                }
              } else if (sourceValues.length === 1 && evt.value === `manual`) {
                return `Manual`;
              } else {
                return `Opening Balance`;
              }
            },
          },
        ]}
        customRowData={stocks}
        actionMenuData={actions}
      />
    </PageContent>
  );
};

export default StockMovement;
