import invoiz from "services/invoiz.service";
import config from "oldConfig";

export const saveRecurringInvoice = (recurringInvoice) => {
  return new Promise((resolve, reject) => {
    const url = recurringInvoice.id
      ? `${config.resourceHost}recurringInvoice/${recurringInvoice.id}`
      : `${config.resourceHost}recurringInvoice`;
    const method = recurringInvoice.id ? "PUT" : "POST";

    invoiz
      .request(url, {
        auth: true,
        method,
        data: recurringInvoice,
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
