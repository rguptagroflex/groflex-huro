import React from "react";
import Accordion from "../../shared/components/accordion/Accordion";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";

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
      {activities.map((activity, id) => (
        <div key={`activity-${id}`}>
          <Accordion
            accordionLeftHeader={activity.activityName}
            accordianRightHeader={activity.activityDate}
            accordionBody={"Acitivity Sample Content"}
          />
        </div>
      ))}
    </div>
  );
};

export default ContactManagementActivity;
