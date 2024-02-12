export default class Account {
	constructor(data) {
		data = !data ? {} : data;

		this.accountEmail = data.accountEmail;
		this.bankAccountBic = data.bankAccountBic;
		this.bankAccountHolder = data.bankAccountHolder;
		this.bankAccountIban = data.bankAccountIban;
		this.companyAddress = data.companyAddress;
		this.companyType = data.companyType;
		this.invoizPayState = data.invoizPayState;
		this.isSmallBusiness = data.isSmallBusiness;
		this.isSubjectToImputedTaxation = data.isSubjectToImputedTaxation;
		this.notificateEmail = data.notificateEmail;
		this.notificatePush = data.notificatePush;
		this.paypalUserName = data.paypalUserName;
		this.permanentExtensionOfPaymentDeadline = data.permanentExtensionOfPaymentDeadline;
		this.salesTaxFrequency = data.salesTaxFrequency;
		this.senderEmail = data.senderEmail;
		this.senderEmailName = data.senderEmailName;
		this.indiaStateId = data.indiaStateId;
		this.mobile = data.mobile;
		this.user = data.user;
		this.businessType = data.businessType;
		this.businessTurnover = data.businessTurnover;
		this.businessCategory = data.businessCategory;
		this.businessField = data.businessField;
		this.razorpayKycProgress = data.razorpayKycProgress;
		this.razorpayKycStatus = data.razorpayKycStatus;
	}
}
