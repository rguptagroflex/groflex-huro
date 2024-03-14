import React, { useEffect } from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { ListAdvancedComponent } from "../../../shared/components/list-advanced/ListAdvancedComponent";
import oldConfig from "../../../../../oldConfig";
import Timetracking from "../../../models/timetracking.model";
import FontAwesomeIcon from "../../../shared/fontAwesomeIcon/FontAwesomeIcon";
import { formatCurrency } from "../../../helpers/formatCurrency";
import { ListAdvancedDefaultSettings } from "../../../helpers/constants";
import { CustomShowHeaderSum } from "../../../shared/components/list-advanced/CustomShowHeaderSum";
import { useNavigate } from "react-router-dom";

const TimesheetsList = () => {
  const navigate = useNavigate();
  const handleActionClick = () => {};
  const actions = [
    { name: "Edit", icon: "edit" },
    { name: "Delete", icon: "trash-alt" },
    { name: "Convert to Deal", icon: "trash-alt" },
  ];

  const getStatusIcon = (evt) => {
    let icon = "";
    let text = "";
    switch (evt.value) {
      case "invoiced":
        text = "Invoiced";
        icon = (
          <FontAwesomeIcon name={"file-invoice"} size={15} color="black" />
        );
        break;
      case "open":
        text = "Open";
        icon = <FontAwesomeIcon name={"credit-card"} size={15} color="black" />;
        break;
    }
    return (
      <div>
        <span>{icon}</span>
        <span>{text}</span>
      </div>
    );
  };
  return (
    <PageContent title="Timesheets List">
      <ListAdvancedComponent
        onRowClicked={(e) => {
          navigate(
            `/sales/time-sheets/billed/customer/${e.data.customerId}/${e.data.status}`
          );
        }}
        onActionClick={handleActionClick}
        columnDefs={[
          {
            field: "customerId",
            headerName: "Customer No",
            // cellRenderer: createLabel,
          },

          {
            field: "status",
            headerName: "Status",
            cellRenderer: (evt) => getStatusIcon(evt),
          },
          {
            field: "customerName",
            headerName: "Customer",
            // cellRenderer: createActivity,
          },
          {
            field: "rowCount",
            headerName: "Expenses",
            cellRenderer: (evt) => {
              return evt.data.displayEffort;
            },
          },
          {
            field: "durationInMinutes",
            headerName: "Duration",
            valueGetter: (evt) => {
              return evt.data.trackedTimeString;
            },
          },

          {
            field: "priceTotal",
            headerName: "Amount",
            cellClass: ListAdvancedDefaultSettings.EXCEL_STYLE_IDS.Currency,
            valueFormatter: ({ value }) => formatCurrency(value),
            valueFormatter: (evt) => {
              return formatCurrency(evt.value);
            },
            headerComponent: CustomShowHeaderSum,
            headerComponentParams: {
              value: "priceTotal",
              headerName: "Amount",
            },
          },
        ]}
        responseDataMapFunc={(timetrackings) => {
          const result = timetrackings.map((timetracking) => {
            return new Timetracking(timetracking);
          });

          return result;
        }}
        fetchUrl={`${oldConfig.timetracking.resourceUrl}?offset=0&searchText=&limit=9999999&orderBy=customerName&desc=true&filter=default`}
        actionMenuData={actions}
      />
    </PageContent>
  );
};

export default TimesheetsList;
