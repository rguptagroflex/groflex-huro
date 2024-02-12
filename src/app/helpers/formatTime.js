import moment from "moment";
import config from "oldConfig";
import _ from "lodash";

export const formatTime = (date, format) => {
  if (!_.isString(date) && date.toISOString) {
    date = date.toISOString();
  }

  format = format || config.datetimeFormat.api;
  date = date.split("T");

  return moment(date, format).format("HH:mm");
};
