import invoiz from "services/invoiz.service";
import config from "oldConfig";
import groflexService from "../services/groflex.service";

// export const getPayConditions = () =>
//   invoiz.request(config.settings.endpoints.payConditions, { auth: true });
// export const getPayConditionById = (id) =>
//   invoiz.request(`${config.settings.endpoints.payConditions}/${id}`, {
//     auth: true,
//   });
// export const getMiscellaneousData = () =>
//   invoiz.request(config.settings.endpoints.miscellaneousData, { auth: true });
// export const getNumerationSettings = () =>
//   invoiz.request(config.settings.endpoints.getNumerationSettings, {
//     auth: true,
//   });
// export const getTextModules = () =>
//   invoiz.request(config.settings.endpoints.textModule, { auth: true });
// export const getLatestRate = () =>
//   invoiz.request(config.settings.endpoints.getLatestRate, { auth: true });
// export const getConvertRate = () =>
//   invoiz.request(config.settings.endpoints.convertRate, { auth: true });

//With groflex service
export const getPayConditions = () =>
  groflexService.request(config.settings.endpoints.payConditions, {
    auth: true,
  });
export const getPayConditionById = (id) =>
  groflexService.request(`${config.settings.endpoints.payConditions}/${id}`, {
    auth: true,
  });
export const getMiscellaneousData = () =>
  groflexService.request(config.settings.endpoints.miscellaneousData, {
    auth: true,
  });
export const getNumerationSettings = () =>
  groflexService.request(config.settings.endpoints.getNumerationSettings, {
    auth: true,
  });
export const getTextModules = () =>
  groflexService.request(config.settings.endpoints.textModule, { auth: true });
export const getLatestRate = () =>
  groflexService.request(config.settings.endpoints.getLatestRate, {
    auth: true,
  });
export const getConvertRate = () =>
  groflexService.request(config.settings.endpoints.convertRate, { auth: true });
