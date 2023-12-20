import React, { useState } from "react";
import PageContent from "../../shared/components/pageContent/PageContent";
import { ListAdvancedComponent } from "../../shared/components/list-advanced/ListAdvancedComponent";
import { formatCurrency } from "../../helpers/formatCurrency";
import {
  ListAdvancedDefaultSettings,
  customerTypes,
} from "../../helpers/constants";
import { CustomShowHeaderSum } from "../../shared/components/list-advanced/CustomShowHeaderSum";
import config from "../../../../config";
import groflexService from "../../services/groflex.service";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/components/button/Button";
import { isNil } from "../../helpers/isNil";
const getCompanyPersonIcon = (
  value,
  personIconWidth,
  blankContactPersonIcon,
  isMainContact
) => {
  const masterDetailArrowClass =
    !isNil(isMainContact) && isMainContact.toString() === "false" ? "grey" : "";

  return value === customerTypes.PERSON ? (
    `<span class="icon-user-wrapper"><img src="/assets/images/svg/user.svg" width="${personIconWidth}" /></span>`
  ) : value === ListAdvancedDefaultSettings.CUSTOMER_TYPE_CONTACTPERSON ? (
    blankContactPersonIcon ? (
      ""
    ) : (
      `<span class="icon icon-arrow_right2 master-detail-arrow ${masterDetailArrowClass}"></span>`
    )
  ) : (
    <i style={{ color: "#00A353" }} className={"fas fa-building"}></i>
  );
};

const Crm = () => {
  const actions = [
    { name: "Edit", icon: "edit" },
    { name: "Delete", icon: "trash-alt" },
  ];
  const navigate = useNavigate();
  const handleActionClick = (action, rowData) => {
    if (rowData) {
      if (action.name === "Edit") {
        if (rowData.id) {
          setSelectedContact(rowData.id);
          const previousData = { ...rowData };
          setPreviousData(previousData);
          navigate(`/contacts-edit/${rowData.id}`, {
            state: { previousData },
          });
        } else {
          console.log("Invalid rowData:", rowData);
        }
      } else if (action.name === "Delete") {
        // Implement delete functionality
      }
    } else {
      console.log("Invalid rowData:", rowData);
    }
  };

  return (
    <PageContent
      title="Crm"
      titleIsBreadCrumb
      breadCrumbData={["Home", "Crm"]}
      titleActionContent={
        <Button
          onClick={() =>
            navigate("/crm/crmCreateForm", {
              state: {
                title: "Create Contact",
                api: "Create contact api",
                infoTitle: "Contact Info",
              },
            })
          }
          isSuccess
        >
          Create new contact
        </Button>
      }
    >
      <ListAdvancedComponent
        onActionClick={handleActionClick}
        columnDefs={[
          { field: "number", headerName: "No.", filter: false },
          {
            field: "kind",
            headerName: "Type",
            cellRenderer: (evt) => {
              return getCompanyPersonIcon(evt.value, 20, true);
            },
            filter: false,
            flex: 1.5,
          },

          { field: "customerName", headerName: "Customer Name" },
          { field: "companyName", headerName: "Company Name" },
          { field: "email", headerName: "E-mail" },
          { field: "phoneNumber", headerName: "Phone" },
          {
            field: "closedDeals",
            headerName: "Closed Deals",
            valueFormatter: (evt) => {
              return evt.value;
            },
          },
          {
            field: "openDeals",
            headerName: "openDeals",
            valueFormatter: (evt) => {
              return evt.value;
            },
          },
          {
            field: "nextActivityDate",
            headerName: "Next Activity Date",
            valueFormatter: (evt) => {
              return evt.value;
            },
          },
          { field: "contactOwner", headerName: "Contact Owner" },
        ]}
        fetchUrl={config.resourceUrls.customers}
        actionMenuData={actions}
      />
    </PageContent>
  );
};

export default Crm;
