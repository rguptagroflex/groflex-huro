import _ from 'lodash';
import { formatCurrency } from 'helpers/formatCurrency';
import { getResource } from 'helpers/resource';
import config from 'config';
import { formatApiDate } from '../helpers/formatDate';

export default class Inventory {
	constructor(data) {
		data = !data ? {} : data;

		this.id = data.id;
		this.number = data.number;
		this.title = data.title;
		this.unit = data.unit;
		this.articleId = data.articleId;
		this.currentStock = data.currentStock || null;
		this.minimumBalance = data.minimumBalance || 0;
		this.lowStockAlert = data.lowStockAlert;
		this.action = data.action;
		this.source = data.source;
		this.updatedAt = data.updatedAt;
		this.quantity = data.quantity || null;
		this.purchasePrice = data.purchasePrice || 0;
		this.purchasePriceGross = data.purchasePriceGross || 0;
		this.price = data.price || 0;
		this.priceGross = data.priceGross || 0;
		this.category = data.category || '';
		this.description = data.description;
		this.vatPercent = data.vatPercent >= 0 ? data.vatPercent : config.defualtVatPercent;
		this.value = data.value || 0;
		this.quantity = data.quantity || null;
		this.openingBalance = data.openingBalance || 0;
		this.avgPurchaseValue = data.avgPurchaseValue || 0;
		this.itemModifiedDate = data.itemModifiedDate;
		this.openingQuantity = data.openingQuantity;
		this.historyStock = data.historyStock;
	}

	get displayPurchasePrice() {
		return formatCurrency(this.purchasePrice);
	}

	get displayPurchasePriceGross() {
		return formatCurrency(this.purchasePriceGross);
	}

	// get displayPurchaseVatPercent() {
	// 	return `${this.purchaseVatPercent}%`.replace('.', ',');
	// }

	get displayPrice() {
		return formatCurrency(this.price);
	}

	get displayPriceGross() {
		return formatCurrency(this.priceGross);
	}

	get displayVatPercent() {
		return `${this.vatPercent}%`.replace('.', ',');
	}

	get displayCategory() {
		return this.category || getResource('str_noInformation');
	}

	get displayHsnSacCode() {
		return this.hsnSacCode || getResource('str_noInformation');
	}

	get tempId() {
		return this.id || _.uniqueId('temp');
	}
}
