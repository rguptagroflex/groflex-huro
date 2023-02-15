import moment from "moment";
import config from "config";
import { getLabelForCountry } from "helpers/getCountries";
import InvoiceState from "enums/invoice/invoice-state.enum";
import { formatDate, formatApiDate, formateClientDateMonthYear } from "helpers/formatDate";
import { getResource } from "helpers/resource";

export default class Invoice {
	constructor(data) {
		data = !data ? {} : data;
		// console.log(data);

		this.id = data.id;
		this.autoDunningEnabled = !!data.autoDunningEnabled;
		this.acceptUserAgreement = !!data.acceptUserAgreement || !!data.useAdvancedPaymentOptions;
		this.beginDate = data.beginDate;
		this.dueToDate = data.dueToDate;
		this.cashDiscountSetting = data.cashDiscountSetting || {
			active: false,
			type: "percentage",
			amount: 0,
			days: 0,
		};
		this.cashDiscountTotal = data.cashDiscountTotal;

		if (data.columns) {
			data.columns.forEach((col) => {
				if (col.name !== "number" && col.name !== "total") {
					col.editable = true;
				}
			});
		}

		this.columns = data.columns;
		this.contactPersonId = data.contactPersonId;
		this.customerId = data.customerId;
		this.customOfferDocumentId = data.customOfferDocumentId;
		this.customerData = data.customerData;
		// this.date = data.date || moment().format(config.dateFormat.api);
		this.date = data.date || formatApiDate();
		// this.deliveryDate = data.deliveryDate || moment().format(config.dateFormat.api);
		this.deliveryDate = data.deliveryDate || formatApiDate();

		const deliveryPeriodField =
			data.infoSectionFields && data.infoSectionFields.find((f) => f.name === "deliveryPeriod" && f.active);
		this.deliveryPeriod = (deliveryPeriodField && deliveryPeriodField.value) || "";
		if (data.deliveryPeriod) {
			this.deliveryPeriod = data.deliveryPeriod;
		}
		this.deliveryPeriodStartDate = this.deliveryPeriod
			? // ? formatDate(this.deliveryPeriod.split(' - ')[0], 'DD.MM.YY', 'YYYY-MM-DD')
			  formatApiDate(this.deliveryPeriod.split(" - ")[0])
			: // : moment().format(config.dateFormat.api);
			  formatApiDate();
		this.deliveryPeriodEndDate = this.deliveryPeriod
			? // ? formatDate(this.deliveryPeriod.split(' - ')[1], 'DD.MM.YY', 'YYYY-MM-DD')
			  formatApiDate(this.deliveryPeriod.split(" - ")[1])
			: // : moment().add(1, 'days').format(config.dateFormat.api);
			  formatApiDate(moment().add(1, "days"));
		this.deliveryConditionId = data.deliveryConditionId;
		this.deliveryConditionData = data.deliveryConditionData;
		this.discount = data.discount;
		this.dunningRecipients = data.dunningRecipients;
		this.dunningLevel = data.dunningLevel;
		this.history = data.history;
		this.hideInvoizPay = data.hideInvoizPay;
		this.infoSectionCustomFields = data.infoSectionCustomFields;
		this.infoSectionFields = data.infoSectionFields;
		this.invoiceType = data.invoiceType;
		this.lockedAt = data.lockedAt;
		this.letterNumerationId = data.letterNumerationId;
		this.letterPaperSettingId = data.letterPaperSettingId;
		this.metaData = data.metaData;
		this.notes = data.notes || "";
		this.number = data.number;
		this.offer = data.offer;
		this.offerDocumentId = data.offerDocumentId;
		this.outstandingAmount = data.outstandingAmount;
		this.overDueNotificationSent = !!data.overDueNotificationSent;
		this.parentId = data.parentId;
		this.paidDate = data.paidDate;
		this.printDate = data.printDate;
		this.payments = data.payments;
		this.payConditionData = data.payConditionData;
		this.payConditionId = data.payConditionId;
		this.positions = data.positions;
		this.project = data.project;
		this.projectId = data.projectId;
		this.priceKind = data.priceKind || "net";
		this.printCustomDocument = data.printCustomDocument;
		this.recurringInvoiceId = data.recurringInvoiceId;
		this.sentAt = data.sentAt;
		this.smallBusiness = data.smallBusiness;
		this.smallBusinessText = data.smallBusinessText;
		this.state = data.state || InvoiceState.DRAFT;
		this.texts = data.texts;
		this.thumbnails = data.thumbnails;
		this.title = data.title || "";
		this.totalGross = data.totalGross;
		this.totalGrossProfit = data.totalGrossProfit;
		this.totalNet = data.totalNet;
		this.type = data.type || "invoice";
		this.invoizPayData = data.invoizPayData;
		this.useAdvancedPaymentOptions = !!data.useAdvancedPaymentOptions;
		this.useAdvancedPaymentPayPal = data.useAdvancedPaymentPayPal;
		this.useAdvancedPaymentTransfer = data.useAdvancedPaymentTransfer;
		this.vat = data.vat || config.resetZeroVatPercentValues;
		this.vatAmountReduced = data.vatAmountReduced || 0.0;
		this.vatAmountStandard = data.vatAmountStandard || 0.0;
		this.totalDiscount = data.totalDiscount || 0;
		this.additionalCharges = data.additionalCharges || Object.assign({}, { shippingCharge: 0, serviceCharge: 0 });
		this.exchangeRate = data.exchangeRate || 0.0;
		this.baseCurrency = data.baseCurrency || "";
		this.razorpayPaymentData = data.razorpayPaymentData || {
			enablePayment: false,
			amount: 0,
			paymentQr: {
				id: null,
				isInvoice: true,
				url: null,
				status: null,
			},
			paymentLink: {
				id: null,
				partial: false,
				url: null,
				status: null,
			},
		};
	}

	get datesAreEqual() {
		const date = moment(this.date, config.dateFormat.client);
		const deliveryDate = moment(this.deliveryDate, config.dateFormat.client);
		const diff = date.diff(deliveryDate, "days");
		return diff === 0;
	}

	get dueDateKind() {
		const currentDate = moment().startOf("day");
		const userDate = moment(this.dueToDate, [config.dateFormat.api, config.dateFormat.client]);
		const diff = userDate.diff(currentDate, "days");

		return diff > 0 ? getResource("str_dueIn") : getResource("str_dueFor");
	}

	get dueDateSubString() {
		const currentDate = moment().startOf("day");
		const userDate = moment(this.dueToDate, [config.dateFormat.api, config.dateFormat.client]);
		let diff = userDate.diff(currentDate, "days");

		switch (true) {
			case diff === 1:
				diff = `1 ${getResource("str_day")}`;
				break;
			case diff > 1:
				diff = `${diff} ${getResource("str_tagen")}`;
				break;
			case diff <= -3:
				diff = `${Math.abs(diff)} ${getResource("str_tagen")}`;
				break;
			case diff === -2:
				diff = getResource("str_dayBeforeYesterday");
				break;
			case diff === -1:
				diff = getResource("str_yesterdayLowerCase");
				break;
			case diff === 0:
				diff = getResource("str_todayLowerCase");
				break;
		}

		return diff;
	}

	get displayCustomerNumber() {
		if (!this.customerData) return "&mdash;";
		return this.customerData.number;
	}

	get displayContactPersonName() {
		if (!this.customerData || !this.customerData.contact) return;
		const contactPerson = this.customerData.contact;
		return `${contactPerson.salutation} ${contactPerson.title} ${contactPerson.firstName} ${contactPerson.lastName}`;
	}

	get displayCity() {
		if (!this.customerData) return;
		if (!this.customerData.zipCode && !this.customerData.city) {
			return "";
		}
		return `${this.customerData.zipCode} ${this.customerData.city}`;
	}

	get displaySalutation() {
		if (!this.customerData) return;
		if (this.customerData.kind === "person") {
			return this.customerData.title
				? `${this.customerData.salutation} ${this.customerData.title}`
				: this.customerData.salutation;
		}
	}

	get displayStreet() {
		if (!this.customerData) return;
		return this.customerData.street;
	}

	get displayGstNumber() {
		if (!this.customerData) return;
		return this.customerData.gstNumber;
	}

	get displayCinNumber() {
		if (!this.customerData) return;
		return this.customerData.cinNumber;
	}

	get displayCountry() {
		if (!this.customerData || this.customerData.countryIso === "IN") return;
		return getLabelForCountry(this.customerData.countryIso);
	}

	get displayName() {
		if (!this.customerData) return;
		if (this.customerData.kind === "person") {
			return `${this.customerData.firstName} ${this.customerData.lastName}`;
		}
		return this.customerData.companyName;
	}

	get displayNumber() {
		return this.state === InvoiceState.DRAFT ? getResource("str_draft") : this.number;
	}

	get displayCompanyNameAffix() {
		if (!this.customerData) return;
		return this.customerData.companyNameAffix;
	}

	get displayDueToDate() {
		if (!this.dueToDate) {
			return "–";
		}
		return formatDate(this.dueToDate);
	}

	get displayDate() {
		return formatDate(this.date);
	}

	get displayDeliveryDate() {
		return formatDate(this.deliveryDate);
	}

	get displayDeliveryPeriodStartDate() {
		return formatDate(this.deliveryPeriodStartDate);
	}

	get displayDeliveryPeriodEndDate() {
		return formatDate(this.deliveryPeriodEndDate);
	}

	get displayDeliveryPeriod() {
		return (
			// this.deliveryPeriod ||
			// `${formatDate(this.displayDeliveryPeriodStartDate, 'DD.MM.YYYY', 'DD.MM.YY')} - ${formatDate(
			// 	this.displayDeliveryPeriodEndDate,
			// 	'DD.MM.YYYY',
			// 	'DD.MM.YY'
			// )}`
			this.deliveryPeriod ||
			`${formateClientDateMonthYear(
				this.displayDeliveryPeriodStartDate,
				config.dateFormat.client
			)} - ${formateClientDateMonthYear(this.displayDeliveryPeriodEndDate, config.dateFormat.client)}`
		);
	}

	get isCancelled() {
		return this.state === InvoiceState.CANCELLED;
	}

	get isOverDue() {
		if (
			this.isCancelled ||
			this.state === InvoiceState.DRAFT ||
			this.state === InvoiceState.PAID ||
			this.autoDunningEnabled
		) {
			return false;
		}

		const today = moment().endOf("day");
		const nextDunningDate = moment(this.metaData.nextDunning.date);
		const isTodayAfter = moment(today).isAfter(nextDunningDate);
		return today === nextDunningDate || isTodayAfter;
	}

	get isLocked() {
		return this.state !== InvoiceState.DRAFT;
	}

	get isNet() {
		return this.priceKind === "net";
	}

	get isPerson() {
		return !this.customerData || this.customerData.kind === "person";
	}

	get hasVat() {
		return !!(this.vatAmountReduced || this.vatAmountStandard);
	}

	get stateString() {
		switch (this.state) {
			case InvoiceState.LOCKED:
				return getResource("str_notPaid");
			case InvoiceState.PARTIALLYPAID:
				return getResource("str_partiallyPaidShort");
			case InvoiceState.PAID:
				return getResource("str_completelyPaid");
			case InvoiceState.UNCOLLECTIBLE:
				return "uneinbringbar";
			case InvoiceState.CANCELLED:
				return getResource("str_canceled");
			case InvoiceState.DUNNED:
				return getResource("str_calledFor");
			default:
				return "---";
		}
	}

	get urlRoot() {
		switch (this.type) {
			case "depositInvoice":
				return config.resourceUrls.depositInvoice;
			case "closingInvoice":
				return config.resourceUrls.closingInvoice;
			default:
				return config.resourceUrls.invoice;
		}
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
			openingBalance,
			baseCurrency,
			exchangeRate,
			defaultExchangeRateToggle,
		} = customer;
		let city = customer.city || "";
		let zipCode = customer.zipCode || "";
		let street = customer.street || "";
		let countryIso = customer.countryIso || "IN";
		let gstNumber = customer.gstNumber || "";
		let cinNumber = customer.cinNumber || "";
		let mobile = customer.mobile || "";
		let id = customer.id;

		if (customer.address) {
			countryIso = customer.address.countryIso;
			zipCode = customer.address.zipCode;
			city = customer.address.city;
			street = customer.address.street;
			gstNumber = customer.address.gstNumber;
			cinNumber = customer.address.cinNumber;
		}

		if (customer.countryIso === "IN") {
		}

		const countryData = {
			iso: countryIso,
			label: countryIso ? getLabelForCountry(countryIso) : "",
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
			openingBalance,
			baseCurrency: "",
			exchangeRate: 0.0,
			defaultExchangeRateToggle: false,
		};

		switch (kind) {
			case "person":
				customerData = Object.assign(defaultCustomerData, {
					salutation,
					title,
					firstName,
					lastName,
				});
				break;
			case "company":
				customerData = Object.assign(defaultCustomerData, {
					companyName,
					companyNameAffix,
				});
		}

		if (customerData) {
			if (customerData.countryIso !== "IN") {
				(customerData.baseCurrency = baseCurrency),
					(customerData.defaultExchangeRateToggle = defaultExchangeRateToggle),
					//customerData.exchangeRate = defaultExchangeRateToggle ? exchangeRate : this.exchangeRate
					(customerData.exchangeRate = exchangeRate);
			} else {
				(customerData.baseCurrency = ""),
					(customerData.defaultExchangeRateToggle = false),
					(customerData.exchangeRate = 0.0);
			}
		}

		if (customerData && customerData.balance) {
			customerData.balance = balance;
		}

		if (customerData && customerData.openingBalance) {
			customerData.openingBalance = openingBalance;
		}

		const data = {
			customerId,
			discount: discount || 0.0,
			payConditionId: payConditionId || this.payConditionId,
			customerData,
		};

		if ((contact || (contactPersons && contactPersons.length > 0)) && kind === "company") {
			let contactPerson = null;

			if (contactPersons && contactPersons[0]) {
				contactPerson = contactPersons[0];
			}

			const contactPersonModel = contact || contactPerson;

			Object.assign(data, {
				customerContactPersons: contactPersons && contactPersons.length > 0 ? contactPersons : undefined,
			});
			Object.assign(data.customerData, {
				contact: {
					salutation: contactPersonModel.salutation,
					title: contactPersonModel.title,
					firstName: contactPersonModel.firstName,
					lastName: contactPersonModel.lastName,
					id: contactPersonModel.id,
				},
			});
		}
		this.customerId = data.customerId;
		this.discount = data.discount;
		this.payConditionId = data.payConditionId;
		this.customerData = data.customerData;
	}

	setInvoizPayData(accountData) {
		const invoizPayData = {};

		if (accountData.bankAccountIban) {
			invoizPayData.bankAccountIban = accountData.bankAccountIban;
		}

		if (accountData.bankAccountHolder) {
			invoizPayData.bankAccountHolder = accountData.bankAccountHolder;
		}

		if (accountData.bankAccountBic) {
			invoizPayData.bankAccountBic = accountData.bankAccountBic;
		}

		if (accountData.paypalUserName) {
			invoizPayData.paypalUserName = accountData.paypalUserName;
		}

		if (Object.keys(invoizPayData).length > 0) {
			this.invoizPayData = invoizPayData;
		}
	}
}
