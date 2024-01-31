import React from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import BankListComponent from "./BankListComponent";
import CashListComponent from "./CashListComponent";

const CashAndBank = () => {
  return (
    <div className="columns">
      <div className="column is-12">
        <PageContent title="Cash and Bank">
          <BankListComponent />
          <CashListComponent />
        </PageContent>
      </div>
    </div>
  );
};

export default CashAndBank;
