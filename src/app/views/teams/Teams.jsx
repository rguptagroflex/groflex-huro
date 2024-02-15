import React, { useState } from "react";
import PageContent from "../../shared/components/pageContent/PageContent";
import { Button } from "../../shared/components/button/Button";
import { ListAdvancedComponent } from "../../shared/components/list-advanced/ListAdvancedComponent";
import { useNavigate } from "react-router-dom";
import config from "../../../../config";
import InviteCaModal from "./InviteCaModal";
import InviteNewUserModal from "./InviteNewUserModal";
const actions = [
  { name: "Edit", icon: "edit" },
  { name: "Delete", icon: "trash-alt" },
];
const Teams = () => {
  const [isCaModalVisible, setIsCaModalVisible] = useState(false);
  const [isNewUserModalVisible, setIsNewUserModalVisible] = useState(false);
  const navigate = useNavigate();
  const createTopbarButtons = () => {
    return (
      <div className="task-overview-buttons">
        <Button onClick={() => setIsCaModalVisible(true)} isSuccess>
          Invite CA
        </Button>
        <Button onClick={() => setIsNewUserModalVisible(true)} isSuccess>
          Invite New User
        </Button>
      </div>
    );
  };
  const handleActionClick = (action, row, params) => {
    switch (action.name) {
      case "Delete":
        groflexService
          .request(`${config.resourceUrls.article}${row.id}`, {
            auth: true,
            method: "DELETE",
          })
          .then((res) => {
            if (res?.body?.message) {
              console.log(res, "Delete Failed");
            } else {
              params.api.applyTransaction({ remove: [row] });
              console.log(res, "Deleted Succesfullyyy");
            }
          });
        break;
      case "Edit":
        navigate(`/article/edit/${row.id}`);
    }
  };
  return (
    <PageContent
      title="Teams"
      titleIsBreadCrumb
      breadCrumbData={["Home", "Teams"]}
      titleActionContent={createTopbarButtons()}
    >
      <ListAdvancedComponent
        onRowClicked={(e) => {}}
        onActionClick={handleActionClick}
        columnDefs={[
          {
            field: "firstName",
            headerName: "User's Name",
            cellRenderer: (evt) => {
              const {
                firstName,
                lastName,
                isCurrent,
                hasConfirmedEmail,
                isExpired,
                email,
              } = evt.data;
              // console.log(evt, "evt from cellRenderer");
              if (isCurrent) {
                return `<b>${firstName} ${lastName} (You)</b>`;
              } else if (!hasConfirmedEmail) {
                return "-";
              }
              return `${firstName} ${lastName}`;
            },
          },
          {
            headerName: "Role",
            field: "role",

            cellRenderer: (evt) => {
              if (evt.value[0] === "charteredaccountant") {
                return "Chartered Accountant";
              }
              return (
                evt.value[0].charAt(0).toUpperCase() + evt.value[0].slice(1)
              );
            },
          },
          {
            headerName: "Email",
            field: "email",
          },
          {
            headerName: "Status",
            field: "status",

            cellRenderer: (evt) => {
              const { hasConfirmedEmail, isExpired } = evt.data;
              if (hasConfirmedEmail) {
                return "Accepted";
              } else if (!hasConfirmedEmail && isExpired) {
                return "Expired";
              } else if (!hasConfirmedEmail && !isExpired) {
                return "Invitation sent";
              }
            },
          },
        ]}
        fetchUrl={config.resourceUrls.teams}
        actionMenuData={actions}
        responseDataMapFunc={(userList) => {
          const rolesList = userList.roles;
          const allUsersList = [];
          if (rolesList && rolesList.length > 0) {
            rolesList.forEach((role) => {
              role.users.forEach((user) => {
                if (user.isCurrent) return;
                allUsersList.push(user);
              });
            });
          }

          if (allUsersList && allUsersList.length > 0) {
            return allUsersList;
          }
          return [];
        }}
      />
      <InviteCaModal
        isCaModalVisible={isCaModalVisible}
        setIsCaModalVisible={setIsCaModalVisible}
      />
      <InviteNewUserModal
        isNewUserModalVisible={isNewUserModalVisible}
        setIsNewUserModalVisible={setIsNewUserModalVisible}
      />
    </PageContent>
  );
};

export default Teams;
