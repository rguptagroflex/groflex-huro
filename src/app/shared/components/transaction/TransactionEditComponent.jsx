import React, { useRef, useState } from "react";
import PageContent from "../pageContent/PageContent";
import ContactSearchComponent from "../contactSearch/ContactSearchComponent";
import LetterHeaderComponent from "../../letter/LetterHeaderComponent";
import groflexService from "../../../services/groflex.service";
import resources from "../../resources/resources";
import config from "../../../../../oldConfig";

const TransactionEditComponent = ({
  transaction,
  letter,
  numerationOptions,
  miscOptions,
  payConditions,
  paymentSetting,
  recurringInvoice,
  project,
  isDeposit,
  isClosing,
  isRecurring,
  isInvoice,
  isQuotation,
  isProforma,
  isDeliveryChallan,
}) => {
  const [transactionStates, setTransactionStates] = useState({
    transaction,
    letter,
    miscOptions,
    numerationOptions,
    payConditions,
    paymentSetting,
    letterRecipientState: null,
    recurringInvoice,
    project,
    initialInvoizPayData: transaction && transaction.invoizPayData,
    isActiveComponentHasError: false,
    activeComponent: "none",
    isReloadingLetterHeader: false,
    // canCreateOffer:
    //   invoiz.user && invoiz.user.hasPermission(userPermissions.CREATE_OFFER),
    // canCreateChallan:
    //   invoiz.user && invoiz.user.hasPermission(userPermissions.CREATE_CHALLAN),
  });

  const otherRefs = useRef({
    footerOriginalValues: letter.footer.map((column) => column.metaData.html),
    onDocumentClick: () => {},
    activeComponentHandler: () => {},
    createCustomer: false,
    updateCustomer: false,
  });

  otherRefs.current.activeComponentHandler = (activeComponent, error) => {
    setTransactionStates({ ...transactionStates, activeComponent });
    if (typeof error !== "undefined") {
      setTransactionStates({
        ...transactionStates,
        isActiveComponentHasError: error,
      });
    }
  };

  otherRefs.current.onDocumentClick = (e) => {
    groflexService.trigger("documentClicked", e);
  };

  const onLetterHeaderEdited = (elements) => {
    const editedLetter = transactionStates.letter;
    editedLetter.header = elements;

    setTransactionStates(
      {
        ...transactionStates,
        letter: editedLetter,
      },
      () => {
        groflexService
          .request(config.letter.endpoints.saveLetterPaperUrl, {
            auth: true,
            method: "POST",
            data: editedLetter,
          })
          .then((response) => {
            const {
              body: { data },
            } = response;
            const newLetter = new Letter(data);
            setTransactionStates({
              ...transactionStates,
              // isReloadingLetterHeader: true,
              // isReloadingLetterHeader: false,
              letter: newLetter,
            });
            groflexService.toast.success(
              resources.letterHeaderSaveSuccessMessage
            );
          })
          .catch(() => {
            groflexService.toast.error(resources.letterHeaderSaveErrorMessage);
          });
      }
    );
  };

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
    if (isDeliveryChallan) {
      pageInfo.pageTitle = "Edit Delivery Challan";
      pageInfo.navigateBackTo = "/sales/invoices";
    }
    return pageInfo;
  };

  const { navigateBackTo, pageTitle } = getPageInfo();

  return (
    <PageContent
      navigateBackTo={navigateBackTo}
      title={pageTitle}
      breadCrumbData={["Home", "Sales", "Invoices"]}
    >
      <div className="transaction-edit-component">
        <LetterHeaderComponent
          items={transactionStates.letter.header}
          // onCancel={onLetterHeaderCancel}
          onFinish={(elements) => onLetterHeaderEdited(elements)}
        />
      </div>
    </PageContent>
  );
};

export default TransactionEditComponent;
