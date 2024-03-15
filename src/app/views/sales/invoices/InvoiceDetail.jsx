import React, { useEffect, useState } from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { Button } from "../../../shared/components/button/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import config from "../../../../../newConfig";
import oldConfig from "../../../../../oldConfig";
import groflexService from "../../../services/groflex.service";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import { abbreviationDateFormat } from "../../../helpers/dateFormatters";
import { formatCurrency } from "../../../helpers/formatCurrency";
import InvoiceHistoryComponent from "./InvoiceHistoryComponent";
import InvoiceState from "../../../enums/invoice/invoice-state.enum";
import resources from "../../../shared/resources/resources";
import { multiFetchHandler } from "../../../helpers/multiFetchHandler";
import { capitalize } from "../../../helpers/textFromatters";
import Invoice from "../../../models/invoice.model";
import Modal from "../../../shared/components/modal/Modal";
import {
  errorCodes,
  DetailViewConstants,
  PAYMENT_TYPE_LESS_BANKCHARGE,
  PAYMENT_TYPE_LESS_DISCOUNT,
  PAYMENT_TYPE_LESS_TDSCHARGE,
} from "../../../helpers/constants";
import RegisterPaymentModal from "./RegisterPaymentModal";
import PdfViewer from "../../../shared/components/pdfViewer/PdfViewer";

const allowedPaymentTypesForCancel = [
  PAYMENT_TYPE_LESS_BANKCHARGE,
  PAYMENT_TYPE_LESS_DISCOUNT,
  PAYMENT_TYPE_LESS_TDSCHARGE,
];

const InvoicesDetail = () => {
  const [invoiceData, setInvoiceData] = useState();
  const [invoiceHistory, setInvoiceHistory] = useState();
  const [pdfLink, setPdfLink] = useState();
  const [letterElements, setLetterElements] = useState();
  const [finalizeModalOpen, setFinalizeModalOpen] = useState(false);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [registerPaymentModalOpen, setRegisterPaymentModalOpen] =
    useState(false);

  const { invoiceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (invoiceId) {
      const calls = [
        groflexService.request(`${config.resourceUrls.invoice}${invoiceId}`, {
          auth: true,
        }),
        groflexService.request(
          `${config.resourceUrls.invoice}${invoiceId}/document`,
          {
            auth: true,
            method: "POST",
            data: {
              isPrint: false,
            },
          }
        ),
        groflexService.request(
          `${config.resourceUrls.invoice}${invoiceId}/history`,
          {
            auth: true,
            method: "GET",
          }
        ),
      ];

      multiFetchHandler(calls).then((responses) => {
        const invoiceResponse = responses[0];
        const pdfDocumentResponse = responses[1];
        const history = responses[2];
        // console.log(responses, "HERE ARE the responses in invoice detail");
        setInvoiceData({
          ...invoiceResponse.body.data.invoice,
        });
        setLetterElements({
          ...invoiceResponse.body.data.letterElements,
        });
        setPdfLink(
          `${config.imageResourceHost}${pdfDocumentResponse.body.data.path}`
        );
        setInvoiceHistory(history.body.items);
        // fetch(
        //   `${config.imageResourceHost}${pdfDocumentResponse.body.data.path}`
        // );
      });
    }
  }, [invoiceId]);

  const getInvoiceInfo = () => {
    const invoiceInfo = [];

    //Amount
    invoiceInfo.push(
      <>
        <div className="is-weight-500 font-14px color-secondary">
          Invoice Amount:
        </div>

        <div className="title is-3 m-t-10 m-b-10">{amount}</div>
      </>
    );

    // Customer name
    invoiceInfo.push(
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="is-weight-600">Customer</span>
        <span className="is-weight-600">
          <Link
            className="text-primary"
            to={`/contacts-edit/${invoiceData?.customerId}`}
          >
            {invoiceData?.customerData?.name}
          </Link>
        </span>
      </div>
    );

    //Already paid
    if (invoiceData?.state === InvoiceState.PARTIALLY_PAID) {
      invoiceInfo.push(
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="is-weight-600">{resources.str_alreadyPaid}</span>
          <span className="is-weight-600">{paidAmount}</span>
        </div>
      );
    }

    //Cancelled
    if (invoiceData?.state === InvoiceState.CANCELLED) {
      invoiceInfo.push(
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="is-weight-600">{resources.str_alreadyPaid}</span>
          <span className="is-weight-600">{paidAmount}</span>
        </div>
      );
      invoiceInfo.push(
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="is-weight-600">
            {resources.outstandingBalanceText}
          </span>
          <span className="is-weight-600">{outstandingAmount}</span>
        </div>
      );
    }

    // Due date
    if (
      invoiceData?.state !== InvoiceState.DRAFT &&
      invoiceData?.state !== InvoiceState.PAID &&
      invoiceData?.state !== InvoiceState.CANCELLED
    ) {
      invoiceInfo.push(
        <div className="flex-space-between color-warning">
          <span className="is-weight-600">
            {capitalize(new Invoice(invoiceData).dueDateKind)}
          </span>
          <span className="is-weight-600">
            {new Invoice(invoiceData).dueDateSubString}
          </span>
        </div>
      );
    }

    if (invoiceData?.state !== InvoiceState.DRAFT) {
      invoiceInfo.push(
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="is-weight-600">{resources.invoiceDate}</span>
          <span className="is-weight-500 color-secondary">
            {abbreviationDateFormat(invoiceData?.date)}
          </span>
        </div>
      );
    }

    return invoiceInfo;
  };

  const openFinalizeModal = () => {
    setFinalizeModalOpen(true);
  };
  const closeFinalizeModal = () => {
    setFinalizeModalOpen(false);
  };
  const openReminderModal = () => {
    setReminderModalOpen(true);
  };
  const closeReminderModal = () => {
    setReminderModalOpen(false);
  };
  const openRegisterPaymentModal = () => {
    setRegisterPaymentModalOpen(true);
  };
  const closeRegisterPaymentModal = () => {
    setRegisterPaymentModalOpen(false);
  };

  const handleLockInvoice = () => {
    const lockEndpoint = `${oldConfig.invoice.resourceUrl}/${invoiceData.id}/lock`;
    groflexService
      .request(lockEndpoint, { auth: true, method: "PUT" })
      .then(() => {
        closeFinalizeModal();
        groflexService.router.reload();
        groflexService.toast.success(resources.invoiceLockSuccessMessage);
        // TODO: Handle Finalize Invoice Errors
        // checkAchievementNotification();
        // amplitude.getInstance().logEvent("created_invoice");
      })
      // .then(updateSubscriptionDetails())
      .catch((error) => {
        closeFinalizeModal();

        if (
          error.body.meta.useAdvancedPaymentOptions &&
          error.body.meta.useAdvancedPaymentOptions[0].code ===
            errorCodes.INVALID
        ) {
          groflexService.toast.error(
            resources.invoizPayInvoiceEditErrorMessage
          );
          return;
        } else if (
          error.body.meta.number &&
          error.body.meta.number[0].code === errorCodes.EXISTS
        ) {
          groflexService.toast.error(
            resources.invoiceNumberAlreadyExistMessage
          );
          return;
        } else if (
          error.body.meta.number &&
          error.body.meta.number[0].code === errorCodes.TOO_MANY
        ) {
          groflexService.toast.error(resources.invoiceNumberRangeExceedMessage);
          return;
        }
        // handleTransactionErrors(error.body.meta);
      });
  };

  const getPageButtons = () => {
    const invoice = new Invoice(invoiceData);
    let buttonsFragment = "";
    let createReminder = "";
    if (invoice.isOverDue) {
      createReminder = (
        <Button onClick={openReminderModal} className="m-r-10" isSecondary>
          Create reminder
        </Button>
      );
    }

    switch (invoice?.state) {
      case InvoiceState.DRAFT:
        buttonsFragment = (
          <>
            <Link to={`/sales/invoices/edit/${invoice?.id}`}>
              <Button className="m-r-10" isSecondary>
                Edit
              </Button>
            </Link>
            <Button onClick={openFinalizeModal} isSuccess>
              Finalize
            </Button>
          </>
        );
        break;
      case InvoiceState.LOCKED:
      case InvoiceState.DUNNED:
      case InvoiceState.PARTIALLY_PAID:
        buttonsFragment = (
          <>
            <Button onClick={openRegisterPaymentModal} isSuccess>
              Register payment
            </Button>
          </>
        );
        break;
      default:
        break;
    }
    return (
      <>
        {createReminder}
        {buttonsFragment}
      </>
    );
  };

  const getPageTitle = () => {
    let pageTitle = "";
    if (invoiceData?.state === InvoiceState.DRAFT) {
      pageTitle = "Invoice Draft";
    } else {
      pageTitle = `Invoice No. ${invoiceData?.number}`;
    }
    return pageTitle;
  };

  const amount = formatCurrency(invoiceData?.totalGross);
  const outstandingAmount = formatCurrency(invoiceData?.outstandingAmount);
  const paidAmount = formatCurrency(
    invoiceData?.totalGross - invoiceData?.outstandingAmount
  );
  const invoiceInfoArr = getInvoiceInfo();
  const pageButtons = getPageButtons();
  const pageTitle = getPageTitle();

  // console.log(new Invoice(invoiceData), "Invoice detail");
  // console.log(invoiceHistory, "History");
  console.log(pdfLink, "PDF liink");

  return (
    <PageContent
      navigateBackTo={"/sales/invoices"}
      // loading={!invoiceData?.id}
      title={invoiceData?.id ? pageTitle : ""}
      titleActionContent={pageButtons}
    >
      <div className="columns">
        <div className="column is-7">
          <div
            id="invoice-pdf-container"
            style={{
              background: "white",
              height: "900px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #c6c6c6",
            }}
          >
            {/* PDF bruh */}
            {/* {pdfObject} */}
            {/* <img id="invoice-pdf-img" src={pdfLink} /> */}
            <PdfViewer pdfUrl={pdfLink} />
          </div>
        </div>
        <div className="column is-5">
          <AdvancedCard type={"r-card"}>
            {/* Invoice Date */}
            {invoiceInfoArr.length &&
              invoiceInfoArr.map((invoiceInfo, index) => {
                return (
                  <React.Fragment key={`${index}`}>
                    {invoiceInfo}
                  </React.Fragment>
                );
              })}
          </AdvancedCard>

          <InvoiceHistoryComponent activityData={invoiceHistory} />
        </div>
      </div>
      <Modal
        isActive={finalizeModalOpen}
        closeModalFunction={closeFinalizeModal}
        title={"Complete process"}
        onSubmit={handleLockInvoice}
      >
        <div>{resources.invoiceLockModalContentText}</div>
      </Modal>
      <Modal
        isActive={reminderModalOpen}
        closeModalFunction={closeReminderModal}
        title={resources.str_createPaymentReminder}
        onSubmit={() => {}}
        submitBtnName="Send via email"
        otherActionButtons={
          <Button onClick={() => {}} isPrimary>
            Show PDF
          </Button>
        }
      >
        <div>
          Do you want to create a payment reminder for the selected invoice?
        </div>
      </Modal>
      <RegisterPaymentModal
        isActive={registerPaymentModalOpen}
        closeFunction={closeRegisterPaymentModal}
        onSubmit={() => {}}
        invoice={invoiceData}
      />
    </PageContent>
  );
};

export default InvoicesDetail;
