import React from "react";
import Accordion from "../../shared/components/accordion/Accordion";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import { Button } from "../../shared/components/button/Button";

const ContactManagementActivity = () => {
  const activities = [
    {
      activityName: (
        <>
          <FeatherIcon name={"Phone"} size={15} />
          <h5>Kiran Bala called Abha Sarin</h5>
        </>
      ),
      activityDate: "18.08.2023. at 2:46 PM",
    },
    {
      activityName: (
        <>
          <FeatherIcon name={"Phone"} size={15} />
          <h5>Kiran Bala called Abha Sarin</h5>
        </>
      ),
      activityDate: "18.08.2023. at 2:46 PM",
    },
    {
      activityName: (
        <>
          <FeatherIcon name={"Phone"} size={15} />
          <h5>Kiran Bala called Abha Sarin</h5>
        </>
      ),
      activityDate: "18.08.2023. at 2:46 PM",
    },
    {
      activityName: (
        <>
          <FeatherIcon name={"Phone"} size={15} />
          <h5>Kiran Bala called Abha Sarin</h5>
        </>
      ),
      activityDate: "18.08.2023. at 2:46 PM",
    },
  ];
  return (
    <div className="contact-management-activity-wrapper">
      <AdvancedCard type={"s-card"}>
        <div className="contact-management-activity-header">
          <h2 className="title is-5">Recent Activity</h2>
          <Button isOutlined isPrimary isBold className={"mr-5"}>
            See More
          </Button>
        </div>

        {activities.map((activity, id) => (
          <div key={`activity-${id}`} className="activity-accordian-container">
            <Accordion
              accordionLeftHeader={activity.activityName}
              accordianRightHeader={activity.activityDate}
              accordionBody={"Acitivity Sample Content"}
            />
          </div>
        ))}
      </AdvancedCard>
    </div>
  );
};

export default ContactManagementActivity;
