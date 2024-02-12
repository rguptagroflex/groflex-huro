import moment from "moment";
import config from "oldConfig";
import { getResource } from "./resource";

export const formatDate = (date, originalFormat, expectedFormat) => {
  return moment(date, originalFormat || config.dateFormat.api).format(
    expectedFormat || config.dateFormat.client
  );
};

export const formatDateLong = (date) => {
  const weekdayShort = getResource("weekdayNames")[
    new Date(date).getDay()
  ].substr(0, 2);
  const monthDay = new Date(date).getDate();
  const monthName = getResource("monthNames")[new Date(date).getMonth()];
  const fullYear = new Date(date).getFullYear();

  return `${weekdayShort}, ${monthDay}. ${monthName} ${fullYear}`;
};

export const getMonthName = (monthIndex) => {
  return getResource("monthNames")[new Date().getMonth() + monthIndex];
};
export const formatApiDate = (date, originalFormat) => {
  if (!date) {
    date = moment();
  }
  if (date._isAMomentObject) {
    return date.format(config.dateFormat.api);
  }
  return moment(date, originalFormat || config.dateFormat.client).format(
    config.dateFormat.api
  );
};

export const formatClientDate = (date, originalFormat) => {
  if (!date) {
    date = moment();
  }
  if (date._isAMomentObject) {
    return date.format(config.dateFormat.client);
  }
  return moment(date, originalFormat || config.dateFormat.api).format(
    config.dateFormat.client
  );
};
export const formateClientDateMonth = (date, originalFormat) => {
  if (!date) {
    date = moment();
  }
  if (date._isAMomentObject) {
    return date.format("DD-MM");
  }
  return moment(date, originalFormat || config.dateFormat.api).format("DD-MM");
};
export const formateClientDateMonthYear = (date, originalFormat) => {
  if (!date) {
    date = moment();
  }
  if (date._isAMomentObject) {
    return date.format("DD-MM-YY");
  }
  return moment(date, originalFormat || config.dateFormat.api).format(
    "DD-MM-YY"
  );
};
