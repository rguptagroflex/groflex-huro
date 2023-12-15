import React from "react";
import PageContent from "../../shared/components/pageContent/PageContent";
import { Button } from "../../shared/components/button/Button";
import { useNavigate } from "react-router-dom";

const CrmCreateContact = () => {
  const navigate = useNavigate();
  return (
    <PageContent
      title="Crm"
      titleIsBreadCrumb
      breadCrumbData={["Home", "Crm", "Create Contact"]}
      titleActionContent={
        <Button onClick={() => navigate("/crm/createNewContact")} isSuccess>
          Save
        </Button>
      }
    >
      Crm Create Contact
    </PageContent>
  );
};

export default CrmCreateContact;
