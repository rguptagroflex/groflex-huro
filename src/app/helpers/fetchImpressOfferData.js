import invoiz from "services/invoiz.service";
import config from "oldConfig";
import { sortObjectArrayByProperty } from "helpers/sortObjectArrayByProperty";
import { applyTheme, impressThemes } from "shared/impress/impress-themes";
import { generateUuid } from "helpers/generateUuid";
import { getResource } from "./resource";

const applyImpressTheme = (offerData) => {
  const theme =
    offerData && offerData.globalSettings && offerData.globalSettings.theme;
  applyTheme(theme);
};

export const fetchImpressOfferData = (options) => {
  invoiz
    .request(`${config.resourceHost}offer/${options.offerId}`, { auth: true })
    .then(({ body: { data } }) => {
      const impressPages = data.offer.impressPages;
      const impressData = data.offer.impressData;
      sortObjectArrayByProperty(impressPages, "position");

      if (
        data.offer.customerId &&
        data.offer.customerData &&
        Object.keys(data.offer.customerData).length > 0
      ) {
        data.offer.customerData.id = data.offer.customerId;
      }

      if (
        impressData &&
        impressData.theme &&
        impressData.theme.items &&
        impressData.theme.items.length === 5
      ) {
        impressData.theme = JSON.parse(
          JSON.stringify(
            impressThemes.find((theme) => theme.title === "Standard")
          )
        );
      } else if (impressData && impressData.theme && !impressData.theme.items) {
        impressData.theme = {
          items: JSON.parse(JSON.stringify(impressThemes))[0].items,
        };

        impressData.theme.items.forEach((item) => {
          if (item.key === "backgroundPage") {
            item.name = getResource("str_pageBackground");
          }

          if (item.key === "fontPage") {
            item.name = getResource("str_fontColorPage");
          }

          if (item.key === "backgroundNavigation") {
            item.name = getResource("str_backgroundNavigation");
          }

          if (item.key === "fontNavigation") {
            item.name = getResource("str_fontColorNavigation");
          }

          if (item.key === "activeNavigationItem") {
            item.name = getResource("str_activeNavigationPoint");
          }
        });
      }

      const offerData = {
        standardOfferData: data.offer,
        globalSettings: {
          logo: invoiz.user.logoPath,
          theme: impressData && impressData.theme,
          positionsBlockExists: !!(
            impressData && impressData.positionsBlockExists
          ),
        },
        pages: impressPages,
      };

      if (
        offerData.standardOfferData &&
        offerData.standardOfferData.positions
      ) {
        offerData.standardOfferData.positions.forEach((pos) => {
          pos.tempId = generateUuid();
        });
      }

      invoiz
        .request(
          `${config.resourceHost}impress/${options.offerId}/pages/${offerData.pages[0].id}`,
          {
            auth: true,
          }
        )
        .then(
          ({
            body: {
              data: { blocks },
            },
          }) => {
            offerData.pages[0].blocks = blocks;
            offerData.pages[0].selected = true;
            offerData.pages[0].isEdited = true;

            applyImpressTheme(offerData);
            options.onSuccess && options.onSuccess(offerData, blocks);
          }
        )
        .catch((error) => {
          options.onError && options.onError(error);
        });
    })
    .catch((error) => {
      options.onError && options.onError(error);
    });
};
