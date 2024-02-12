import Formatter from "accounting";
import indianNumberFormat from "indian-number-format";
// import config from "oldConfig";

export const formatPercent = (number, props) => {
  if (Number.isInteger(number)) {
    return indianNumberFormat.formatFixed(number) + "%";
  } else {
    return indianNumberFormat.formatFixed(number, props.precision) + "%";
  }
  // return parseFloat(indianNumberFormat.formatFixed(number, config.currencyFormat.precision)) + '%';
  // return (
  // 	Formatter.formatNumber(number, {
  // 		precision: props.precision,
  // 		decimal: props.decimal,
  // 		thousand: props.thousand
  // 	}) + '%'
  // );
};
