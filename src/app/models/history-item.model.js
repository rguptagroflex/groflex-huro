import lang from 'lang';
import moment from 'moment';
import config from 'config';
import HistoryTypes from 'enums/history-types.enum';
import { transactionTypes } from 'helpers/constants';
import { formatCurrency } from 'helpers/formatCurrency';

const {
	TRANSACTION_TYPE_INVOICE,
	TRANSACTION_TYPE_OFFER,
	TRANSACTION_TYPE_DEPOSIT_INVOICE,
	TRANSACTION_TYPE_CLOSING_INVOICE,
	TRANSACTION_TYPE_RECURRING_INVOICE,
	TRAANSACTION_TYPE_DELIVERY_NOTE,
	TRANSACTION_TYPE_PURCHASE_ORDER,
	TRANSACTION_TYPE_EXPENSE
} = transactionTypes;

export default class HistoryItem {
	constructor(data) {
		data = !data ? {} : data;

		this.id = data.id;
		this.tenantId = data.tenantId;
		this.customerId = data.customerId;
		this.invoiceId = data.invoiceId;
		this.deliveryNoteId = data.deliveryNoteId;
		this.offerId = data.offerId;
		this.projectId = data.projectId;
		this.todoId = data.todoId;
		this.title = data.title || '';
		this.additionalData = data.additionalData;
		this.historyType = data.historyType;
		this.createdAt = data.createdAt || (data.email && data.email.createdAt);
		this.updatedAt = data.updatedAt;
		this.metaData = data.metaData;
		this.emailId = data.emailId || null;
		this.isOwnEmail = data.emailId !== null;
		this.date = data.date || (data.email && data.email.date);
		this.emailType = data.emailType || undefined;
		this.category = data.category;
		this.cancellationPaymentId = data.cancellationPaymentId;
		this.cancellationDate = data.cancellationDate;
		this.expenseId = data.expenseId;
		this.purchaseOrderId = data.purchaseOrderId;
		this.amount = data.amount;
	}

	get displayAmount() {
		return formatCurrency(this.amount);
	}

	get getType() {
		let type = '';
		if (this.invoiceId) {
			type = 'invoice';
		} else if (this.deliveryNoteId) {
			type = 'deliveryNote';
		} else if (this.offerId) {
			type = 'offer';
		} else if (this.projectId) {
			type = 'project';
		} else if (this.emailId) {
			type = 'email';
		} else if (this.purchaseOrderId) {
			type = 'purchaseOrder';
		} else if (this.expenseId) {
			type = 'expense';
		}
		return type;
	}

	get getTypeProperty() {
		return this.getType + 'Id';
	}

	get formattedTitle() {
		const title = this.title;
		return title.replace(/\n/g, '<br />');
	}

	get formattedCancellationDate() {
		return moment(this.cancellationDateDate).format('DD.MM.YYYY');
	}

	get getDateSubstring() {
		const dateToFormat =
			(this.metaData && this.metaData.date && moment.utc(this.metaData.date)) ||
			this.date ||
			this.createdAt ||
			this.updatedAt;
		let date;

		const currentDate = moment().startOf('day');
		const dueDate = moment(dateToFormat, [config.dateFormat.api, config.dateFormat.client]);
		const diff = dueDate.diff(currentDate, 'days');

		switch (diff) {
			case 0:
				date = 'Today';
				break;
			case -1:
				date = 'Yesterday';
				break;
			case -2:
				date = '2 days ago';
				break;
			case -3:
				date = '3 days ago';
				break;
			case -4:
				date = '4 days ago';
				break;
			case -5:
				date = '5 days ago';
				break;
			case -6:
				date = '6 days ago';
				break;
			default:
				date = moment(dueDate).format('DD/MM/YYYY');
				break;
		}

		return date;
	}

	get displayTransactionType() {
		switch (this.historyType) {
			case TRANSACTION_TYPE_RECURRING_INVOICE:
			case TRANSACTION_TYPE_INVOICE:
				return lang.invoiceTitle;
			case TRANSACTION_TYPE_OFFER:
				return lang.offerTitle;
			case TRANSACTION_TYPE_DEPOSIT_INVOICE:
				return lang.depositInvoiceTitle;
			case TRANSACTION_TYPE_CLOSING_INVOICE:
				return lang.closingInvoiceTitle;
			case TRAANSACTION_TYPE_DELIVERY_NOTE:
				return lang.deliveryNoteTitle;
			default:
				return lang.defaultTitle;
		}
	}

	get displayType() {
		if (this.historyType === HistoryTypes.ACTIVITY) {
			return this.category;
		} else {
			switch (this.historyType) {
				case HistoryTypes.TODO:
					return "To-Do";
				case HistoryTypes.EMAIL:
					return "E-Mail";
				case HistoryTypes.DOCUMENT:
					return "Action";
				case HistoryTypes.PAYMENT:
					return "Payment";
				case HistoryTypes.DUNNING:
					return "Dunning";
				case HistoryTypes.TDS_CHARGE:
					return "TDS charge";
				case HistoryTypes.BANK_CHARGE:
					return "Bank charge";
				case HistoryTypes.DISCOUNT_CHARGE:
					return "Discount";
				case HistoryTypes.MORE_SURCHARGE:
					return "Fee / Surcharge";
				case HistoryTypes.MORE_SETTLE:
					return "Settled";
				default:
					break;
			}
		}
	}

	/* TODO: still to be modified!!!!! */

	get itemUrl() {
		switch (this.historyType) {
			case TRANSACTION_TYPE_RECURRING_INVOICE:
			case TRANSACTION_TYPE_INVOICE:
			case TRANSACTION_TYPE_DEPOSIT_INVOICE:
			case TRANSACTION_TYPE_CLOSING_INVOICE:
				return `/invoice/${this.id}`;
			case TRANSACTION_TYPE_OFFER:
				return `/offer/${this.id}`;
		}
	}

	get icon() {
		if (this.historyType === HistoryTypes.ACTIVITY) {
			switch (this.category) {
				case 'Notiz':
					return 'icon-note';
				case 'Meeting':
					return 'icon-meeting';
				case 'Telefonat':
					return 'icon-phone';
				case 'E-Mail':
					return 'icon-mail';
				default:
					return 'icon-note';
			}
		} else {
			switch (this.historyType) {
				case HistoryTypes.TODO:
					return 'icon-check';
				case HistoryTypes.DOCUMENT:
					return 'icon-document';
				case HistoryTypes.EMAIL:
					return 'icon-mail';
				default:
					return 'icon-document';
			}
		}
	}

	get documentType() {
		if (this.offerId !== null && !this.invoiceId) {
			return 'offer';
		} else if (this.projectId !== null) {
			return 'project';
		} else if (this.deliveryNoteId !== null) {
			return 'deliverynote';
		} else if (this.invoiceId !== null || this.projectId !== null) {
			return 'invoice';
		} else if (this.expenseId !== null) {
			return 'expense';
		} else if (this.purchaseOrderId !== null) {
			return 'purchaseOrder';
		}
	}
}
