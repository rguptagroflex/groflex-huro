import { formatDate } from 'helpers/formatDate';
import { formatCurrency } from 'helpers/formatCurrency';
import { transactionTypes } from 'helpers/constants';
import { getResource } from 'helpers/resource';

const {
	TRANSACTION_TYPE_INVOICE,
	TRANSACTION_TYPE_OFFER,
	TRANSACTION_TYPE_DEPOSIT_INVOICE,
	TRANSACTION_TYPE_CLOSING_INVOICE,
	TRANSACTION_TYPE_RECURRING_INVOICE,
	TRANSACTION_TYPE_STANDAED_QUOTATION,
	TRANSACTION_TYPE_IMPRESS_QUOTATION,
	TRANSACTION_TYPE_EXPENSE,
	TRANSACTION_TYPE_PURCHASE_ORDER
} = transactionTypes;

export default class ArticleHistoryItem {
	constructor(data) {
		data = !data ? {} : data;

		this.id = data.id;

		this.amount = data.amount;
		this.cancellationDate = data.cancellationDate;
		this.cancellationId = data.cancellationId;
		this.cancellationNumber = data.cancellationNumber;
		this.customer = data.customer;
		this.date = data.date;
		this.number = data.number;
		this.price = data.price || 0;
		this.priceGross = data.priceGross || 0;
		this.sortId = data.sortId;
		this.state = data.state;
		this.type = data.type;
		this.typeOfType = data.typeOfType;
		this.exchangeRate = data.exchangeRate;
	}

	get displayDate() {
		return this.date ? formatDate(this.date) : '-';
	}

	get displayNumber() {
		return this.state === 'draft' ? getResource('str_draft') : this.number;
	}

	get displayPrice() {
		if (this.exchangeRate > 0) {
			return formatCurrency(this.price * this.exchangeRate);
		} else {
		return formatCurrency(this.price);
		}
	}

	get displayQuantity() {
		return parseInt(this.amount);
	}

	get displayType() {
		switch (this.type) {
			case TRANSACTION_TYPE_RECURRING_INVOICE:
			case TRANSACTION_TYPE_INVOICE:
				return getResource('str_invoice');
			case TRANSACTION_TYPE_OFFER:
				return getResource('str_offer');
			case TRANSACTION_TYPE_PURCHASE_ORDER:
				return getResource('str_purchaseOrder');
			case TRANSACTION_TYPE_EXPENSE:
				return getResource('str_expense');
			case TRANSACTION_TYPE_DEPOSIT_INVOICE:
				return getResource('str_partialInvoice');
			case TRANSACTION_TYPE_CLOSING_INVOICE:
				return getResource('str_financialStatement');
			default:
				return getResource('operation');
		}
	}

	get itemUrl() {
		switch (this.type) {
			case TRANSACTION_TYPE_RECURRING_INVOICE:
			case TRANSACTION_TYPE_INVOICE:
			case TRANSACTION_TYPE_DEPOSIT_INVOICE:
			case TRANSACTION_TYPE_CLOSING_INVOICE:
				return `/invoice/${this.id}`;
			case TRANSACTION_TYPE_EXPENSE:
				return `/expense/edit/${this.id}`;
			case TRANSACTION_TYPE_PURCHASE_ORDER:
				return `/purchase-order/${this.id}`;
			case TRANSACTION_TYPE_OFFER:
				if (this.typeOfType === TRANSACTION_TYPE_STANDAED_QUOTATION) {
					return `/offer/${this.id}`;
				} else if (this.typeOfType === TRANSACTION_TYPE_IMPRESS_QUOTATION) {
					return `/offer/impress/detail/${this.id}`;
				}
		}
	}
}
