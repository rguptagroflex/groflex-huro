import lang from 'lang';
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
import InvoiceState from 'enums/invoice/invoice-state.enum';
import OfferState from 'enums/offer/offer-state.enum';
import ExpensePayKind from 'enums/expense/expense-paykind.enum';
import PurchaseOrderState from 'enums/purchase-order/purchase-order-state.enum';
export default class CustomerDocumentItem {
	constructor(data) {
		data = !data ? {} : data;

		this.id = data.id;
		this.cancellationDate = data.cancellationDate;
		this.cancellationId = data.cancellationId;
		this.cancellationNumber = data.cancellationNumber;
		this.date = data.date;
		this.number = data.number;
		this.state = data.state;
		this.total = data.total || 0;
		this.totalGross = data.totalGross || 0;
		this.totalNet = data.totalNet || 0;
		this.type = data.type;
		this.documentType = data.documentType;
	}

	get displayDate() {
		return this.date ? formatDate(this.date) : '-';
	}

	get displayNumber() {
		return this.state === 'draft' ? getResource('str_draft') : this.number;
	}

	get displayState() {
		switch (this.state) {
			case InvoiceState.DRAFT:
				return getResource("str_draft");
			case InvoiceState.LOCKED:
				return `Open`;
			case InvoiceState.RECURRING_TEMPLATE:
				return this.state;
			case InvoiceState.CANCELLED:
				return getResource("str_canceled");
			case InvoiceState.LOCKED:
				return getResource("str_locked");
			case InvoiceState.RECURRING_TEMPLATE:
				return this.state;
			case InvoiceState.CANCELLED:
				return getResource("str_canceled");
			case InvoiceState.DUNNED:
				return getResource("str_dunning");
			case InvoiceState.PARTIALLY_PAID:
				return `Partially paid`;
			case InvoiceState.RECURRING_TEMPLATE:
				return `Recurring template`;
			case InvoiceState.PRINTED:
				return getResource("str_print");
			case InvoiceState.SENT:
				return getResource("str_sent");
			case InvoiceState.PAID:
				return `Paid`;
			case InvoiceState.OPEN:
				return `Open`
			case InvoiceState.DOWNLOADED:
				return `Downloaded`;
			case OfferState.ACCEPTED:
				return `Accepted`;
			case OfferState.REJECTED:
				return `Rejected`;
			case OfferState.DRAFT:
				return getResource("str_draft");
			case OfferState.INVOICED:
				return `Invoiced`;
			case OfferState.OPEN:
				return `Open`;
			case OfferState.PROJECT_CREATED:
				return `Project created`;
			case OfferState.TEMP:
				return `Temp`;
			case OfferState.INVOICED:
				return `Invoiced`;
			case ExpensePayKind.BANK:
				return `Paid - Bank`;
			case ExpensePayKind.CASH:
				return `Paid - Cash`;
			case ExpensePayKind:
				return `Open`;
			case PurchaseOrderState.OPEN:
				return `Open`;
			case PurchaseOrderState.ACCEPTED:
				return `Accepted`;
			case PurchaseOrderState.DRAFT:
				return `Draft`;
			case PurchaseOrderState.EXPENSED:
				return `Expensed`;
			case PurchaseOrderState.PROJECT_CREATED:
				return `Project created`;
			case PurchaseOrderState.REJECTED:
				return `Rejected`;
			case `credits`:
				return `Refund - Credits`;
			case `balance`:
				return `Refund`;
			default:
				return this.state;
		}
	}

	get displayPrice() {
		return formatCurrency(this.totalGross);
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
			case `credits`:
				return `Credit note`;
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
			case `credits`:
				return `/cancellation/${this.id}`
		}
	}
}
