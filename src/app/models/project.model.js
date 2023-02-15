import { formatDate, formatApiDate } from 'helpers/formatDate';
import ProjectState from 'enums/project/project-state.enum';
// import config from 'config';
// import moment from 'moment';

export default class Project {
	constructor(data) {
		data = !data ? {} : data;

		this.id = data.id;
		this.title = data.title;
		// this.startDate = data.startDate || moment().format(config.dateFormat.api);
		this.startDate = data.startDate || formatApiDate();
		this.state = data.state || 'draft';
		this.budget = data.budget;
		this.customerId = data.customerId;
		this.customer = data.customer;
		this.description = data.description;
		this.invoices = data.invoices;
		this.notes = data.notes;
		this.offerId = data.offerId;
		this.offerNumber = data.offerNumber;
		this.outstandingBudget = data.outstandingBudget;
		this.appliedPayments = data.appliedPayments;
		this.permissions = data.permissions;
		this.closingInvoiceId = data.closingInvoiceId;
	}

	get displayCustomerName() {
		if (!this.customer) {
			return '';
		}
		return this.customer.name;
	}

	get displayStartDate() {
		if (this.startDate) {
			return formatDate(this.startDate);
		}

		return '–';
	}

	get showInvoiceList() {
		return this.invoices.length > 0;
	}

	get isFinished() {
		return this.state === ProjectState.FINISHED;
	}

	get canBeEdited() {
		return this.state !== ProjectState.FINISHED && this.state !== ProjectState.PAID && !this.closingInvoiceId;
	}

	get disableDepositInvoiceButton() {
		return this.permissions.allowDepositInvoice;
	}

	get disableFinishButton() {
		return this.permissions.allowClosingInvoice;
	}
}
