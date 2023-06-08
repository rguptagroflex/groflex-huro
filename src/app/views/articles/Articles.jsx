import React, { useEffect } from "react";
import PageContent from "../../shared/components/pageContent/PageContent";
import { ListAdvancedComponent } from "../../shared/components/list-advanced/ListAdvancedComponent";
import { formatCurrency } from "../../helpers/formatCurrency";
import { ListAdvancedDefaultSettings } from "../../helpers/constants";
import { CustomShowHeaderSum } from "../../shared/components/list-advanced/CustomShowHeaderSum";
import config from "../../../../config";
import { useSelector } from "react-redux";
import groflexService from "../../services/groflex.service";

const actions = [
  { name: "Edit", icon: "edit" },
  { name: "Delete", icon: "trash-alt" },
];

const Articles = () => {
  const loginToken = useSelector((state) => state?.accountData?.loginToken);
  console.log(loginToken, "FROM ARTICLES");

  useEffect(() => {
    groflexService
      .request(
        `${config.resourceHost}article?offset=0&searchText=&limit=9999999&orderBy=number&desc=false`,
        { auth: true }
      )
      .then((res) => console.log(res));
  });

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
              Authorization: "Bearer " + loginToken,
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
