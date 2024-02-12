import { getResource } from 'helpers/resource';

export default class Dunning {
	constructor(data) {
		data = !data ? {} : data;

		this.id = data.id;

		this.customerId = data.customerId;
		this.customerData = data.customerData;
		this.date = data.date;
		this.charge = data.charge || 0.0;
		this.emailText = data.emailText || '';
		this.paths = data.paths || [];
		this.positions = data.positions || [];
		this.printCustomDocument = data.printCustomDocument;
		this.type = data.type || 'dunning';
	}

	get displayLabel() {
		if (this.positions[0]) {
			switch (this.positions[0].dunningLevel) {
				case 'paymentReminder':
					return getResource('str_paymentRemainder');
				case 'firstReminder':
					return `1. + ${getResource('str_warning')}`;
				case 'secondReminder':
					return `2. + ${getResource('str_warning')}`;
				case 'lastReminder':
					return `${getResource('str_latest')} ${getResource('str_warning')}`;
			}
		}
	}
}
