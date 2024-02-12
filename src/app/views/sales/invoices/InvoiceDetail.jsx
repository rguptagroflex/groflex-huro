import React, { useEffect, useState } from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { Button } from "../../../shared/components/button/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import config from "../../../../../newConfig";
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

const InvoicesDetail = () => {
  const [invoiceData, setInvoiceData] = useState();
  const [invoiceHistory, setInvoiceHistory] = useState();
  const [pdfLink, setPdfLink] = useState();
  const [letterElements, setLetterElements] = useState();
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

  const getPageButtons = () => {
    let buttonsFragment = "";

    switch (invoiceData?.state) {
      case InvoiceState.DRAFT:
        buttonsFragment = (
          <>
            <Button className="m-r-15" isSuccess isOutlined>
              Edit
            </Button>
            <Button isSuccess>Finalize</Button>
          </>
        );
        break;
      case InvoiceState.LOCKED:
        buttonsFragment = (
          <>
            <Button className="m-r-15" isSuccess isOutlined>
              Create reminder
            </Button>
            <Button isSuccess>Register payment</Button>
          </>
        );
        break;
      default:
        break;
    }
    return buttonsFragment;
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
  // console.log(pdfLink, "PDF link");

  return (
    <PageContent
      navigateBackTo={"/sales/invoices"}
      loading={!invoiceData?.id}
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
            <img id="invoice-pdf-img" src={pdfLink} />
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
    </PageContent>
  );
};

export default InvoicesDetail;
