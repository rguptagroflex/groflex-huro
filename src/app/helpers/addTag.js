import q from "q";
import invoiz from "services/invoiz.service";
import { format } from "util";
import config from "oldConfig";
import { getMiscellaneousData } from "helpers/getSettingsData";
import { getResource } from "./resource";

const CONTACT_SETTINGS = ["salutations", "titles", "jobTitles"];

const ARTICLE_SETTINGS = ["articleCategories", "articleUnits"];

const CUSTOMER_SETTINGS = ["customerCategories"];

export default (view, fieldName, type, title, value, cb) => {
  let url;

  // return if modelType isn't specified
  if (!type) {
    return console.log("No model type declared!");
  }
  // return if no or wrong callback is defiend
  if (!cb || typeof cb !== "function") {
    return console.log("No callback or wrong type for callback is defined");
  }

  // set url depending on type
  if (CONTACT_SETTINGS.indexOf(type) > -1) {
    url = config.settings.endpoints.contact;
  } else if (ARTICLE_SETTINGS.indexOf(type) > -1) {
    url = config.settings.endpoints.article;
  } else if (CUSTOMER_SETTINGS.indexOf(type) > -1) {
    url = config.settings.endpoints.customer;
  }

  // add new tag to existing tags
  const pushNewTag = (res) => {
    const tags = res.body.data;
    tags[type].push(value);
    return tags;
  };
  // save tags
  const saveTag = (tags) => {
    const data = {};
    switch (type) {
      case "articleCategories":
        data.categories = tags[type];
        break;
      case "articleUnits":
        data.units = tags[type];
        break;
      case "customerCategories":
        data.categories = tags[type];
        break;
      default:
        data[type] = tags[type];
    }
    return invoiz.request(url, { auth: true, method: "POST", data });
  };
  // handle success
  const onSuccess = () => {
    view.showToast({
      message: format(getResource("tagAddSuccessMessage"), title, value),
    });
    cb({ name: value });
  };
  // handle error and clear selectize
  const onError = () => {
    const field = view.getField(fieldName);

    if (field) {
      field.selectize.clear();
      field.selectize.setTextboxValue("");
    }

    view.showToast({
      type: "error",
      message: getResource("tagAddErrorMessage"),
    });
    cb({});
  };

  // first get existing tags from server
  q.fcall(getMiscellaneousData)
    .then(pushNewTag)
    .then(saveTag)
    .then(onSuccess)
    .catch(onError)
    .done();
};
