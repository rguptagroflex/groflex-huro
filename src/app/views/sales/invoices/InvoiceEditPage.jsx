import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import groflexService from "../../../services/groflex.service";
import TransactionEditComponent from "../../../shared/components/transaction/TransactionEditComponent";
import { multiFetchHandler } from "../../../helpers/multiFetchHandler";
// _____________
import InvoiceState from "enums/invoice/invoice-state.enum";
import { formatDate } from "helpers/formatDate";
import Invoice from "models/invoice.model";
import invoiz from "services/invoiz.service";
// import LoadingOverlayComponent from "shared/loading-overlay/loading-overlay.component";
import oldConfig from "oldConfig";
import config from "../../../../../newConfig";

const InvoiceEditPage = () => {
  const { invoiceId } = useParams();

  useEffect(() => {
    const calls = [
      groflexService.request(`${config.resourceUrls.invoice}/${invoiceId}`, {
        auth: true,
      }),
    ];
    if (invoiceId) {
      multiFetchHandler(calls).then((responses) => {
        const invoice = responses[0];
        console.log(
          new Invoice(invoice.body.data.invoice),
          "Finally invoice respoosen with getter and setters"
        );
      });
    }
  }, [invoiceId]);

  // console.log(InvoiceState, "ENUMS");
  // console.log(formatDate, "HELPERS");
  // console.log(Invoice, "MODELS");
  // console.log(invoiz, "SERVICE");
  // console.log(LoadingOverlayComponent, "SHARED");
  console.log(oldConfig.invoice.resourceUrl, "OLdddD");
  // console.log(newConfig, "NEW");
  return <TransactionEditComponent isInvoice />;
};

export default InvoiceEditPage;
