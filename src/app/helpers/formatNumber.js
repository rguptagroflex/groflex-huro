import accounting from "accounting";
import config from "oldConfig";
import indianNumberFormat from "indian-number-format";

export const formatNumber = (value, options) => {
  // const opts = options || {
  // 	decimal: config.currencyFormat.decimal,
  // 	precision: config.currencyFormat.precision,
  // 	thousand: config.currencyFormat.thousand
  // };
  // return accounting.formatNumber(value, opts);
  if (Number.isInteger(value)) {
    return indianNumberFormat.formatFixed(value);
  } else {
    return indianNumberFormat.formatFixed(
      value,
      config.currencyFormat.precision
    );
  }
};

export const formatNumberCode = (value) => {
  return accounting.formatNumber(value, 3);
};

export const formatNumberSymbol = (value) => {
  return accounting.formatNumber(value, 2);
};
