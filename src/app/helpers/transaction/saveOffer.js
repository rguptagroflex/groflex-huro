import invoiz from "services/invoiz.service";
import config from "oldConfig";

export const saveOffer = (requestData) => {
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
      ? `${config.resourceHost}offer/${requestData.id}`
      : `${config.resourceHost}offer`;
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
