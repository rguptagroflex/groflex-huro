import invoiz from "services/invoiz.service";
import config from "oldConfig";
import _ from "lodash";

export const saveInvoice = (requestData, isDeposit, isClosing) => {
  requestData.customerData = _.omit(requestData.customerData, "id");
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
      ? `${config.resourceHost}${
          isDeposit
            ? "depositInvoice"
            : isClosing
            ? "closingInvoice"
            : "invoice"
        }/${requestData.id}`
      : `${config.resourceHost}${
          isDeposit
            ? "depositInvoice"
            : isClosing
            ? "closingInvoice"
            : "invoice"
        }`;
    const method = requestData.id ? "PUT" : "POST";

    const dunningRequestData = {
      autoDunningEnabled:
        requestData.payConditionData.dueDays > 0
          ? requestData.autoDunningEnabled
          : false,
      dunningRecipients: requestData.dunningRecipients || [],
    };
    invoiz
      .request(`${config.resourceHost}invoice/validate`, {
        auth: true,
        method: "POST",
        data: dunningRequestData,
      })
      .then(() => {
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
            invoiz
              .request(`${config.resourceHost}invoice/${id}/dunning/setting`, {
                auth: true,
                method: "PUT",
                data: dunningRequestData,
              })
              .then(() => {
                resolve(id);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
