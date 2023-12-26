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

const LeadOverview = () => {
  const actions = [
    { name: "Edit", icon: "edit" },
    { name: "Delete", icon: "trash-alt" },
    { name: "Convert to Deal", icon: "trash-alt" },
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
      title="Leads Overview"
      titleIsBreadCrumb
      breadCrumbData={["Home", "CRM", "Leads"]}
      titleActionContent={
        <Button
          onClick={() =>
            navigate("/crm/createForm", {
              state: {
                title: "Create Lead",
                api: "Create lead api",
                infoTitle: "Lead Info",
              },
            })
          }
          isSuccess
        >
          Create Lead
        </Button>
      }
    >
      <ListAdvancedComponent
        onActionClick={handleActionClick}
        columnDefs={[
          {
            field: "kind",
            headerName: "label",
            cellRenderer: (evt) => {
              return getCompanyPersonIcon(evt.value, 20, true);
            },
            filter: false,
            flex: 1.5,
          },

          { field: "leadName", headerName: "Lead Name" },
          { field: "activity", headerName: "Activity" },
          { field: "phoneNumber", headerName: "Phone" },
          { field: "email", headerName: "E-mail" },

          {
            field: "source",
            headerName: "Source",
            valueFormatter: (evt) => {
              return evt.value;
            },
          },
          { field: "owner", headerName: "Owner" },
        ]}
        fetchUrl={config.resourceUrls.customers}
        actionMenuData={actions}
      />
    </PageContent>
  );
};

export default LeadOverview;
