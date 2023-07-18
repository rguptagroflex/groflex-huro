import React, { createContext, useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ListPaginationComponent } from "./ListPaginationComponent";
import { ListSearchComponent } from "./ListSearchComponent";
import { ListHeadbarControls } from "./ListHeadbarControls";
import ListActionPopup from "./ListActionPopup";
import "./ListAdvanced.style.scss";
import groflexService from "../../../services/groflex.service";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export const GridApiContext = createContext();

export const ListAdvancedComponent = ({
  columnDefs,
  onActionClick,
  actionMenuData,
  fetchUrl,
}) => {
  const [gridApi, setGridApi] = useState();
  const [gridColumnApi, setGridColumnApi] = useState();
  const [isFiltered, setIsFiltered] = useState(false);
  const [additionalColumns, setAdditionalColumns] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [visibleColumnCheckedState, setVisibleColumnCheckedState] = useState(
    {}
  );

  const customActionCellRenderer = (params) => {
    return (
      <ListActionPopup
        actionItems={params.data.actionItems}
        onActionClick={onActionClick}
        actionData={params.data}
      />
    );
  };

  const actionColumn = {
    headerName: "",
    cellRenderer: customActionCellRenderer,
    flex: 1,
    resizable: false,
    cellStyle: { textAlign: "center", overflow: "visible" },
  };

  const checkboxSelection = {
    checkboxSelection: true,
    headerCheckboxSelection: true,
    flex: 1,
  };

  const gridOptions = {
    columnDefs: [checkboxSelection, ...columnDefs, actionColumn],
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: true,
      flex: 2,
      cellStyle: {
        whiteSpace: "normal",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    animateRows: true,
    rowSelection: "multiple",
    rowMultiSelectWithClick: true,
    suppressRowTransform: true,
    suppressRowClickSelection: true,
    pagination: true,
    suppressPaginationPanel: true,
  };

  const components = {
    customActionCellRenderer: ListActionPopup,
  };

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    // fetch("http://localhost:18000/serverconnect", fetchBody)
    //   .then((res) => res.json())
    groflexService
      .request(fetchUrl, { auth: true })
      .then((res) => res.body.data)
      .then((res) => {
        // console.log(res, "LIST ADVANCED RESPONSE");
        const newColumns = Object.keys(res[0]).filter(
          (col) => !params.columnApi.getColumn(col)
        );
        setAdditionalColumns(newColumns);

        const visibleColumns = params.columnApi
          .getColumns()
          .filter((col) => !col.getColDef().hide)
          .map((col) => col.getColId());
        setVisibleColumns(visibleColumns);

        const initialVisibleColumnState = visibleColumns.reduce(
          (acc, column) => ({ ...acc, [column]: true }),
          {}
        );
        setVisibleColumnCheckedState(initialVisibleColumnState);

        return res;
      })
      .then((res) => {
        res.forEach((row) => {
          row.actionItems = actionMenuData;
        });

        return res;
      })
      .then((res) => {
        params.api.applyTransaction({ add: res });
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  const onFilterChanged = (params) => {
    setIsFiltered(params.api.isAnyFilterPresent());
  };

  return (
    <GridApiContext.Provider
      value={{
        gridApi,
        gridColumnApi,
        additionalColumns,
        visibleColumns,
        visibleColumnCheckedState,
        setVisibleColumnCheckedState,
      }}
    >
      <div className="list-container">
        <div className="list-container__sub-header">
          <ListSearchComponent />

          <ListHeadbarControls isFiltered={isFiltered} />
        </div>

        <div className="my-grid-container ag-theme-alpine">
          <AgGridReact
            gridOptions={gridOptions}
            components={components}
            onGridReady={onGridReady}
            onFilterChanged={onFilterChanged}
          />
        </div>
      </div>

      <div>
        <ListPaginationComponent />
      </div>
    </GridApiContext.Provider>
  );
};
