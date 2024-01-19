import React from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import { Button } from "../../../shared/components/button/Button";
import { ListAdvancedComponent } from "../../../shared/components/list-advanced/ListAdvancedComponent";
import config from "../../../../../config";
import { FeatherIcon } from "../../../shared/featherIcon/FeatherIcon";
import { useNavigate } from "react-router-dom";
const DealDetails = () => {
  const navigate = useNavigate();
  const handleActionClick = () => {};
  const actions = [
    { name: "Edit", icon: "edit" },
    { name: "Delete", icon: "trash-alt" },
  ];

  const additionalInfo = [
    {
      title: "Task",
      content: [
        "Create sales page for Amu's business, for consultation",
        "Create sales page for Amu's business, for consultation",
        "Create sales page for Amu's business, for consultation",
      ],
    },
    {
      title: "Email",
      content: [
        "Create sales page for Amu's business, for consultation",
        "Create sales page for Amu's business, for consultation",
        "Create sales page for Amu's business, for consultation",
      ],
    },
    {
      title: "Meeting",
      content: [
        "Create sales page for Amu's business, for consultation",
        "Create sales page for Amu's business, for consultation",
        "Create sales page for Amu's business, for consultation",
      ],
    },
    {
      title: "Notes",
      content: [
        "Create sales page for Amu's business, for consultation",
        "Create sales page for Amu's business, for consultation",
        "Create sales page for Amu's business, for consultation",
      ],
    },
  ];

  const handleAdd = () => {
    navigate("/crm/tasks/edit");
  };
  return (
    <PageContent
      title="Deal Info"
      titleIsBreadCrumb
      breadCrumbData={["Home", "Crm"]}
      titleActionContent={
        <Button
          onClick={() => navigate("/crm/deals/create-deal")}
          isSuccess
          isOutlined
        >
          Edit
        </Button>
      }
    >
      <div className="deal-details-wrapper">
        <div className="columns is-multiline">
          <div className="column is-7 left-card">
            <div className="deal-about-card">
              <AdvancedCard type={"s-card"}>
                <h2 className="title is-5">About this Deal</h2>
                <div className="deal-about-container">
                  <span className="label">Deal Name</span>
                  <span className="separtor">-</span>
                  <span className="value">Consulting</span>
                </div>
                <div className="deal-about-container">
                  <span className="label">Deal Owner</span>
                  <span className="separtor">-</span>
                  <span className="value">Oscar Peter</span>
                </div>
                <div className="deal-about-container">
                  <span className="label">Closing Date</span>
                  <span className="separtor">-</span>
                  <span className="value">30/10/2023</span>
                </div>
                <div className="deal-about-container">
                  <span className="label">Type</span>
                  <span className="separtor">-</span>
                  <span className="value">New Business</span>
                </div>
                <div className="deal-about-container">
                  <span className="label">Stage</span>
                  <span className="separtor">-</span>
                  <span className="value">Prospect</span>
                </div>
                <div className="deal-about-container">
                  <span className="label">Amount</span>
                  <span className="separtor">-</span>
                  <span className="value">₹ 2000</span>
                </div>
              </AdvancedCard>
            </div>
            <div className="m-t-20" />
            <div className="deal-addtional-info-card">
              <AdvancedCard type={"s-card"}>
                <h2 className="title is-5">Additional Information</h2>
                {additionalInfo.map((task) => (
                  <div className="task-container">
                    <div className="task-container-header">
                      <h5 className="task-label">{task.title}</h5>
                      <div className="create-new-task-btn" onClick={handleAdd}>
                        <FeatherIcon name={"PlusCircle"} color="#00A353" />
                        <span>Add</span>
                      </div>
                    </div>
                    <div className="task-content-container">
                      {task.content.map((item) => (
                        <div className="task-content">{item}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </AdvancedCard>
            </div>
            <div className="m-t-20" />
          </div>

          <div className="column is-5 right-card">
            <AdvancedCard type={"s-card"}>
              <h2 className="title is-5">Deal History</h2>
              <ListAdvancedComponent
                onActionClick={handleActionClick}
                columnDefs={[
                  { field: "title", headerName: "Title" },
                  { field: "date", headerName: "Date" },
                  { field: "assignedUser", headerName: "Assigned User" },
                  { field: "description", headerName: "Description" },
                ]}
                fetchUrl={config.resourceUrls.customers}
                actionMenuData={actions}
              />
            </AdvancedCard>
          </div>
        </div>
      </div>
    </PageContent>
  );
};

export default DealDetails;
