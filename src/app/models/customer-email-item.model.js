import lang from 'lang';
import moment from 'moment';
import config from 'config';
import { transactionTypes } from 'helpers/constants';
import { formatDate } from 'helpers/formatDate';
import { formatTime } from 'helpers/formatTime';

export default class CustomerEmailItem {
	constructor(data) {
		data = !data ? {} : data;

		this.id = data.id;
		this.fromAddresses = data.fromAddresses;
		this.toAddresses = data.toAddresses;
		this.bcc = data.bcc;
		this.cc = data.cc;
		this.date = data.date;
		this.convertedDate = moment(data.date).toISOString();
		this.createdAt = data.createdAt;
		this.customerId = data.customerId;
		this.emailConfigId = data.emailConfigId;
		this.emailType = data.emailType;
		this.isAttachmentIncluded = data.isAttachmentIncluded;
		this.subject = data.subject;
		this.body = data.body;
	}

	get dateSubstring() {
		return formatDate(this.convertedDate);
	}

	get timeSubstring() {
		return formatTime(this.convertedDate);
	}

	get yearAndMonthDays() {
		const dateArray = formatDate(this.convertedDate).split('.');
		return {
			year: dateArray[2],
			dayAndMonth: `${dateArray[0]}.${dateArray[1]}`,
		};
	}

	get fromToday() {
		if (this.date && this.convertedDate) {
			const currentDate = moment().startOf('day');
			const createdAtTemp = moment(this.convertedDate, [config.dateFormat.api, config.dateFormat.client]);
			const dayDiff = createdAtTemp.diff(currentDate, 'days');
			const yearDiff = createdAtTemp.diff(currentDate, 'years');
			return {
				today: dayDiff === 0,
				thisYear: yearDiff === 0,
			};
		}
	}
}
