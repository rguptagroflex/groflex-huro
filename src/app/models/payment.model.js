import { formatApiDate, formatClientDate } from 'helpers/formatDate';
import { PAYMENT_TYPE_PAYMENT } from 'helpers/constants';
import { getResource } from 'helpers/resource';
import { formatCurrency } from 'helpers/formatCurrency';

export default class Payment {
	constructor(data) {
		data = !data ? {} : data;

		this.id = data.id;
		this.amount = data.amount || 0.0;
		this.cancellationPaymentId = data.cancellationPaymentId;
		this.custId = data.custId;
		this.customerName = data.customerName;
		this.date = data.date || formatApiDate();
		this.financeApiBankTransactionId = data.financeApiBankTransactionId;
		this.invoiceId = data.invoiceId;
		this.invoiceNumber = data.invoiceNumber;
		this.invoiceType = data.invoiceType;
		this.notes = !data.notes ? 
							(data.invoiceNumber?`${getResource('str_paymentInvoiceNumber')} ${data.invoiceNumber}`:data.notes)
					 : data.notes;
		this.outstandingBalance = data.outstandingBalance || 0.0;
		this.selectedOption = data.selectedOption || '';
		this.type = data.type || PAYMENT_TYPE_PAYMENT;
		this.useCredits = data.useCredits || 0;
		this.useBalance = data.useBalance || 0;
		this.adjustExcessAmount = data.adjustExcessAmount || false;
	}

	get displayDate() {
		return this.date ? formatClientDate(this.date) : '-';
	}

	get displayAmount() {
		return formatCurrency(this.amount);
	}
}
