import invoiz from "services/invoiz.service";
import config from "oldConfig";

export const savePaymentOptions = (requestData) => {
  return new Promise((resolve, reject) => {
    const { useAdvancedPaymentOptions, paymentSetting } = requestData;

    const data = {
      usePayPal: paymentSetting.usePayPal,
      useTransfer: paymentSetting.useTransfer,
      financeApiAccountId: paymentSetting.financeApiAccountId,
      invoizPayState: useAdvancedPaymentOptions ? "enabled" : "hidden",
    };

    if (requestData.invoizPayData && paymentSetting.useTransfer) {
      data.bankAccountHolder = requestData.invoizPayData.bankAccountHolder;
      data.bankAccountIban = requestData.invoizPayData.bankAccountIban;
      data.bankAccountBic = requestData.invoizPayData.bankAccountBic;
    }

    if (requestData.invoizPayData && paymentSetting.usePayPal) {
      data.paypalUserName = requestData.invoizPayData.paypalUserName;
    }

    if (!data.financeApiAccountId) {
      delete data.financeApiAccountId;
    }

    invoiz
      .request(`${config.resourceHost}setting/account`, {
        method: "POST",
        auth: true,
        data,
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
