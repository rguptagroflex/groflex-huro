import React, { useState, useEffect } from "react";
import PageContent from "../../shared/components/pageContent/PageContent";
import { ListAdvancedComponent } from "../../shared/components/list-advanced/ListAdvancedComponent";
import { formatCurrency } from "../../helpers/formatCurrency";
import {
  ListAdvancedDefaultSettings,
  customerTypes,
} from "../../helpers/constants";
import { isNil } from "../../helpers/isNil";
import config from "../../../../config";
import EditContact from "./EditContact";
import { useParams, useNavigate } from "react-router-dom";
import groflexService from "../../services/groflex.service";

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

const Contacts = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const navigate = useNavigate();
  const [previousData, setPreviousData] = useState(undefined);



  const actions = [
    { name: "Edit", icon: "edit" },
    { name: "Delete", icon: "trash-alt" },
  ];
  // const selectedContact = rowData.find((row) => row.id === selectedRow);
  // const handleActionClick = (action, rowData) => {

  //   if (action.name === "Edit") {
  //     console.log("rowData", rowData)
  //     // openEditContact(rowData)
  //     setSelectedContact(rowData);
  //     // // window.location.href = "/contacts-edit/:id;
  //     navigate(`/contacts-edit/${rowData.id}`);

  //   } else if (action.name === "Delete") {
  //     // Implement delete functionality
  //   }
  // };
  // useEffect(() => {
  //   console.log("selectedContact:", selectedContact);
  // }, [selectedContact]);

  const handleActionClick = (action, rowData) => {
    console.log("action:", action);
    console.log("rowData:", rowData);

    if (rowData) {
      if (action.name === "Edit") {
        if (rowData.id) {
          console.log("Selected Contact:", rowData.id)
          setSelectedContact(rowData.id);
          const previousData = { ...rowData };
          setPreviousData(previousData);

          console.log("rowDataaaaaaaaaaaa", rowData);
          console.log("previousDataaaaaaaaa", previousData);
          console.log("selectedContactttttt", selectedContact);

          console.log("previousDataaaaaaaaa", previousData);
          navigate(`/contacts-edit/${rowData.id}`, { state: { previousData } })
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
  useEffect(() => {
    if (previousData) {
      console.log("previousData:", previousData);
    }
  }, [previousData]);

  // useEffect(() => {
  //   // Fetch data or perform any other necessary operations
  //   // based on the selected contact
  //   console.log("selectedContact", selectedContact)
  //   if (selectedContact) {
  //     // Fetch additional data or perform operations here
  //     console.log("selectedContact", selectedContact)
  //   }
  // }, [selectedContact]);
  // const handleActionClick = (action, rowData) => {
  //   if (rowData) {
  //     if (action.name === "Edit") {
  //       if (rowData.id) {
  //         openEditContact(rowData, navigate);
  //       } else {
  //         console.log("Invalid rowData:", rowData);
  //       }
  //     } else if (action.name === "Delete") {
  //       // Implement delete functionality
  //     }
  //   } else {
  //     console.log("Invalid rowData:", rowData);
  //   }
  // };

  // In your ListAdvancedComponent component
  // const handleEditStatus =(contact)=> {

  //   groflexService.request(`${config.resourceUrls.contact}/${contact.id}`, {
  // 			auth: true,
  // 			method: "PUT",
  // 			data: { ...contact },
  // 		})
  // 		.then((res) => {
  // 			this.setState({ ...this.state, refreshData: !this.state.refreshData });
  // 		});
  // }

  // const openEditContact = (contact) => {

  //   const handleEditData = async (editedData) => {
  //     try {
  //       await groflexService.request(`${config.resourceUrls.contact}/${contact.id}`, {
  //         auth: true,
  //         method: "PUT",
  //         data: { ...editedData },
  //       });

  //       // Refresh the data or perform any necessary actions
  //       navigate(`/contacts-edit/${contact.id}`); // Replace "/desired-page" with the actual path to the desired page
  //     } catch (error) {
  //       console.log("Error editing contact:", error);
  //     }
  //   };

  //   // navigate(`/contacts-edit/${contact.id}`);
  //   return <EditContact onConfirm={handleEditData} previousData={contact} />
  // };



  // const handleActionClick = (action, rowData) => {
  //   if (rowData) {
  //     if (action && action.name === "Edit") {
  //       if (rowData && rowData.id) {
  //         setSelectedContact(rowData);
  //         navigate(`/contacts-edit/${rowData.id}`);
  //       } else {
  //         console.log("Invalid rowData:", rowData);
  //       }
  //     } else if (action && action.name === "Delete") {
  //       // Implement delete functionality
  //     }
  //   }
  //   else {
  //     console.log("rowData:", rowData);
  //     console.log("rowData.id:", rowData.id);
  //   }
  // };


  // Inside your ListAdvancedComponent component, where you call handleActionClick
  // onClick={() => handleActionClick(action, rowData)}




  return (
    <PageContent title="Contacts">

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
          {
            field: "type",
            headerName: "Contact Type",
            cellRenderer: (evt) => {
              return evt.data.type === `customer` ? `Customer` : `Payee`;
            },
          },
          { field: "name", headerName: "Name" },
          {
            field: "outstandingAmount",
            headerName: "Outstanding Amount",
            valueFormatter: (evt) => {
              return formatCurrency(evt.value);
            },
          },
          { field: "address.street", headerName: "Address" },
          { field: "email", headerName: "E-mail" },
          { field: "phone1", headerName: "Telephone" },
          { field: "mobile", headerName: "Mobile" },
          { field: "category", headerName: "Category" },
          { field: "address.gstNumber", headerName: "GST Number" },
        ]}
        fetchUrl={config.resourceUrls.customers}
        actionMenuData={actions}
      />
     

    </PageContent>
  );
};

export default Contacts;
