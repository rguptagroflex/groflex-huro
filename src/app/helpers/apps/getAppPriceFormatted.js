import AppType from 'enums/apps/app-type.enum';
import _ from 'lodash';
import { formatCurrency } from 'helpers/formatCurrency';

export const getAppPriceFormatted = (app) => {
	let price = app.customData && app.customData.price;

	if (price && !isNaN(price)) {
		price = price / 100;
		price = price.toString().replace('.', ',');
		price = price + ' €';
	} else if (!price || price === 0) {
		price = 'Gratis';
	}

	if (app.attributes && app.attributes.invoizAppType === AppType.IMPRESS) {
		price = 'ab 3,99 €';
	}

	return price || '';
};

export const getTotalAppPriceFormatted = (app) => {
	const price = app.customData.price;
	let totalAppPrice;

	totalAppPrice = _.round(((price * 12) / 100) * 1.16, 2);
	totalAppPrice = formatCurrency(totalAppPrice);

	return totalAppPrice || '';
};
