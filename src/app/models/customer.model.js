import ContactPerson from 'models/contact-person.model';
import { getLabelForCountry } from 'helpers/getCountries';

import _ from 'lodash';
import { getResource } from 'helpers/resource';

export default class Customer {
	constructor(data) {
		data = !data ? {} : data;

		this.id = data.id;

		const { street, zipCode, city, countryIso, gstType, gstNumber, cinNumber } = data;
		// this.address =
		// 	data.address ||
		// 	Object.assign(
		// 		{ street: '', zipCode: '', city: '', countryIso: 'IN' },
		// 		{ street, zipCode, city, countryIso }
		// 	);

		this.address =
			data.address ||
			Object.assign(
				{ street: '', zipCode: '', city: '', countryIso, gstType, gstNumber, cinNumber },
				{ street, zipCode, city, countryIso, gstType, gstNumber, cinNumber }
			);

		this.birthday = data.birthday;
		this.category = data.category || '';
		this.companyName = data.companyName;
		this.companyNameAffix = data.companyNameAffix;
		this.contactPersons = data.contactPersons
			? data.contactPersons.map(contactPerson => new ContactPerson(contactPerson))
			: [];
		this.contactType = data.contactType;
		this.discount = data.discount || 0.0;
		this.email = data.email;
		this.fax = data.fax;
		this.firstName = data.firstName;
		this.kind = data.kind || 'company';
		this.lastName = data.lastName;
		this.mandator = data.mandator;
		this.mobile = data.mobile;
		this.name = data.name;
		this.notes = data.notes;
		this.notesAlert = !!data.notesAlert;
		this.number = data.number;
		this.payConditionId = data.payConditionId || null;
		this.phone1 = data.phone1;
		this.phone2 = data.phone2;
		this.salesVolumeData = data.salesVolumeData;
		this.salutation = data.salutation;
		this.title = data.title;
		this.vatFree = data.vatFree;
		this.vatId = data.vatId;
		this.website = data.website;
		this.type = data.type;
		this.credits = data.credits || 0;
		this.debits = data.debits || 0;
		this.openingBalance = data.openingBalance || 0;
		this.balance = data.balance || 0;
		this.outstandingAmount = data.outstandingAmount || 0;
		this.indiaState =
			data.indiaState ||
			Object.assign(
				{ id: null, stateName: null }
			);
		this.baseCurrency = data.baseCurrency || '';
		this.exchangeRate = data.exchangeRate || 0.0;
		this.defaultExchangeRateToggle = data.defaultExchangeRateToggle || false;
	}

	get displayName() {
		if (this.name) {
			return this.name;
		}

		let displayName = this.title ? `${this.title} ` : '';

		displayName +=
			this.kind === 'person' || !this.companyName
				? `${this.firstName} ${this.lastName}`
				: `${this.companyName}${this.companyNameAffix ? ` ${this.companyNameAffix}` : ''}`;
		return displayName;
	}
	
	get country() {
		return getLabelForCountry(this.address.countryIso);
	}

	get custNoString() {
		return `${this.kind === 'person' ? getResource('str_person') : getResource('str_firma')} | ${getResource('str_KdNr')} ${this.number || ''}`;
	}

	get isPerson() {
		return this.kind === 'person';
	}

	get isCustomer() {
		return this.type === 'customer';
	}

	get mapData() {
		const address = _.compact([this.address.street, this.address.zipCode, this.address.city, this.country]);
		const subHeadingZipCity = _.compact([this.address.zipCode, this.address.city]).join(' ');
		let subHeading = subHeadingZipCity && this.country ? `${subHeadingZipCity}, ${this.country}` : '';
		subHeading = subHeading || subHeadingZipCity || this.country;

		return {
			showMap: address.join('').length > 0,
			heading: this.address.street,
			subHeading,
			mapAddress: address.join(', ')
		};
	}

	get tempId() {
		return this.id || _.uniqueId('temp');
	}
}
