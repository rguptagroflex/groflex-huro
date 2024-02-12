import invoiz from "services/invoiz.service";
import config from "oldConfig";

export const fetchDeveloperProfile = (callback) => {
  invoiz
    .request(`${config.resourceHost}developer/profile`, {
      auth: true,
      method: "GET",
    })
    .then(({ body: { data } }) => {
      callback && callback(data);
    })
    .catch((err) => {
      callback && callback(null, true);
    });
};
