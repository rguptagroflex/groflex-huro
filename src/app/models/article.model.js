import _ from 'lodash';
import { formatCurrency } from 'helpers/formatCurrency';
import { getResource } from 'helpers/resource';
import config from 'config';
import { formatApiDate } from '../helpers/formatDate';

export default class Article {
	constructor(data) {
		data = !data ? {} : data;

		this.id = data.id;
		this.inventoryId = data.inventoryId;
		this.calculationBase = data.calculationBase || 'net';
		this.category = data.category || '';
		this.description = data.description;
		this.eanNo = data.eanNo;
		this.images = data.images || [];
		this.mandator = data.mandator;
		this.matchCode = data.matchCode;
		this.notes = data.notes;
		this.notesAlert = data.notesAlert;
		this.number = data.number;
		this.price = data.price || 0;
		this.priceGross = data.priceGross || 0;
		this.salesVolumeData = data.salesVolumeData;
		this.tempUuid = data.tempUuid;
		this.title = data.title;
		this.unit = data.unit;
		this.uniqueidentifier = data.uniqueidentifier;
		this.vatPercent = data.vatPercent >= 0 ? data.vatPercent : config.defualtVatPercent;
		this.hsnSacCode = data.hsnSacCode || '';
		this.purchasePrice = data.purchasePrice || 0;
		this.purchasePriceGross = data.purchasePriceGross || 0;
		this.trackedInInventory = data.trackedInInventory || false;
		this.currentStock = data.currentStock || null;
		this.minimumBalance = data.minimumBalance || null;
		this.value = data.value || 0;
		this.updatedAt = data.updatedAt;
		this.openingBalance = data.openingBalance || null;
		this.avgPurchaseValue = data.avgPurchaseValue || 0;
		this.itemModifiedDate = data.itemModifiedDate;
		this.openingQuantity = data.openingQuantity;
		this.historyStock = data.historyStock;
		this.mrp = data.mrp || 0.0;
		this.metaData = data.metaData || {};
		this.isValidated = data.isValidated;
		this.imageUrl = data.imageUrl
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
	get displayMRP() {
		return formatCurrency(this.mrp);
	}

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
		return this.category || getResource('str_notAvailable');
	}

	get displayHsnSacCode() {
		return this.hsnSacCode || getResource('str_notAvailable');
	}

	get displayEANCode() {
		return this.eanNo || getResource('str_notAvailable');
	}

	get tempId() {
		return this.id || _.uniqueId('temp');
	}
}
