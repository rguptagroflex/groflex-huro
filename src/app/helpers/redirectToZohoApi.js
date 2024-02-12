import invoiz from "services/invoiz.service";
import config from "oldConfig";
import { getResource } from "./resource";
// import { updateSubscriptionDetails } from 'helpers/updateSubsciptionDetails';

export const redirectToZohoApi = (planId, isUpgrade) => {
  let isRedirecting = false;
  let url = "";

  if (planId) {
    url =
      config.account.endpoints.getSubscriptionHostedPageSession +
      "/" +
      planId +
      "?returnUrl=" +
      window.location.pathname +
      "?reloadZoho=true";
  } else {
    url =
      config.account.endpoints.getSubscriptionPortalSession +
      "?returnUrl=" +
      window.location.pathname +
      "?reloadZoho=true";

    if (isUpgrade) {
      url += "&isUpgrade=true";
    }
  }

  if (!isRedirecting) {
    isRedirecting = true;

    invoiz
      .request(url, {
        auth: true,
      })
      .then((response) => {
        isRedirecting = false;
        if (response.body.data && response.body.data.isFreePlanUpdated) {
          window.location.href = window.location.pathname + "?reloadZoho=true";
        } else {
          window.location.href = response.body.data.accessUrl;
        }
      })
      .catch((error) => {
        invoiz.page.showToast({
          message: getResource("getSubscriptionStateErrorMessage"),
          type: "error",
        });
        throw error;
      });
  }
};
