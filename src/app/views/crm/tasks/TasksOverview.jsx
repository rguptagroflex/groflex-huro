import React, { useState } from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { ListAdvancedComponent } from "../../../shared/components/list-advanced/ListAdvancedComponent";
import { formatCurrency } from "../../../helpers/formatCurrency";
import {
  ListAdvancedDefaultSettings,
  customerTypes,
} from "../../../helpers/constants";
import { CustomShowHeaderSum } from "../../../shared/components/list-advanced/CustomShowHeaderSum";
import config from "../../../../../newConfig";
import groflexService from "../../../services/groflex.service";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components/button/Button";
import { isNil } from "../../../helpers/isNil";
import { FeatherIcon } from "../../../shared/featherIcon/FeatherIcon";
import Reschedule from "./Reschedule";

const TasksOverview = () => {
  const actions = [
    { name: "Edit", icon: "edit" },
    { name: "Delete", icon: "trash-alt" },
    { name: "Reschedule", icon: "refresh-cw" },
  ];
  const navigate = useNavigate();

  //leads array of objects to render list advanced component
  const leads = [
    {
      id: 0,
      label: "Hot",
      lead: "Daniel Mark",
      description: "Webinar",
      taskType: "To-Do",
      dueDate: "01-02-2022",
      assignedUser: "Oscar P",
      taskActions: "Reschedule",
    },
    {
      id: 1,
      label: "Warm",
      lead: "Daniel Mark",
      description: "Webinar",
      taskType: "Email",
      dueDate: "01-02-2022",
      assignedUser: "Oscar P",
      taskActions: "Reschedule",
    },
    {
      id: 2,
      label: "Cold",
      lead: "Daniel Mark",
      description: "Webinar",
      taskType: "Call",
      dueDate: "01-02-2022",
      assignedUser: "Oscar P",
      taskActions: "Reschedule",
    },
    {
      id: 3,
      label: "Cold",
      lead: "Daniel Mark",
      description: "Webinar",
      taskType: "Meeting",
      dueDate: "01-02-2022",
      assignedUser: "Oscar P",
      taskActions: "Reschedule",
    },
  ];

  //list advanced cell renderer function to render label column with icon
  const createLabel = (params) => {
    let cellColor = "";
    switch (params.value.toLowerCase()) {
      case "hot":
        cellColor = "#D94339";
        break;
      case "warm":
        cellColor = "#FFAA2C";
        break;
      case "cold":
        cellColor = "#0071CA";
        break;
    }
    return (
      <div
        className="status-label"
        style={{
          background: cellColor,
        }}
      >
        {params.value}
      </div>
    );
  };

  //Function to generate top bar buttons
  const createTopbarButtons = () => {
    return (
      <div className="task-overview-buttons">
        <Button
          onClick={() => navigate("/crm/tasks/task-edit")}
          isOutlined
          isPrimary
          isBold
          isDisabled
        >
          Delete
        </Button>
        <Button onClick={() => navigate("/crm/tasks/edit")} isSuccess>
          Create
        </Button>
      </div>
    );
  };

  const handleActionClick = (action, row, params) => {
    switch (action.name) {
      case "Edit":
        navigate(`/crm/tasks/edit/${row.id}`);
        break;
      case "Reschedule":
        <Reschedule />;
        break;
    }
  };

  return (
    <PageContent
      title="Tasks Overview"
      titleIsBreadCrumb
      breadCrumbData={["Home", "CRM", "Tasks"]}
      titleActionContent={createTopbarButtons()}
    >
      <div className="tasks-overview-wrapper">
        <ListAdvancedComponent
          onRowClicked={(e) => {
            navigate(`/crm/leads/${e.data.id}`);
          }}
          onActionClick={handleActionClick}
          columnDefs={[
            {
              field: "label",
              headerName: "Label",
              cellRenderer: createLabel,
            },

            { field: "lead", headerName: "lead" },
            { field: "description", headerName: "description" },
            { field: "taskType", headerName: "Task Type" },
            { field: "dueDate", headerName: "Due Date" },
            { field: "assignedUser", headerName: "Assigned User" },
            { field: "taskActions", headerName: "Task Actions" },
          ]}
          fetchUrl={config.resourceUrls.customers}
          customRowData={leads}
          actionMenuData={actions}
        />
      </div>
    </PageContent>
  );
};

export default TasksOverview;
