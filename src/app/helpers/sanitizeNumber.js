import _ from 'lodash';
import Formatter from 'accounting';

export default (value, { precision, thousand, decimal, min, max }) => {
	if (!_.isString(value)) {
		value = Formatter.formatNumber(value, { precision, thousand, decimal });
	}
	if (value !== '') {
		value = Formatter.unformat(value, decimal);
	}

	// only needed for spinner input
	const isMin = value <= min;
	const isMax = value >= max;

	// set value to min if value is lower
	if (!isNaN(min)) {
		value = Math.max(min, value);
	}

	// set value to max if value is higher
	if (!isNaN(max)) {
		value = Math.min(max, value);
	}

	if (value !== '') value = parseFloat(value.toFixed(precision));

	return {
		value,
		isMax,
		isMin
	};
};
