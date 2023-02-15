// import moment from 'moment';
// import config from 'config';
import { getLabelForCountry } from 'helpers/getCountries';
import PurchaseOrderState from 'enums/purchase-order/purchase-order-state.enum';
import { formatDate, formatApiDate } from 'helpers/formatDate';
import config from '../../config';

export default class PurchaseOrder {
	constructor(data) {
		data = !data ? {} : data;

		this.id = data.id;
		this.beginDate = data.beginDate;
		this.dueToDate = data.dueToDate;

		if (data.columns) {
			data.columns.forEach(col => {
				if (col.name !== 'number' && col.name !== 'total') {
					col.editable = true;
				}
			});
		}
		this.columns = data.columns;

		this.contactPersonId = data.contactPersonId;
		this.customerId = data.customerId;
		this.customPurchaseOrderDocumentId = data.customPurchaseOrderDocumentId;
		this.customerData = data.customerData;
		// this.date = data.date || moment().format(config.dateFormat.api);
		this.date = data.date || formatApiDate();
		this.deliveryConditionId = data.deliveryConditionId;
		this.deliveryConditionData = data.deliveryConditionData;
		this.discount = data.discount;
		this.history = data.history;
		this.infoSectionCustomFields = data.infoSectionCustomFields;
		this.infoSectionFields = data.infoSectionFields;
		this.isLocked = data.isLocked;
		this.lockedAt = data.lockedAt;
		this.letterNumerationId = data.letterNumerationId;
		this.letterPaperSettingId = data.letterPaperSettingId;
		this.notes = data.notes || '';
		this.number = data.number;
		this.purchaseOrderDocumentId = data.purchaseOrderDocumentId;
		this.purchaseOrderType = data.purchaseOrderType;
		this.paidDate = data.paidDate;
		this.printDate = data.printDate;
		this.payConditionData = data.payConditionData;
		this.payConditionId = data.payConditionId;
		this.positions = data.positions;
		this.priceKind = data.priceKind || 'net';
		this.printCustomDocument = data.printCustomDocument;
		this.sentAt = data.sentAt;
		this.smallBusiness = data.smallBusiness;
		this.smallBusinessText = data.smallBusinessText;
		this.state = data.state || PurchaseOrderState.OPEN;
		this.texts = data.texts;
		this.thumbnails = data.thumbnails;
		this.title = data.title;
		this.type = data.type || 'standard';
		this.totalGross = data.totalGross;
		this.totalGrossProfit = data.totalGrossProfit;
		this.totalNet = data.totalNet;
		this.vat = data.vat || config.resetZeroVatPercentValues;
		this.vatAmountReduced = data.vatAmountReduced || 0.0;
		this.vatAmountStandard = data.vatAmountStandard || 0.0;
		this.id = data.id;
		this.totalDiscount = data.totalDiscount || 0;
		this.additionalCharges = data.additionalCharges || Object.assign(
			{},
			{ shippingCharge: 0, serviceCharge: 0 }
		);
		this.exchangeRate = data.exchangeRate || 0.0;
		this.baseCurrency = data.baseCurrency || '';
	}

	get displayCustomerNumber() {
		if (!this.customerData) return '&mdash;';
		return this.customerData.number;
	}

	get displayNumber() {
		return this.number;
	}

	get displayContactPersonName() {
		if (!this.customerData || !this.customerData.contact) return;
		const contactPerson = this.customerData.contact;
		return `${contactPerson.salutation} ${contactPerson.title} ${contactPerson.firstName} ${
			contactPerson.lastName
		}`;
	}

	get displayCity() {
		if (!this.customerData) return;
		if (!this.customerData.zipCode && !this.customerData.city) {
			return '';
		}
		return `${this.customerData.zipCode} ${this.customerData.city}`;
	}

	get displaySalutation() {
		if (!this.customerData) return;
		if (this.customerData.kind === 'person') {
			return this.customerData.title
				? `${this.customerData.salutation} ${this.customerData.title}`
				: this.customerData.salutation;
		}
	}

	get displayStreet() {
		if (!this.customerData) return;
		return this.customerData.street;
	}

	get displayGstNumber () {
		if (!this.customerData) return;
		return this.customerData.gstNumber;
	}

	get displayCinNumber () {
		if (!this.customerData) return;
		return this.customerData.cinNumber;
	}

	get displayCountry() {
		if (!this.customerData || this.customerData.countryIso === 'IN') return;
		return getLabelForCountry(this.customerData.countryIso);
	}

	get displayName() {
		if (!this.customerData) return;
		if (this.customerData.kind === 'person') {
			return `${this.customerData.firstName} ${this.customerData.lastName}`;
		}
		return this.customerData.companyName;
	}

	get displayCompanyNameAffix() {
		if (!this.customerData) return;
		return this.customerData.companyNameAffix;
	}

	get displayDate() {
		return formatDate(this.date);
	}

	get isNet() {
		return this.priceKind === 'net';
	}

	get isPerson() {
		return !this.customerData || this.customerData.kind === 'person';
	}

	get hasVat() {
		return !!(this.vatAmountReduced || this.vatAmountStandard);
	}

	setCustomer(customer) {
		let customerData;
		const {
			id: customerId,
			kind,
			number,
			salutation,
			title,
			name,
			firstName,
			lastName,
			companyName,
			companyNameAffix,
			contactPersons,
			payConditionId,
			contact,
			discount,
			indiaState,
			type,
			baseCurrency,
			exchangeRate,
			defaultExchangeRateToggle
		} = customer;

		let city = customer.city || '';
		let zipCode = customer.zipCode || '';
		let street = customer.street || '';
		let countryIso = customer.countryIso || 'IN';
		let gstNumber = customer.gstNumber || '';
		let cinNumber = customer.cinNumber || '';
		let mobile = customer.mobile || '';
		let id = customer.id;

		if (customer.address) {
			countryIso = customer.address.countryIso;
			zipCode = customer.address.zipCode;
			city = customer.address.city;
			street = customer.address.street;
			gstNumber = customer.address.gstNumber;
			cinNumber = customer.address.cinNumber;
		}

		const countryData = {
			iso: countryIso,
			label: countryIso ? getLabelForCountry(countryIso) : ''
		};

		const defaultCustomerData = {
			id,
			kind,
			street,
			zipCode,
			city,
			country: countryData.label,
			countryIso: countryData.iso,
			number,
			name,
			indiaState,
			gstNumber,
			mobile,
			cinNumber,
			type,
			baseCurrency: '',
			exchangeRate: 0.0,
			defaultExchangeRateToggle: false
		};

		switch (kind) {
			case 'person':
				customerData = Object.assign(defaultCustomerData, {
					salutation,
					title,
					firstName,
					lastName
				});
				break;
			case 'company':
				customerData = Object.assign(defaultCustomerData, {
					companyName,
					companyNameAffix
				});
		}
		if (customerData && customerData.indiaState) {
			customerData.indiaState = indiaState;
		}
		if (customerData) {
			if (customerData.countryIso !== "IN") {
			customerData.baseCurrency = baseCurrency,
			customerData.defaultExchangeRateToggle = defaultExchangeRateToggle,
			customerData.exchangeRate = exchangeRate;
			} else {
				customerData.baseCurrency = '',
				customerData.defaultExchangeRateToggle = false,
				customerData.exchangeRate = 0.0;
			}
		}
		const data = {
			customerId,
			discount: discount || 0.0,
			payConditionId: payConditionId || this.payConditionId,
			customerData
		};

		if ((contact || (contactPersons && contactPersons.length > 0)) && kind === 'company') {
			let contactPerson = null;

			if (contactPersons && contactPersons[0]) {
				contactPerson = contactPersons[0];
			}

			const contactPersonModel = contact || contactPerson;

			Object.assign(data, {
				customerContactPersons: contactPersons && contactPersons.length > 0 ? contactPersons : undefined
			});
			Object.assign(data.customerData, {
				contact: {
					salutation: contactPersonModel.salutation,
					title: contactPersonModel.title,
					firstName: contactPersonModel.firstName,
					lastName: contactPersonModel.lastName,
					id: contactPersonModel.id
				}
			});
		}

		this.customerId = data.customerId;
		this.discount = data.discount;
		this.payConditionId = data.payConditionId;
		this.customerData = data.customerData;
	}
}
