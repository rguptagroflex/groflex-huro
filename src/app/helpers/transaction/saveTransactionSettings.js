import invoiz from "services/invoiz.service";
import config from "oldConfig";

export const saveTransactionSettings = (
  isOffer,
  isPurchaseOrder,
  isDeliveryChallan,
  infoSectionFields,
  infoSectionCustomFields,
  columns
) => {
  return new Promise((resolve, reject) => {
    const data = {
      infoSectionFields,
      infoSectionCustomFields,
    };
    if (columns) {
      data.columns = columns;
    }
    invoiz
      .request(
        `${config.resourceHost}setting/${
          isOffer
            ? "offer"
            : isPurchaseOrder
            ? "purchaseOrder"
            : isDeliveryChallan
            ? "deliveryChallan"
            : "invoice"
        }`,
        {
          auth: true,
          method: "POST",
          data,
        }
      )
      .then((response) => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
