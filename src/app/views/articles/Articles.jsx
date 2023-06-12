import React from "react";
import PageContent from "../../shared/components/pageContent/PageContent";
import { ListAdvancedComponent } from "../../shared/components/list-advanced/ListAdvancedComponent";
import { formatCurrency } from "../../helpers/formatCurrency";
import { ListAdvancedDefaultSettings } from "../../helpers/constants";
import { CustomShowHeaderSum } from "../../shared/components/list-advanced/CustomShowHeaderSum";
import config from "../../../../config";

const actions = [
  { name: "Edit", icon: "edit" },
  { name: "Delete", icon: "trash-alt" },
];

const Articles = () => {
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
        fetchUrl={config.resourceUrls.articles}
        actionMenuData={actions}
        onActionClick={() => {}}
      />
    </PageContent>
  );
};

export default Articles;
