import React, { useRef, useState } from "react";
import PageContent from "../pageContent/PageContent";
import ContactSearchComponent from "../contactSearch/ContactSearchComponent";
import LetterHeaderComponent from "../../letter/LetterHeaderComponent";
import groflexService from "../../../services/groflex.service";
import resources from "../../resources/resources";
import config from "../../../../../oldConfig";
import HtmlInputComponent from "../input/HtmlInputComponent";
import EditableIndicatorDiv from "../../editableIndicatorDiv/EditableIndicatorDiv";
import RecepientComponent from "../../letter/RecepientComponent";

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
  isPurchaseOrder,
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
    let editedLetter = transactionStates.letter;
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
      pageInfo.pageTitle = transaction ? "Edit Invoice" : "Create Invoice";
      pageInfo.navigateBackTo = "/sales/invoices";
      pageInfo.breadCrumbData = ["Home", "Sales", "Invoices"];
    }
    if (isQuotation) {
      pageInfo.pageTitle = transaction ? "Edit Quotation" : "Create Quotation";
      pageInfo.navigateBackTo = "/sales/quotations";
      pageInfo.breadCrumbData = ["Home", "Sales", "Quotations"];
    }
    if (isProforma) {
      pageInfo.pageTitle = transaction
        ? "Edit Proforma Invoice"
        : "Create Proforma Invoice";
      pageInfo.navigateBackTo = "/sales/invoices";
      pageInfo.breadCrumbData = ["Home", "Sales", "Proforma Invoices"];
    }
    if (isDeliveryChallan) {
      pageInfo.pageTitle = transaction
        ? "Edit Delivery Challan"
        : "Create Delivery Challan";
      pageInfo.navigateBackTo = "/sales/invoices";
      pageInfo.breadCrumbData = ["Home", "Sales", "Delivery Challan"];
    }
    return pageInfo;
  };

  const { navigateBackTo, pageTitle, breadCrumbData } = getPageInfo();
  console.log(transactionStates.transaction, "Transaction");

  return (
    <PageContent
      navigateBackTo={navigateBackTo}
      title={pageTitle}
      breadCrumbData={breadCrumbData}
    >
      <div className="transaction-edit-component">
        <LetterHeaderComponent
          items={transactionStates.letter.header}
          // onCancel={onLetterHeaderCancel}
          onFinish={(elements) => onLetterHeaderEdited(elements)}
        />
        {/* First row BILLED TO, SHiP TO, ANd INVOICE NUMBE STUFF  */}
        <div className="transaction-form-row columns is-multiline">
          {/* BIll to */}
          <div className="transaction-letter-recipient-container column is-3">
            <EditableIndicatorDiv className="transaction-form-sender-quill-container">
              <HtmlInputComponent
                className={"sender-quill"}
                value={transactionStates.letter.sender}
              />
              {/* Enter customer */}
            </EditableIndicatorDiv>
            <RecepientComponent
              transaction={transactionStates.transaction}
              customerData={transactionStates.transaction.customerData}
              recipientState={transactionStates.letterRecipientState}
              recipientType={isPurchaseOrder ? "payee" : "customer"}
              customerFullData={transactionStates.transaction.customer}
              initialShowStates={{
                showEmptyComp: true,
                showSelectComp: false,
                showDisplayComp: false,
                showFormComp: false,
              }}
            />
          </div>
          {/* Ship to */}
          <div className="transaction-letter-shipping-address-container column is-3">
            <EditableIndicatorDiv className="sender-address-quill-container">
              <HtmlInputComponent
                className={"sender-address-quill"}
                value={"SHIP TO"}
              />
            </EditableIndicatorDiv>
          </div>
          {/* Meta */}
          <div className="transaction-form-meta column is-6">
            <EditableIndicatorDiv className="transaction-form-sender">
              <HtmlInputComponent
                placeholder={"Meta component"}
                // value={transactionStates.letter.sender}
              />
            </EditableIndicatorDiv>
          </div>
        </div>
      </div>
    </PageContent>
  );
};

export default TransactionEditComponent;
