import invoiz from "services/invoiz.service";
import React from "react";
import _ from "lodash";
import { errorCodes, transactionTypes, errorCodesWithMessages } from "helpers/constants";
import { format } from "util";
// import { redirectToZohoApi } from 'helpers/redirectToZohoApi';
import { redirectToChargebee } from "helpers/redirectToChargebee";
import { isAndroidClient } from "helpers/updateSubsciptionDetails";
import SubscriptionVendor from "enums/subscription-vendor.enum";
import ChargebeePlan from "enums/chargebee-plan.enum";
// import ZohoPlan from 'enums/zoho-plan.enum';
import moment from "moment";
import ModalService from "services/modal.service";
import UpgradeModalComponent from "shared/modals/upgrade-modal.component";
import UpgradeSmallModalComponent from "shared/modals/upgrade-small-modal.component";
import { getResource, getFullResources } from "./resource";

const { REQUIRED, NO_NUMBER, NOT_EMPTY, NOT_ALLOWED, INVALID, TOO_SMALL, TOO_LARGE, NO_STRING, EXISTS } = errorCodes;

const {
	TRANSACTION_TYPE_OFFER,
	TRANSACTION_TYPE_PURCHASE_ORDER,
	TRANSACTION_TYPE_INVOICE,
	TRANSACTION_TYPE_DEPOSIT_INVOICE,
	TRANSACTION_TYPE_RECURRING_INVOICE,
	TRANSACTION_TYPE_EXPENSE,
} = transactionTypes;

const getStringType = (transactionType) => {
	switch (transactionType) {
		case TRANSACTION_TYPE_INVOICE:
			return getResource("str_theBill");
		case TRANSACTION_TYPE_DEPOSIT_INVOICE:
			return getResource("str_thePartialInvoice");
		case TRANSACTION_TYPE_OFFER:
			return getResource("str_theOffer");
		case TRANSACTION_TYPE_PURCHASE_ORDER:
			return getResource("str_thePurchaseOrder");
		case TRANSACTION_TYPE_EXPENSE:
			return getResource("str_theExpense");
	}
};

export const handleImageError = function (view, error) {
	let message = getResource("str_fileUploadErrorMessage");
	const keyString = Object.keys(error)[0];
	const splittedKeyString = keyString.split(".");
	const invalidProp = splittedKeyString[1];

	// handle error depending on invalid prop
	switch (invalidProp) {
		case "width":
			if (error[keyString][0].comparison === ">=") {
				message = format(getResource("imageWidthMinimumLimitError"), error[keyString][0].limit);
				return;
			}
			message = format(getResource("imageWidthMaximumLimitError"), error[keyString][0].limit);
			break;
		case "height":
			if (error[keyString][0].comparison === ">=") {
				message = format(getResource("imageHeightMinimumLimitError"), error[keyString][0].limit);
				return;
			}
			message = format(getResource("imageHeightMaximumLimitError"), error[keyString][0].limit);
			break;
		case "size":
			if (error[keyString][0].code === "TOO_BIG") {
				message = format(getResource("imageFileSizeLimit"), error[keyString][0].limit);
			}
			break;
		case undefined:
			if (keyString === "pdf" && error[keyString][0].code === NOT_ALLOWED) {
				message = getResource("pdfErrorMessage");
			}
	}

	return invoiz.showNotification({ type: "error", message });
};

// currently not in use
export const handleFormErrors = function (view, errors) {
	if (!errors) {
		return;
	}

	for (const name in errors) {
		const field = view.getField(name);
		if (!field) {
			return;
		}

		const errorCode = errors[name][0].code;
		const filteredError = _.find(errorCodesWithMessages, (error) => {
			return error.type === errorCode;
		});

		if (!filteredError) return;
		if (filteredError.message.indexOf("%s") > -1) {
			field.serverMessage = format(filteredError.message, field.label);
			return;
		}

		field.serverMessage = filteredError.message;
	}
};

export const handleTransactionFormErrors = function (view, errors, transactionType) {
	let message = getResource("defaultErrorMessage");
	const stringType = getStringType(transactionType);

	for (const key in errors) {
		if (!errors.hasOwnProperty(key)) {
			continue;
		}

		errors[key].map(({ code }) => {
			if (message !== getResource("defaultErrorMessage")) {
				return;
			}
			switch (key) {
				case "eanNo":
					if (code === EXISTS) {
						message = `This EAN is already linked to another article!`;
					}
				case "customerId":
					if (code === REQUIRED || code === NO_NUMBER) {
						message = format(
							transactionType == TRANSACTION_TYPE_EXPENSE ||
								transactionType == TRANSACTION_TYPE_PURCHASE_ORDER
								? getResource("transactionEmptyPayeeErrorMessage")
								: getResource("transactionEmptyCustomerErrorMessage"),
							stringType
						);
						if (view) {
							view.recipient.openCustomerSelection();
						}
					}
					break;
				case "positions":
					if (code === NOT_EMPTY) {
						message = format(getResource("transactionEmptyPositionsErrorMessage"), stringType);
						if (view) {
							view.positionNew.openArticleSelection();
						}
					}
					break;
				case "receiptNumber":
					if (code === REQUIRED) {
						message = `Please enter a receipt number`;
					}
					break;
				case "discountPercent":
					if (code === NOT_ALLOWED) {
						message = getResource("transactionDiscountPercentErrorMessage");
					}
					break;
				case "letterPaperSettingId":
					if (code === REQUIRED) {
						message = getResource("criticalErrorMessage");
					}
					break;
				case "deliveryConditionId":
					if (code === REQUIRED) {
						message = format(getResource("transactionEmptyDeliveryConditionErrorMessage"), stringType);
					}
					break;
				case "payConditionId":
					if (code === REQUIRED) {
						message = format(getResource("transactionEmptyPayConditionErrorMessage"), stringType);
					}
					break;
				case "useAdvancedPaymentOptions":
					if (code === REQUIRED) {
						message = getResource("invoizPayInvoiceErrorMessage");
						if (view) {
							view.terms.focusInvoizPay();
						}
					}
					break;
				case "acceptUserAgreement":
					if (code === REQUIRED) {
						message = getResource("invoizPayInvoiceUserAgreementErrorMessage");
						if (view) {
							view.terms.focusInvoizPay();
						}
						invoiz.trigger("handleUserAgreementError");
					}
					break;
				case "bankAccountData":
					if (code === INVALID) {
						message = getResource("invoizPayInvoiceBankDataErrorMessage");
						if (view) {
							view.terms.focusInvoizPay();
						}
					}
					break;
				case "outstandingAmount":
					if (code === TOO_SMALL) {
						message = getResource("invoizPayInvoiceTotalGrossErrorMessage");
						// view.terms.focusInvoizPay()
					}
					break;
				case "cashDiscountSetting.amount":
					switch (code) {
						case TOO_LARGE:
							message = getResource("invoicePayCashDiscountSettingAmountTooLarge");
							if (view) {
								view.terms.focusInvoizPay();
							}
							invoiz.trigger("handleCashDiscountSettingAmountTooLarge", code);
							break;
						case TOO_SMALL:
							message = getResource("invoicePayCashDiscountSettingAmountTooSmall");
							if (view) {
								view.terms.focusInvoizPay();
							}
							invoiz.trigger("handleCashDiscountSettingAmountTooSmall", code);
							break;
					}
					break;
				case "cashDiscountSetting.days":
					if (code === TOO_SMALL) {
						message = getResource("invoicePayCashDiscountSettingDaysTooSmall");
						if (view) {
							view.terms.focusInvoizPay();
						}
						invoiz.trigger("handleCashDiscountSettingDaysTooSmall", code);
					}
					break;
				case "dunningRecipients":
					if (code === NOT_EMPTY) {
						message = getResource("dunninRecipientEmptyRecipientsErrorMessage");
					}
					break;

				case "recipient":
					if (code === NO_STRING) {
						message = getResource("invoiceRecipientEmailValidation");
					}
					break;
				case "number":
					if (code === EXISTS) {
						message = format(getResource("existsMessage"), transactionType, key);
					}
					break;
			}
		});
	}

	if (view && view.showToast) {
		view.showToast({ type: "error", message });
	} else {
		invoiz.showNotification({ type: "error", message });
	}
};

const onConfirmUpgradeSmallModal = () => {
	// redirectToChargebee(null);
	const resources = getFullResources();
	// ModalService.open(<UpgradeModalComponent title={resources.str_timeToStart} resources={resources} />, {
	// 	width: 1196,
	// 	padding: 0,
	// 	isCloseable: true,
	// });
};

export const handleTransactionErrors = (error) => {
	const resources = getFullResources();
	let key;
	if (error[TRANSACTION_TYPE_INVOICE]) {
		key = TRANSACTION_TYPE_INVOICE;
	} else if (error[TRANSACTION_TYPE_OFFER]) {
		key = TRANSACTION_TYPE_OFFER;
	} else if (error[TRANSACTION_TYPE_RECURRING_INVOICE]) {
		key = TRANSACTION_TYPE_RECURRING_INVOICE;
	} else if (error[TRANSACTION_TYPE_DEPOSIT_INVOICE]) {
		key = TRANSACTION_TYPE_DEPOSIT_INVOICE;
	}
	const code = _.isArray(error[key]) ? error[key][0].code : undefined;

	if (code === NOT_ALLOWED) {
		const { vendor } = invoiz.user.subscriptionData;

		setTimeout(() => {
			if (vendor === SubscriptionVendor.STORE) {
				const isAndroidStore = isAndroidClient();

				ModalService.open(
					<UpgradeSmallModalComponent
						title={resources.str_yourTurnoverStarts}
						claim={resources.upgradeSmallModalCustomizeInvoiceQuotaClaim}
						subClaim={format(
							resources.upgradeSmallModalStoreSubClaimText,
							isAndroidStore ? resources.str_play : resources.str_app
						)}
						resources={resources}
					/>,
					{
						width: 800,
						padding: 40,
						isCloseable: true,
					}
				);
			} else {
				ModalService.open(
					<UpgradeSmallModalComponent
						onConfirm={() => onConfirmUpgradeSmallModal()}
						title={resources.str_yourTurnoverStarts}
						okButtonLabel={vendor === SubscriptionVendor.AMAZON ? null : resources.str_upgradeNow}
						claim={resources.upgradeSmallModalCustomizeInvoiceQuotaClaim}
						subClaim={vendor === SubscriptionVendor.AMAZON ? resources.amazonAccountUpgradeText : ""}
						resources={resources}
					/>,
					{
						width: 800,
						padding: 40,
						isCloseable: true,
					}
				);
			}
		}, 1000);
	}

	return code === NOT_ALLOWED
		? null
		: invoiz.showNotification({ message: resources.defaultErrorMessage, type: "error" });
};

export const handleTwoFactorErrors = (error) => {
	const resources = getFullResources();
};

export const handleRazorpayErrors = (errors, accountErrors, stakeholderErrors, bankErrors, documentErrors) => {
	for (const key in errors) {
		if (!errors.hasOwnProperty(key)) {
			continue;
		}
		errors[key].map(({ code }) => {
			switch (key) {
				// Account errors
				case "contactName":
					if (code === REQUIRED) {
						accountErrors[key] = `Contact name is a required field`;
					} else if (code === NO_STRING) {
						accountErrors[key] = `Please enter a valid name!`;
					} 
					break;
				case "legalInfo.gstNumber":
					if (code === REQUIRED) {
						accountErrors['gstNumber'] = `GST number is a required field`;
					} else if (code === INVALID || code === NO_STRING) {
						accountErrors['gstNumber'] = `Please enter a valid GST number!`;
					}
					break;
					case "email":
						if (code === REQUIRED) {
							accountErrors['email'] = `Business e-mail is a required field`;
						} else if (code === NO_STRING) {
							accountErrors['email'] = `Please enter a valid e-mail!`;
						} else if (code === EXISTS) {
							accountErrors['email'] = `This e-mail has an existing account with Razorpay!`;
						}
						break;
					case "mobile":
						if (code === REQUIRED) {
							accountErrors['mobile'] = `Business mobile is a required field`;
						} else if (code === INVALID || code === NO_STRING) {
							accountErrors['mobile'] = `Please enter a valid mobile number!`;
						} else if (code === EXISTS) {
							accountErrors['mobile'] = `This mobile is already linked with a Razorpay account!`;
						}
						break;
				case "legalInfo.panNumber":
					if (code === REQUIRED) {
						accountErrors['panNumber'] = `Business PAN is a required field`;
					} else if (code === INVALID || code === NO_STRING) {
						accountErrors['panNumber'] = `Please enter a valid PAN number!`;
					}
					break;
				case "legalInfo.cinNumber":
					if (code === REQUIRED) {
						accountErrors['cinNumber'] = `CIN/LLPIN number is a required field`;
					} else if (code === INVALID || code === NO_STRING) {
						accountErrors['cinNumber'] = `Please enter a valid CIN/LLPIN number!`;
					}
					break;
				case "legalBusinessName":
					if (code === REQUIRED) {
						accountErrors[key] = `Business name is a required field`;
					} else if (code === NO_STRING) {
						accountErrors[key] = `Please enter a valid business name!`;
					}
				case "customerFacingName":
					if (code === REQUIRED) {
						accountErrors[key] = `Customer facing name is a required field`;
					} else if (code === NO_STRING) {
						accountErrors[key] = `Please enter a valid customer facing name!`;
					}
					break;
				case "businessType":
					if (code === REQUIRED) {
						accountErrors[key] = `Please select a business type!`;
					} else if (code === INVALID) {
						accountErrors[key] = `Please select a business type!`;
					}
					break;
				case "profile.addresses.registeredAddress.street1":
					if (code === REQUIRED || code === INVALID || code === NO_STRING) {
						accountErrors['street1'] = `Address line 1 is a required field`;
					}
					break;
				case "profile.addresses.registeredAddress.street2":
					if (code === REQUIRED || code === INVALID || code === NO_STRING) {
						accountErrors['street2'] = `Address line 2 is a required field`;
					}
					break;
				case "profile.addresses.registeredAddress.city":
					if (code === REQUIRED || code === INVALID || code === NO_STRING) {
						accountErrors['city'] = `City is a required field`;
					}
					break;
				case "profile.addresses.registeredAddress.postalCode":
					if (code === REQUIRED) {
						accountErrors['postalCode'] = `Pincode is a required field`;
					} else if (code === INVALID || code === NO_STRING) {
						accountErrors['postalCode'] = `Please enter a valid pincode!`;
					}
					break;
				case "profile.addresses.registeredAddress.state":
					if (code === REQUIRED || code === INVALID || code === NO_STRING) {
						accountErrors['state'] = `State is a required field`;
					}
					break;

				// Stakeholder errors

				case "name":
					if (code === REQUIRED) {
						stakeholderErrors['name'] = `Owner's name is a required field`;
					} else if (code === INVALID || code === NO_STRING) {
						stakeholderErrors['name'] = `Please enter a valid name!`;
					}
					break;
				case "kyc.panNumber":
					if (code === REQUIRED) {
						stakeholderErrors['panNumber'] = `PAN number is a required field`;
					} else if (code === INVALID || code === NO_STRING) {
						stakeholderErrors['panNumber'] = `Please enter a valid PAN number!`;
					}
					break;
				case 'stakeholderMobile':
					if (code === REQUIRED) {
						stakeholderErrors['stakeholderMobile'] = `Mobile number is a required field`;
					} else if (code === INVALID || code === NO_STRING) {
						stakeholderErrors['stakeholderMobile'] = `Please enter a valid mobile number!`;
					}
					break;
				case "stakeholderEmail":
					if (code === REQUIRED) {
						stakeholderErrors['stakeholderEmail'] = `Owner's email is a required field`;
					} else if (code === INVALID) {
						stakeholderErrors['stakeholderEmail'] = `Please enter a valid email!`;
					}
					break;

				// Bank errors
				case "bankAccountNumber":
					if (code === REQUIRED) {
						bankErrors['bankAccountNumber'] = `Bank account number is a required field`;
					} else if (code === NO_STRING || code === INVALID) {
						bankErrors['bankAccountNumber'] = `Please enter a valid bank account number!`;
					}
					break;
				case "ifscCode":
					if (code === REQUIRED) {
						bankErrors['ifscCode'] = `IFSC code is a required field`;
					} else if (code === INVALID || code === NO_STRING) {
						bankErrors['ifscCode'] = `Please enter a valid IFSC code!`;
					}
					break;
				case "beneficiary":
					if (code === REQUIRED) {
						bankErrors['beneficiary'] = `Beneficiary name is a required field`;
					} else if (code === NO_STRING) {
						bankErrors['beneficiary'] = `Please enter a valid name!`;
					}
					break;
				case "documentType":
					if (code === NO_NUMBER || code === INVALID) {
						bankErrors['documentType'] = `Please select the address proof type first!`;
					}
					break;
			}
		});
	}
	return { accountErrors, stakeholderErrors, bankErrors };
};
