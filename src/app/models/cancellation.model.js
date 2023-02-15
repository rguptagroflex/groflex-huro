import Invoice from 'models/invoice.model';
import { formatDate, formatApiDate, formateClientDateMonthYear } from 'helpers/formatDate';

export default class Cancellation extends Invoice {
	constructor(data) {
		super(data);

		data = !data ? {} : data;
		this.id = data.id;
		this.invoiceId = data.invoiceId;
		this.metaData = data.metaData;
		this.printCustomDocument = data.printCustomDocument;
		this.number = data.number;
		this.totalGross = data.totalGross;
		this.totalNet = data.totalNet;
		this.customerId = data.customerId;
		this.customerData = data.customerData;
		this.date = data.date || formatApiDate();
		this.paidAmount = data.paidAmount;
		this.refundAvailable = data.refundAvailable;
		this.customerName = data.customerName;
		this.refundType = data.refundType;
		this.expenseId = data.expenseId;
	}

	get displayNumber() {
		if (!this.metaData) return;

		const { invoiceNumber } = this.metaData;
		return invoiceNumber;
	}

	get relatedTransactionUrl() {
		return `/invoice/${this.invoiceId}`;
	}

	get displayCustomerName() {
		if (!this.customerData) return;
		if (this.customerData.kind === 'person') {
			return `${this.customerData.firstName} ${this.customerData.lastName}`;
		}
		return this.customerData.companyName;
	}
	get displayCustomerNumber() {
		if (!this.customerData) return '&mdash;';
		return this.customerData.number;
	}
}
