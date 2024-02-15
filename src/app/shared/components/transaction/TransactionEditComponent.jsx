import React from "react";
import PageContent from "../pageContent/PageContent";

const TransactionEditComponent = ({
  transaction,
  isInvoice,
  isQuotation,
  isProforma,
}) => {
  const getPageInfo = () => {
    let pageInfo = {};

    if (isInvoice) {
      pageInfo.navigateBackTo = "/sales/invoices";
      pageInfo.pageTitle = "Edit Invoice";
    }
    if (isQuotation) {
      pageInfo.pageTitle = "Edit Quotation";
      pageInfo.navigateBackTo = "/sales/quotations";
    }
    if (isProforma) {
      pageInfo.pageTitle = "Edit Proforma Invoice";
      pageInfo.navigateBackTo = "/sales/invoices";
    }

    return pageInfo;
  };

  const { navigateBackTo, pageTitle } = getPageInfo();

  return (
    <PageContent navigateBackTo={navigateBackTo} title={pageTitle}>
      {/*  */}
    </PageContent>
  );
};

export default TransactionEditComponent;
