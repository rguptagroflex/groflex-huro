import invoiz from "services/invoiz.service";
import config from "oldConfig";

export const savePurchaseOrder = (requestData) => {
  if (
    requestData.customerData.countryIso === "IN" &&
    !requestData.baseCurrency &&
    !requestData.exchangeRate
  ) {
    requestData.baseCurrency = "";
    requestData.exchangeRate = 0.0;
  }
  return new Promise((resolve, reject) => {
    const url = requestData.id
      ? `${config.resourceHost}purchaseOrder/${requestData.id}`
      : `${config.resourceHost}PurchaseOrder`;
    const method = requestData.id ? "PUT" : "POST";

    if (requestData.id && requestData.customerData) {
      delete requestData.customerData.id;
    }

    invoiz
      .request(url, {
        auth: true,
        method,
        data: requestData,
      })
      .then((response) => {
        const {
          body: {
            data: { id },
          },
        } = response;

        resolve(id);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
