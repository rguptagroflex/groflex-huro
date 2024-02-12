import invoiz from "services/invoiz.service";
import config from "oldConfig";

export const saveInventory = (requestData) => {
  return new Promise((resolve, reject) => {
    invoiz
      .request(`${config.resourceHost}inventory`, {
        auth: true,
        method: "PUT",
        data: {
          positions: [...requestData],
        },
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
