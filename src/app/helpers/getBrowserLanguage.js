import config from "oldConfig";

export const getBrowserLanguage = (defaultLang = "en") => {
  let browserLanguage =
    window.navigator.language || window.navigator.userLanguage;
  if (browserLanguage.includes("-")) {
    browserLanguage = browserLanguage.split("-")[0];
  }
  if (config.supportedLanguages.includes(browserLanguage)) {
    return browserLanguage.toLowerCase();
  }
  return defaultLang;
};
