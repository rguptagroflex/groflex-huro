import invoiz from "services/invoiz.service";
import config from "oldConfig";

export const saveExpense = (requestData) => {
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
      ? `${config.resourceHost}${"expense"}/${requestData.id}`
      : `${config.resourceHost}${"expense"}`;
    const method = requestData.id ? "PUT" : "POST";

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
