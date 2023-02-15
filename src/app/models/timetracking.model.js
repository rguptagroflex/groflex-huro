import _ from 'lodash';
import config from 'config';
import moment from 'moment';
import accounting from 'accounting';
import { convertMinutesToTimeString } from 'helpers/timetracking';
import { getResource } from 'helpers/resource';
import { formatClientDate } from 'helpers/formatDate';

const ZERO_THOROUGH_TIMEOBJECT = {
	hour: 0,
	minute: 0,
	second: 0,
	millisecond: 0
};

const convertDatetimeToTimeString = dateTime => {
	if (!dateTime) {
		return '00:00';
	}
	let sanitizedDatetime = moment(dateTime);
	if (sanitizedDatetime === moment(config.datetimeEpochValue)) {
		sanitizedDatetime = moment(ZERO_THOROUGH_TIMEOBJECT);
	}
	return sanitizedDatetime.format('HH:mm');
};

const convertDatetimeToTimeObject = dateTime => {
	const date = moment(dateTime, config.datetimeFormat.api);
	return {
		hour: date.hour(),
		minute: date.minute()
	};
};

export default class Timetracking {
	constructor(data) {
		data = !data ? {} : data;
		this.id = data.id;
		if (data.customer) {
			this.customer = data.customer;
			this.customerId = data.customer.id;
			this.customerName = data.customer.name; 
		}
		this.invoice = data.invoice;
		this.durationInMinutes = data.durationInMinutes || 0;
		this.startDate =
			data.startDate ||
			moment()
				.set(ZERO_THOROUGH_TIMEOBJECT)
				.format(config.datetimeFormat.api);
		this.endDate =
			data.endDate ||
			moment()
				.set(ZERO_THOROUGH_TIMEOBJECT)
				.format(config.datetimeFormat.api);
		this.pricePerHour = data.pricePerHour || 0;
		this.taskDescription = data.taskDescription;
		this.priceTotal = data.priceTotal;
		this.rowCount = data.rowCount;
		this.status = data.status;
		this.timeType = data.timeType;
	}

	get timeStart() {
		return convertDatetimeToTimeString(this.startDate);
	}

	get timeEnd() {
		return convertDatetimeToTimeString(this.endDate);
	}

	get date() {
		const date = this.startDate === config.dateEpochValue ? moment() : moment(this.startDate);
		// return date.format(config.dateFormat.client);
		return formatClientDate(date);
	}

	get trackedTimeString() {
		if (this.durationInMinutes > 0) {
			return convertMinutesToTimeString(this.durationInMinutes);
		} else {
			const timeStartObject = convertDatetimeToTimeObject(this.startDate);
			const timeEndObject = convertDatetimeToTimeObject(this.endDate);
			const calculatedTrackedTime = _.assign({}, ZERO_THOROUGH_TIMEOBJECT);

			if (
				timeStartObject.hour < timeEndObject.hour ||
				(timeStartObject.hour === timeEndObject.hour && timeStartObject.minute < timeEndObject.minute)
			) {
				if (timeStartObject.minute <= timeEndObject.minute) {
					calculatedTrackedTime.minute = timeEndObject.minute - timeStartObject.minute;
				} else {
					calculatedTrackedTime.minute = 60 - timeStartObject.minute - timeEndObject.minute;
					calculatedTrackedTime.hour = -1;
				}
				calculatedTrackedTime.hour = calculatedTrackedTime.hour + (timeEndObject.hour - timeStartObject.hour);
			}

			return moment(calculatedTrackedTime).format('H:mm');
		}
	}

	get humanizedDate() {
		const date = moment(this.startDate);

		const isToday = date.isSame(moment(), 'day');
		const isYesterday = date.isSame(moment().subtract(1, 'day'), 'day');
		if (isToday) {
			return getResource('str_today');
		} else if (isYesterday) {
			return getResource('str_yesterday');
		}
		// return date.format(config.dateFormat.client);
		return formatClientDate(date);
	}

	get taskDescriptionPrefix() {
		if (
			this.startDate !== undefined &&
			this.startDate !== null &&
			this.endDate !== undefined &&
			this.endDate !== null &&
			this.startDate < this.endDate
		) {
			const startDateTime = moment(this.startDate).format('HH:mm');
			const endDateTime = moment(this.endDate).format('HH:mm');
			return `${startDateTime} - ${endDateTime}`;
		}

		return '';
	}

	get summedUpCost() {
		return accounting.formatMoney(this.priceTotal, config.currencyFormat);
	}

	get displayEffort() {
		if (this.status !== 'invoiced') {
			return this.rowCount > 1 ? `${this.rowCount} ${getResource('str_expensesOpen')}` : `${this.rowCount} ${getResource('str_effortOpen')}`;
		} else {
			return this.rowCount > 1 ? `${this.rowCount} ${getResource('str_expenseSettled')}` : `${this.rowCount} ${getResource('str_expenseBilled')}`;
		}
	}
}
