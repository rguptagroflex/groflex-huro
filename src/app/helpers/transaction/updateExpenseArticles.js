import invoiz from "services/invoiz.service";
import config from "oldConfig";
import q from "q";
import TransactionPositionType from "enums/transaction-position-type.enum";
import { generateUuid } from "helpers/generateUuid";
import { getResource } from "../resource";
import { saveInventory } from "./saveInventory";
import InventoryAction from "enums/inventory/inventory-action.enum";

export const updateExpenseArticles = (
  positions,
  customerData,
  errorCallback
) => {
  const deferred = q.defer();

  if (invoiz.user.autoCreateArticles && positions && positions.length > 0) {
    const articles = [];
    const inventoryItems = [];
    let isArticleTitleEmpty = false;

    isArticleTitleEmpty = positions.find((position) => {
      return position.title.trim().length === 0;
    });

    if (isArticleTitleEmpty) {
      deferred.reject();
      invoiz.page.showToast({
        type: "error",
        message: getResource("articleNameErrorMessage"),
      });
    } else {
      positions.map((position) => {
        const inventoryItem = {
          articleId: position.metaData.id,
          trackedInInventory: false,
          number: position.metaData.number,
          title: position.title,
          unit: position.unit,
          price: position.priceNet,
          priceGross: position.priceGross,
          vatPercent: position.vatPercent,
          openingBalance:
            position.openingBalance === 0 || position.openingBalance === null
              ? position.amount
              : position.openingBalance,
          currentStock:
            position.currentStock === 0 || position.currentStock === null
              ? position.openingBalance
              : position.openingBalance,
          minimumBalance: position.minimumBalance,
          quantity: position.quantity,
          purchasePrice: position.purchasePrice,
          action: InventoryAction.INCOMING,
          source: `manual`,
          value:
            parseFloat(position.purchasePrice) *
            parseFloat(position.openingBalance),
          //itemModifiedDate: documentDate
        };
        const article = {
          id: position.metaData.id,
          uniqueidentifier: position.metaData.uniqueidentifier,
          number: position.metaData.number,
          title: position.title,
          description: position.description,
          unit: position.unit,
          calculationBase: position.metaData.calculationBase,
          purchasePrice:
            position.price >= 0 ? position.price : position.priceNet,
          purchasePriceGross: position.priceGross,
          // purchaseVatPercent: position.vatPercent,
          vatPercent: position.vatPercent,
          hsnSacCode: position.hsnSacCode,
          //trackedInInventory: position.trackedInInventory ? inventoryItems.push(inventoryItem) : false,
          trackedInInventory: position.trackedInInventory,
        };

        if (
          position.id &&
          position.metaData.type === TransactionPositionType.CUSTOM
        ) {
          position.metaData.uniqueidentifier = article.uniqueidentifier =
            generateUuid();
        }

        if (position.metaData.type !== TransactionPositionType.TIMETRACKING) {
          if (customerData.countryIso === "IN") {
            articles.push(article);
          }
        }
      });

      if (articles.length === 0) {
        deferred.resolve();
      } else {
        invoiz
          .request(`${config.resourceHost}article`, {
            auth: true,
            method: "PUT",
            data: {
              articles,
              //	inventoryItems
            },
          })
          .then(
            ({
              body: {
                data: { articles },
              },
            }) => {
              positions.forEach((position) => {
                const updatedArticle = articles.find(
                  (article) =>
                    article.uniqueidentifier &&
                    article.uniqueidentifier ===
                      position.metaData.uniqueidentifier
                );
                if (updatedArticle) {
                  delete position.metaData.uniqueidentifier;
                  position.metaData.id = updatedArticle.id;
                  position.metaData.calculationBase =
                    updatedArticle.calculationBase;
                  position.metaData.number = updatedArticle.number;
                  position.metaData.purchasePrice =
                    updatedArticle.purchasePrice;
                  position.metaData.type = "article";
                  position.trackedInInventory = false;
                  // if (position.trackedInInventory !== false && position.trackedInInventory !== null) {
                  // 	saveInventory(positions, documentDate, errorCallback);
                  // }
                }
              });

              deferred.resolve();
            }
          )
          .catch((err) => {
            invoiz.page.showToast({
              type: "error",
              message: getResource("defaultErrorMessage"),
            });
            deferred.reject();
            errorCallback && errorCallback();
          });
      }
    }
  } else {
    if (positions && positions.length > 0 && !invoiz.user.autoCreateArticles) {
      positions.forEach((position) => {
        if (position.metaData && position.metaData.uniqueidentifier) {
          delete position.metaData.uniqueidentifier;
        }
      });
    }

    deferred.resolve();
  }

  return deferred.promise;
};
