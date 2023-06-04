import React from "react";
import PageContent from "../../shared/components/pageContent/PageContent";
import { ListAdvancedComponent } from "../../shared/components/list-advanced/ListAdvancedComponent";
import { formatCurrency } from "../../helpers/formatCurrency";
import { ListAdvancedDefaultSettings } from "../../helpers/constants";
import { CustomShowHeaderSum } from "../../shared/components/list-advanced/CustomShowHeaderSum";

const Articles = () => {
  const actions = [
    { name: "Edit", icon: "edit" },
    { name: "Delete", icon: "trash-alt" },
  ];

  return (
    <PageContent
      title="Articles"
      titleIsBreadCrumb
      breadCrumbData={["hello", "world"]}
    >
      <ListAdvancedComponent
        columnDefs={[
          {
            field: "number",
            headerName: "No.",
          },
          { field: "title", headerName: "Article Name" },
          {
            field: "mrp",
            headerName: "MRP",
            cellClass: ListAdvancedDefaultSettings.EXCEL_STYLE_IDS.Currency,
            valueFormatter: (evt) => {
              return formatCurrency(evt.value);
            },
            headerComponent: CustomShowHeaderSum,
            headerComponentParams: { value: "mrp", headerName: "MRP" },
          },
          { field: "category", headerName: "Category" },
          { field: "eanNo", headerName: "EAN" },
          { field: "sku", headerName: "SKU" },
          {
            field: "purchasePrice",
            headerName: "Purchase Price (NET)",
            valueFormatter: (evt) => {
              return formatCurrency(evt.value);
            },
          },
          {
            field: "price",
            headerName: "Sales Price (NET)",
            valueFormatter: (evt) => {
              return formatCurrency(evt.value);
            },
          },
        ]}
        fetchBody={{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method: "GET",
            url: "https://dev.groflex.in/api/article?offset=0&searchText=&limit=9999999&orderBy=number&desc=false",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo1MTYsInRlbmFudCI6NDM4LCJjbGllbnRMYW5ndWFnZSI6IkVOIiwic2Vzc2lvbklkIjo2OTk0LCJpYXQiOjE2ODQzMDk0ODEsImV4cCI6MTY4NDMzMTA4MX0.jcpLey7WEJoybrChj6FHzXQylEBf0VA4h_jYMRV-WjE",
              "Content-Type": "application/json",
            },
          }),
        }}
        actionMenuData={actions}
        onActionClick={() => {}}
      />
    </PageContent>
  );
};

export default Articles;
