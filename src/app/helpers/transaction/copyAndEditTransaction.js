import invoiz from "services/invoiz.service";
import _ from "lodash";
import config from "oldConfig";
import { handleTransactionErrors } from "helpers/errors";
import { updateSubscriptionDetails } from "helpers/updateSubsciptionDetails";
import { transactionTypes } from "helpers/constants";
import OfferTypes from "enums/impress/offer-types.enum";
import { getResource } from "../resource";

const { TRANSACTION_TYPE_INVOICE, TRANSACTION_TYPE_RECURRING_INVOICE } =
  transactionTypes;

export const copyAndEditTransaction = (opts) => {
  let transactionKind = opts.invoiceModel.type;
  const navPath = opts.invoiceModel.navPath;
  const onCopySuccess = (response) => {
    _.attempt(opts.onCopySuccess);

    const { id, type } = response.body.data;

    if (type === OfferTypes.IMPRESS) {
      invoiz.router.navigate(
        `${transactionKind.toLowerCase()}/impress/edit/${id}`
      );
    } else if (navPath !== undefined) {
      invoiz.router.navigate(`${navPath.toLowerCase()}/edit/${id}`);
    } else {
      invoiz.router.navigate(`${transactionKind.toLowerCase()}/edit/${id}`);
    }
  };

  const onCopyError = (error) => {
    _.attempt(opts.onCopyError);

    if (error.body.meta.offer) {
      handleTransactionErrors(error.body.meta);
    } else {
      invoiz.showNotification({
        type: "error",
        message: getResource([`${transactionKind}CopyErrorMessage`]),
      });
    }
  };

  const updateFooter = () => {
    updateSubscriptionDetails();
  };

  if (
    transactionKind === TRANSACTION_TYPE_RECURRING_INVOICE &&
    !opts.invoiceModel.recurrence
  ) {
    transactionKind = TRANSACTION_TYPE_INVOICE;
  }

  invoiz
    .request(
      `${config.resourceHost}${transactionKind}/${opts.invoiceModel.id}/copy`,
      {
        auth: true,
        method: "POST",
      }
    )
    .then(onCopySuccess)
    .then(updateFooter)
    .catch(onCopyError);
};
