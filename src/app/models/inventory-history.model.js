import _ from 'lodash';
import { formatCurrency } from 'helpers/formatCurrency';
import { getResource } from 'helpers/resource';
import config from 'config';
import { formatApiDate } from '../helpers/formatDate';

export default class InventoryHistory {
	constructor(data) {
		data = !data ? {} : data;

        this.id = data.id;
        this.inventoryId = data.inventoryId;
		this.action = data.action;
		this.source = data.source;
		this.itemModifiedDate = data.itemModifiedDate;
        this.quantity = data.quantity || 0;
        this.value = data.value || 0;
        this.currentStock = data.currentStock || 0;
		this.title = data.title;
		this.purchasePrice = data.purchasePrice;
		this.unit = data.unit;
		this.price = data.price;
		this.priceGross = data.priceGross;
		this.openingQuantity = data.openingQuantity;
		this.historyStock = data.historyStock;
	}

	// get displayPurchasePrice() {
	// 	return formatCurrency(this.purchasePrice);
	// }

	// get displayPurchasePriceGross() {
	// 	return formatCurrency(this.purchasePriceGross);
	// }

	// get displayPurchaseVatPercent() {
	// 	return `${this.purchaseVatPercent}%`.replace('.', ',');
	// }

	// get displayPrice() {
	// 	return formatCurrency(this.price);
	// }

	// get displayPriceGross() {
	// 	return formatCurrency(this.priceGross);
	// }

	// get displayVatPercent() {
	// 	return `${this.vatPercent}%`.replace('.', ',');
	// }

	// get displayCategory() {
	// 	return this.category || getResource('str_noInformation');
	// }

	// get displayHsnSacCode() {
	// 	return this.hsnSacCode || getResource('str_noInformation');
	// }

	// get tempId() {
	// 	return this.id || _.uniqueId('temp');
	// }
}
