import React from "react";
import PageContent from "../../shared/components/pageContent/PageContent";
import Tabs from "../../shared/components/tabs/Tabs";
import ContactOverviewTab from "./ContactOverviewTab";
import ContactActivitiesTab from "./ContactActivitiesTab";
import ContactDocumentsTab from "./ContactDocumentsTab";
import { useParams } from "react-router-dom";

const ContactsDetail = () => {
  const { contactId } = useParams();
  const contactsDetailTabs = [
    {
      label: "Contact Overview",
      content: <ContactOverviewTab contactId={contactId} />,
    },
    {
      label: "Activities",
      content: <ContactActivitiesTab contactId={contactId} />,
    },
    {
      label: "Documents",
      content: <ContactDocumentsTab contactId={contactId} />,
    },
  ];

  return (
    <PageContent title={"Contact Details"}>
      <Tabs tabList={contactsDetailTabs} />
    </PageContent>
  );
};

export default ContactsDetail;
