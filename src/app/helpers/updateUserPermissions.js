import invoiz from "services/invoiz.service";
import config from "oldConfig";
import { handleNotificationErrorMessage } from "helpers/errorMessageNotification";

export const updateUserPermissions = (callback) => {
  invoiz
    .request(config.account.endpoints.getUserPermissions, { auth: true })
    .then(({ body: { data } }) => {
      //console.log('invoiz.user updateUserPermissions ', invoiz.user, data);
      if (invoiz.user) {
        invoiz.user.rights = data.features;
        // expense
        //invoiz.user.rights.viewDashboardSalesAndExpenseStatistics = false;
        //invoiz.user.rights.viewAccounting = true;
        if (invoiz.user.rights.viewAccounting) {
          invoiz.user.rights.createExpense = true;
          invoiz.user.rights.convertPurchaseOrderToExpense = true;
          invoiz.user.rights.deleteExpense = true;
          invoiz.user.rights.updateExpense = true;
          invoiz.user.rights.viewExpense = true;
        } else {
          invoiz.user.rights.createExpense = false;
          invoiz.user.rights.convertPurchaseOrderToExpense = false;
          invoiz.user.rights.deleteExpense = false;
          invoiz.user.rights.updateExpense = false;
          invoiz.user.rights.viewExpense = false;
        }

        callback && callback();
      }
    })
    .catch((error) => {
      const meta = error.body && error.body.meta;
      handleNotificationErrorMessage(meta);

      callback && callback();
    });
};
