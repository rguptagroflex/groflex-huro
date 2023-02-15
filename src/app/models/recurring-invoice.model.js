import RecurringInvoiceState from 'enums/recurring-invoice/recurring-invoice-state.enum';
import { formatDate, formatApiDate, formateClientDateMonthYear } from 'helpers/formatDate';
// import config from 'config';
import moment from 'moment';
import { getResource } from 'helpers/resource';

export default class RecurringInvoice {
	constructor(data) {
		data = !data ? {} : data;

		this.id = data.id;
		this.invoices = data.invoices;
		this.invoiceData = data.invoiceData;
		this.mailContent = data.mailContent;
		this.name = data.name;
		this.nextDate = data.nextDate;
		this.notes = data.notes || '';
		this.recipient = data.recipient;
		this.recurrence = data.recurrence || 'weekly';
		this.subject = data.subject;
		this.startDate = data.startDate || formatApiDate();
		this.state = data.state || 'draft';
		this.totalNet = data.totalNet;
		this.totalGross = data.totalGross;
		this.template = data.template;
		this.thumbnails = data.thumbnails;
		this.type = data.type || 'recurringInvoice';
		this.exchangeRate = data.exchangeRate || 0.0;
		this.baseCurrency = data.baseCurrency || '';
	}

	get isDraft() {
		return this.state === RecurringInvoiceState.DRAFT;
	}

	get isLocked() {
		return this.state === RecurringInvoiceState.STARTED;
	}

	get isFinished() {
		return this.state === RecurringInvoiceState.FINISHED;
	}

	get showInvoiceList() {
		return this.state !== RecurringInvoiceState.DRAFT;
	}

	get displayNextDate() {
		switch (this.state) {
			case RecurringInvoiceState.DRAFT:
				return getResource('str_notStarted');
			case RecurringInvoiceState.STARTED:
				return formatDate(this.nextDate);
			case RecurringInvoiceState.FINISHED:
				return getResource('str_subscriptionEnded');
		}
	}

	get displayRecurrence() {
		switch (this.recurrence) {
			case 'weekly':
				return getResource('str_weekly');
			case 'biweekly':
				return getResource('str_fourteenDays');
			case 'monthly':
				return getResource('str_perMonth');
			case 'bimonthly':
				return getResource('str_twoMonth');
			case 'quarter':
				return getResource('str_threeMonth');
			case 'biyearly':
				return getResource('str_halfYearly');
			case 'yearly':
				return getResource('str_yearly');
		}
	}

	get displayStartDate() {
		return formatDate(this.startDate);
	}

	get displayDeliveryPeriodStartDate() {
		switch (this.recurrence) {
			case 'weekly':
				// return formatDate(
				// 	moment(this.startDate)
				// 		.isoWeekday(-6)
				// 		.format(config.dateFormat.api),
				// 	'YYYY-MM-DD',
				// 	'DD.MM.YY'
				// );
				return formateClientDateMonthYear(moment(this.startDate).isoWeekday(-6));
			case 'biweekly':
				// return formatDate(
				// 	moment(this.startDate)
				// 		.add(-1, 'weeks')
				// 		.isoWeekday(-6)
				// 		.format(config.dateFormat.api),
				// 	'YYYY-MM-DD',
				// 	'DD.MM.YY'
				// );
				return formateClientDateMonthYear(moment(this.startDate).add(-1, 'weeks').isoWeekday(-6));
			case 'monthly':
				// return formatDate(
				// 	moment(this.startDate)
				// 		.add(-1, 'months')
				// 		.startOf('month')
				// 		.format(config.dateFormat.api),
				// 	'YYYY-MM-DD',
				// 	'DD.MM.YY'
				// );
				return formateClientDateMonthYear(moment(this.startDate).add(-1, 'months').startOf('month'));
			case 'bimonthly':
				// return formatDate(
				// 	moment(this.startDate)
				// 		.add(-2, 'months')
				// 		.startOf('month')
				// 		.format(config.dateFormat.api),
				// 	'YYYY-MM-DD',
				// 	'DD.MM.YY'
				// );
				return formateClientDateMonthYear(moment(this.startDate).add(-2, 'months').startOf('month'));
			case 'quarter':
				// return formatDate(
				// 	moment(this.startDate)
				// 		.add(-3, 'months')
				// 		.startOf('month')
				// 		.format(config.dateFormat.api),
				// 	'YYYY-MM-DD',
				// 	'DD.MM.YY'
				// );
				return formateClientDateMonthYear(moment(this.startDate).add(-3, 'months').startOf('month'));
			case 'biyearly':
				const currentMonth = moment(this.startDate).month() + 1;
				let startDate;
				if (currentMonth <= 6) {
					// startDate = moment(this.startDate)
					// 	.add(-1, 'years')
					// 	.startOf('year')
					// 	.add(6, 'months')
					// 	.format(config.dateFormat.api);
					startDate = formatApiDate(moment(this.startDate).add(-1, 'years').startOf('year').add(6, 'months'));
				} else {
					// startDate = moment(this.startDate)
					// 	.startOf('year')
					// 	.format(config.dateFormat.api);
					startDate = formatApiDate(moment(this.startDate).startOf('year'));
				}
				// return formatDate(startDate, 'YYYY-MM-DD', 'DD.MM.YY');
				return formateClientDateMonthYear(startDate);
			case 'yearly':
				// return formatDate(
				// 	moment(this.startDate)
				// 		.add(-1, 'years')
				// 		.startOf('year')
				// 		.format(config.dateFormat.api),
				// 	'YYYY-MM-DD',
				// 	'DD.MM.YY'
				// );
				return formateClientDateMonthYear(moment(this.startDate).add(-1, 'years').startOf('year'));
		}
	}

	get displayDeliveryPeriodEndDate() {
		switch (this.recurrence) {
			case 'weekly':
			case 'biweekly':
				// return formatDate(
				// 	moment(this.startDate)
				// 		.isoWeekday(0)
				// 		.format(config.dateFormat.api),
				// 	'YYYY-MM-DD',
				// 	'DD.MM.YY'
				// );
				return formateClientDateMonthYear(moment(this.startDate).isoWeekday(0));
			case 'monthly':
			case 'bimonthly':
			case 'quarter':
				// return formatDate(
				// 	moment(this.startDate)
				// 		.add(-1, 'months')
				// 		.endOf('month')
				// 		.format(config.dateFormat.api),
				// 	'YYYY-MM-DD',
				// 	'DD.MM.YY'
				// );
				return formateClientDateMonthYear(moment(this.startDate).add(-1, 'months').endOf('month'));
			case 'biyearly':
				const currentMonth = moment(this.startDate).month() + 1;
				let endDate;
				if (currentMonth <= 6) {
					// endDate = moment(this.startDate)
					// 	.add(-1, 'years')
					// 	.endOf('year')
					// 	.format(config.dateFormat.api);
					endDate = formatApiDate(moment(this.startDate).add(-1, 'years').endOf('year'));
				} else {
					// endDate = moment(this.startDate)
					// 	.endOf('year')
					// 	.add(-6, 'months')
					// 	.format(config.dateFormat.api);
					endDate = formatApiDate(moment(this.startDate).endOf('year').add(-6, 'months'));
				}
				// return formatDate(endDate, 'YYYY-MM-DD', 'DD.MM.YY');
				return formateClientDateMonthYear(endDate);
			case 'yearly':
				// return formatDate(
				// 	moment(this.startDate)
				// 		.add(-1, 'years')
				// 		.endOf('year')
				// 		.format(config.dateFormat.api),
				// 	'YYYY-MM-DD',
				// 	'DD.MM.YY'
				// );
				return formateClientDateMonthYear(moment(this.startDate).add(-1, 'years').endOf('year'));
		}
	}
}
