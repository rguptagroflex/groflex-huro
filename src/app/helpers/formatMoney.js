// import Formatter from 'accounting';
import indianNumberFormat from "indian-number-format";
import accounting from "accounting";
import config from "oldConfig";

export const formatMoney = (number, props) => {
  // return Formatter.formatMoney(number, {
  // 	symbol: props.symbol,
  // 	precision: props.precision,
  // 	decimal: props.decimal,
  // 	thousand: props.thousand,
  // 	format: props.format
  // });
  if (Number.isInteger(number)) {
    return `${props.symbol} ` + indianNumberFormat.formatFixed(number);
  } else {
    return (
      `${props.symbol} ` +
      indianNumberFormat.formatFixed(number, props.precision)
    );
  }
};

export const formatMoneySymbol = (number, code) => {
  return accounting.formatMoney(number, config.currencyFormats[code].currency);
};

export const formatMoneyCode = (number) => {
  return accounting.formatMoney(number, {
    symbol: "INR",
    format: "%v %s",
    precision: 3,
  });
};
