import moment from 'moment';
import { getResource } from '../../helpers/resource';

export default class DocumentExportState {
	constructor(data) {
		data = !data ? {} : data;

		this.currYear = data.currYear;
		this.currMonth = data.currMonth;
		this.currQuarter = data.currQuarter;

		moment.updateLocale('de', {
			months: getResource('monthNames')
		});
	}

	get lastYear() {
		return moment(this.currYear, 'YYYY')
			.subtract(1, 'Y')
			.format('YYYY');
	}

	get displayCurrMonth() {
		return `${this.currMonth} ${this.currYear}`;
	}

	get displayLastMonth() {
		const currMonth = moment().format('M');
		let year = this.currYear;

		if (currMonth - 1 <= 0) {
			year = this.lastYear;
		}

		return `${moment()
			.subtract(1, 'months')
			.format('MMMM')} ${year}`;
	}

	get displaySecondLastMonth() {
		const currMonth = moment().format('M');
		let year = this.currYear;

		if (currMonth - 1 <= 0) {
			year = this.lastYear;
		}

		return `${moment()
			.subtract(2, 'months')
			.format('MMMM')} ${year}`;
	}

	get displayCurrQuarter() {
		return `${getResource('str_quater')} ${this.currQuarter}/${this.currYear}`;
	}

	get lastQuarter() {
		return moment()
			.subtract(3, 'M')
			.quarter();
	}

	get secondLastQuarter() {
		return moment()
			.subtract(6, 'M')
			.quarter();
	}

	get displayLastQuarter() {
		let year = this.currYear;

		if (this.lastQuarter > this.currQuarter) {
			year = this.lastYear;
		}

		return `${getResource('str_quater')} ${this.lastQuarter}/${year}`;
	}

	get displaySecondLastQuarter() {
		let year = this.currYear;

		if (this.secondLastQuarter > this.currQuarter) {
			year = this.lastYear;
		}

		return `${getResource('str_quater')} ${this.secondLastQuarter}/${year}`;
	}
}
