import React, { useState } from "react";
import PageContent from "../../shared/components/pageContent/PageContent";
import { ListAdvancedComponent } from "../../shared/components/list-advanced/ListAdvancedComponent";
import { formatCurrency } from "../../helpers/formatCurrency";
import { ListAdvancedDefaultSettings } from "../../helpers/constants";
import { CustomShowHeaderSum } from "../../shared/components/list-advanced/CustomShowHeaderSum";
import config from "../../../../config";
import groflexService from "../../services/groflex.service";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/components/button/Button";

const actions = [
  { name: "Edit", icon: "edit" },
  { name: "Delete", icon: "trash-alt" },
];

const Articles = () => {
  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false);
  const handleActionClick = (action, row) => {
    console.log(row, "Row info dude");
    switch (action.name) {
      case "Delete":
        groflexService
          .request(`${config.resourceUrls.article}${row.id}`, {
            auth: true,
            method: "DELETE",
          })
          .then((res) => {
            if (!!res?.body?.name) {
              console.log(res, "Delete Failed");
            } else {
              console.log(res, "Delete Succesfull");
            }
          });
        break;
      case "Edit":
        navigate(`/article-edit/${row.id}`);
    }
  };

  return (
    <PageContent
      title="Articles"
      titleIsBreadCrumb
      breadCrumbData={["Home", "Articles"]}
      titleActionContent={
        <Button onClick={() => navigate("/create-article")} isSuccess>
          Create Article
        </Button>
      }
    >
      <ListAdvancedComponent
        onActionClick={handleActionClick}
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
      />
    </PageContent>
  );
};

export default Articles;
