// import moment from 'moment';
// import config from 'config';
import _ from 'lodash';
import { formatClientDate } from 'helpers/formatDate';

export default class ContactPerson {
	constructor(data) {
		data = !data ? {} : data;

		this.id = data.id;

		this.birthday = data.birthday || null;
		this.email = data.email || '';
		this.fax = data.fax || '';
		this.firstName = data.firstName || '';
		this.isMainContact = !!data.isMainContact;
		this.job = data.job || '';
		this.lastName = data.lastName || '';
		this.mobile = data.mobile;
		this.name = data.name || '';
		this.phone1 = data.phone1;
		this.phone2 = data.phone2;
		this.salutation = data.salutation || '';
		this.title = data.title || '';
	}

	get displayName() {
		if (this.name) {
			return this.name;
		}

		let displayName = this.title ? `${this.title} ` : '';
		displayName += `${this.firstName} ${this.lastName}`;

		return displayName;
	}

	get displayNameLong() {
		let displayName = this.salutation ? `${this.salutation} ` : '';
		displayName += this.title ? `${this.title} ` : '';
		displayName += `${this.firstName} ${this.lastName}`;
		return displayName;
	}

	get displayDate() {
	//	return this.birthday ? formatDate(this.birthday || moment().format(config.dateFormat.api)) : null;
	    return this.birthday ? formatClientDate(this.birthday) : null;
	}

	get initials() {
		return _.compact([this.firstName, this.lastName])
			.map(name => name.charAt(0))
			.join('');
	}

	get salutationAndTitle() {
		return _.compact([this.salutation, this.title]).join(' ');
	}

	get salutationTitleAndName() {
		return _.compact([this.salutationAndTitle, this.name]).join(' ');
	}
}
