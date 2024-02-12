import invoiz from "services/invoiz.service";
import WebStorageService from "services/webstorage.service";
import WebStorageKey from "enums/web-storage-key.enum";
import ChargebeeAddon from "enums/chargebee-addon.enum";
import ChargebeePlan from "enums/chargebee-plan.enum";

import config from "oldConfig";
import { getResource } from "./resource";

export const redirectToChargebee = (planId, isUpgrade, addon) => {
  if (!addon) addon = ChargebeeAddon.CHARGEBEE_ADDON_QUOTATION;

  let isRedirecting = false;
  let url = "";
  if (planId == ChargebeePlan.ACCOUNTING_TRIAL_PLAN) {
    url =
      config.settings.endpoints.updateSubscriptionToTrial +
      "/" +
      planId +
      "?returnUrl=" +
      window.location.pathname +
      "&reloadChargebee=true" +
      "&addonId=" +
      addon;
  } else if (planId) {
    url =
      config.account.endpoints.getSubscriptionHostedPageSession +
      "/" +
      planId +
      "?returnUrl=" +
      window.location.pathname +
      "&reloadChargebee=true" +
      "&addonId=" +
      addon;
  } else {
    url =
      config.account.endpoints.getSubscriptionPortalSession +
      "?returnUrl=" +
      window.location.pathname +
      "?reloadChargebee=true";

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

        invoiz.trigger(WebStorageKey.HIDE_FOOTER);
        WebStorageService.setItem(WebStorageKey.HIDE_FOOTER, "true", true);
        if (response.body.data && response.body.data.isFreePlanUpdated) {
          window.location.href =
            window.location.pathname + "?reloadChargebee=true&state=succeeded";
        } else {
          window.location.href = response.body.data.accessUrl;
        }
      })
      .catch((error) => {
        if (
          error.body &&
          error.body.meta.planId &&
          error.body.meta.planId[0].code
        ) {
          invoiz.page.showToast({
            message: error.body.meta.planId[0].code,
            type: "error",
          });
          window.location.href = window.location.pathname;
        }

        invoiz.page.showToast({
          message: getResource("getSubscriptionStateErrorMessage"),
          type: "error",
        });
        throw error;
      });
  }
};
