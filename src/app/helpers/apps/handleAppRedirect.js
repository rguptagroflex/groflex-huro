import invoiz from "services/invoiz.service";
import config from "oldConfig";
import React from "react";
import lang from "lang";
import AppType from "enums/apps/app-type.enum";
import ModalService from "services/modal.service";
import WebStorageService from "services/webstorage.service";
import WebStorageKey from "enums/web-storage-key.enum";

export const handleAppRedirect = (app) => {
  let callbackUrlPendo = null;

  switch (app.attributes.invoizAppType) {
    case AppType.CLEVERREACH:
      invoiz.router.navigate("/cleverreach");
      break;
    case AppType.MITE:
      invoiz.router.navigate("/mite");
      break;

    case AppType.ACCOUNTANT_EXPORT:
      invoiz.router.navigate("/settings/document-export");
      break;

    case AppType.AUTO_DUNNING:
      invoiz.router.navigate("/settings/dunning");
      break;

    case AppType.BANKING:
      invoiz.router.navigate("/banking/financecockpit");
      break;

    case AppType.IMPORT:
      invoiz.router.navigate("/settings/data-import");
      break;

    case AppType.IMPRESS:
      invoiz.router.navigate("/offer/impress/templates", false, false, true);
      break;

    case AppType.OFFERS:
      invoiz.router.navigate("/offers");
      break;

    case AppType.PROJECTS:
      invoiz.router.navigate("/invoices/project");
      break;

    case AppType.RECURRING_INVOICES:
      invoiz.router.navigate("/invoices/recurringinvoice");
      break;

    case AppType.TRACKED_TIMES:
      invoiz.router.navigate("/invoices/timetracking");
      break;

    case AppType.SLACK:
      invoiz
        .request(`${config.resourceHost}slack/incoming-webhook`, {
          method: "GET",
          auth: true,
        })
        .then((res) => {
          const {
            data: { incomingWebhooks },
          } = res.body;

          if (!incomingWebhooks || incomingWebhooks.length === 0) {
            invoiz
              .request(`${config.resourceHost}slack/oauth-url`, {
                method: "GET",
                auth: true,
              })
              .then((res) => {
                const {
                  data: { url },
                } = res.body;

                window.location.href = url;
              });
          } else {
            ModalService.open(
              <SlackConnectionModalComponent channels={incomingWebhooks} />,
              {
                modalClass: "slack-connection-modal-component",
                width: 580,
                padding: 40,
              }
            );
          }
        })
        .catch(() => {
          invoiz.showNotification({
            type: "error",
            message: lang.defaultErrorMessage,
          });
        });
      break;

    case AppType.DELIVERY_NOTES:
      invoiz.router.navigate("/deliverynotes");
      break;

    case AppType.ARCHIVE_MAILS:
      WebStorageService.setItem(WebStorageKey.EMAIL_VIEW, true);
      invoiz.router.navigate("/settings/account");
      break;

    case AppType.PRELIMINARY_TURNOVER_TAX_RETURN:
      invoiz.router.navigate("/settings/preliminary-turnover-tax-return");
      break;

    case AppType.DEFAULT:
      if (app.customData.callbackUrl.indexOf("?pendo") !== -1) {
        callbackUrlPendo = app.customData.callbackUrl;

        if (callbackUrlPendo.substring(0, 1) === "/") {
          callbackUrlPendo = callbackUrlPendo.substring(1);
        }

        invoiz.router.navigate(
          window.location.pathname + callbackUrlPendo,
          true,
          true
        );
      } else if (app.customData && app.customData.callbackUrl) {
        invoiz.router.navigate(app.customData.callbackUrl);
      }

      break;
  }
};
