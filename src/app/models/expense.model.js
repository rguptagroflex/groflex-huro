import ExpensePayKind from 'enums/expense/expense-paykind.enum';
import moment from 'moment';
import { getLabelForCountry } from 'helpers/getCountries';
import { formatClientDate, formatApiDate, formatDate, formateClientDateMonthYear } from 'helpers/formatDate';
import { getResource } from 'helpers/resource';
import config from 'config';

export default class Expense {
	constructor(data,ignorePayKindFormatting) {
		data = !data ? {} : data;
		this.id = data.id;
		if (data.columns) {
			data.columns.forEach(col => {
				if (col.name !== 'number' && col.name !== 'total') {
					col.editable = true;
				}
			});
		}
		/* if (data.payKind === ExpensePayKind.BANK) {
			this.payKind = 'paidBank'
		} else if (data.payKind === ExpensePayKind.CASH) {
			this.payKind = 'paidCash'
		} else {
			this.payKind = ExpensePayKind.OPEN
		} */
		this.payKind=ignorePayKindFormatting || data.status==='open' ? data.payKind : `${data.payKind}_${data.status}`
		this.columns = data.columns;
		this.contactPersonId = data.contactPersonId;
		this.customerId = data.customerId;
		this.customerData = data.customerData;
		this.discount = data.discount;
		this.metaData = data.metaData;
		this.positions = data.positions;
		this.priceKind = data.priceKind || 'net';
		this.totalGross = data.totalGross;
		this.totalGrossProfit = data.totalGrossProfit;
		this.totalNet = data.totalNet;
		this.vat = data.vat || config.resetZeroVatPercentValues;
		this.vatAmountReduced = data.vatAmountReduced || 0.0;
		this.vatAmountStandard = data.vatAmountStandard || 0.0;
		this.receiptNumber = data.receiptNumber ? data.receiptNumber : '';

		this.globalId = data.globalId;
		this.financeApiBankTransactionId = data.financeApiBankTransactionId;

		this.calculationBase = data.calculationBase;
		
		this.date = data.date || formatApiDate();
		this.description = data.description;
		this.deletedAt = data.deletedAt;

		this.payDate = data.payDate || formatApiDate();
		this.payee = data.payee;
		this.price = data.price || 0;
		this.priceTotal = data.priceTotal || 0;
		this.vatPercent = data.vatPercent >= 0 ? data.vatPercent : config.defualtVatPercent;
		// this.vatPercent = data.vatPercent || parseInt(config.defualtVatPercent);
		this.vatAmout = data.vatAmount || 0;
		this.receipts = data.receipts || [];
		this.syncedWithFinanceApi = !!data.syncedWithFinanceApi;
		this.type=data.type || 'expense'
		this.status=data.status || 'open'
		this.totalDiscount = data.totalDiscount || 0;
		this.additionalCharges = data.additionalCharges || Object.assign(
			{},
			{ shippingCharge: 0, serviceCharge: 0 }
		);
		this.exchangeRate = data.exchangeRate || 0.0;
		this.baseCurrency = data.baseCurrency || '';
	}

	get displayReceiptNumber() {
		if (!this.receiptNumber) return '&mdash;';
		return this.receiptNumber;
	}

	get displayDate() {
		const date = this.date	
		return formatClientDate(date);
	}

	get displayPayDate() {
		const payDate = this.payDate	
		return formatClientDate(payDate);
	}

	get icon() {
		return this.receipts && this.receipts.length > 0 ? 'icon-attachment' : '';
	}

	get displayCustomerNumber() {
		if (!this.customerData) return '&mdash;';
		return this.customerData.number;
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
		// if (this.customerData.kind === 'person') {
		// 	return `${this.customerData.firstName} ${this.customerData.lastName}`;
		// }
		// return this.customerData.companyName;
		return this.customerData.name;
	}

	get displayCompanyNameAffix() {
		if (!this.customerData) return;
		return this.customerData.companyNameAffix;
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
			balance,
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
			cinNumber,
			mobile,
			type,
			balance,
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
		if (customerData && customerData.balance) {
			customerData.balance = balance;
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
