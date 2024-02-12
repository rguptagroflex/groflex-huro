import invoiz from 'services/invoiz.service';
import ChargebeePlan from 'enums/chargebee-plan.enum';
import SubscriptionVendor from 'enums/subscription-vendor.enum';
import ZohoPlan from 'enums/zoho-plan.enum';

export const isPayingUser = () => {
	let isPayingUser = false;

	if (invoiz.user && invoiz.user.subscriptionData) {
		const { planId } = invoiz.user.subscriptionData;

		if (planId && (planId !== ChargebeePlan.TRIAL || planId !== ZohoPlan.TRIAL || planId !== ChargebeePlan.TRIAL_21)) {
			isPayingUser = true;
		}
	}

	return isPayingUser;
};

export const isChargebeeSubscriber = () => {
	let isChargebeeSubscriber = false;

	if (invoiz.user && invoiz.user.subscriptionData) {
		const { planId, vendor } = invoiz.user.subscriptionData;

		if (
			planId &&
			vendor === SubscriptionVendor.CHARGEBEE &&
			(
				planId === ChargebeePlan.STANDARD ||
				planId === ChargebeePlan.UNLIMITED ||
				planId === ChargebeePlan.STARTER ||
				planId === ChargebeePlan.FREE_MONTH ||
				planId === ChargebeePlan.STANDARD_749 ||
				planId === ChargebeePlan.STARTER_249 ||
				planId === ChargebeePlan.UNLIMITED_999 ||
				planId === ChargebeePlan.FREE_YEARLY ||
				planId === ChargebeePlan.STARTER_YEARLY ||
				planId === ChargebeePlan.STANDARD_YEARLY ||
				planId === ChargebeePlan.UNLIMITED_YEARLY ||
				planId === ChargebeePlan.STANDARD_MONTHLY ||
				planId === ChargebeePlan.STARTER_MONTHLY ||
				planId === ChargebeePlan.UNLIMITED_MONTHLY ||
				planId === ChargebeePlan.STARTER_YEARLY_21 ||
				planId === ChargebeePlan.STANDARD_YEARLY_21 ||
				planId === ChargebeePlan.UNLIMTED_YEARLY_21)
		) {
			isChargebeeSubscriber = true;
		}
	}

	return isChargebeeSubscriber;
};

export const isRazorpaySubscriber = () => {
	let isRazorpaySubscriber = false;

	if (invoiz.user && invoiz.user.subscriptionData) {
		const { planId, vendor } = invoiz.user.subscriptionData;

		if (
			planId &&
			vendor === SubscriptionVendor.RZRPAY
			// &&
			// (
			// 	planId === ChargebeePlan.STANDARD ||
			// 	planId === ChargebeePlan.UNLIMITED ||
			// 	planId === ChargebeePlan.STARTER ||
			// 	planId === ChargebeePlan.FREE_MONTH ||
			// 	planId === ChargebeePlan.STANDARD_749 ||
			// 	planId === ChargebeePlan.STARTER_249 ||
			// 	planId === ChargebeePlan.UNLIMITED_999 ||
			// 	planId === ChargebeePlan.FREE_YEARLY ||
			// 	planId === ChargebeePlan.STARTER_YEARLY ||
			// 	planId === ChargebeePlan.STANDARD_YEARLY ||
			// 	planId === ChargebeePlan.UNLIMITED_YEARLY ||
			// 	planId === ChargebeePlan.STANDARD_MONTHLY ||
			// 	planId === ChargebeePlan.STARTER_MONTHLY ||
			// 	planId === ChargebeePlan.UNLIMITED_MONTHLY)
		) {
			isRazorpaySubscriber = true;
		}
	}

	return isRazorpaySubscriber;
}

export const isZohoSubscriber = () => {
	let isZohoSubscriber = false;

	if (invoiz.user && invoiz.user.subscriptionData) {
		const { planId, vendor } = invoiz.user.subscriptionData;

		if (
			planId &&
			vendor === SubscriptionVendor.ZOHO &&
			(planId === ZohoPlan.STARTER ||
				planId === ZohoPlan.STANDARD ||
				planId === ZohoPlan.UNLIMITED ||
				planId === ZohoPlan.FREE_MONTH ||
				planId === ZohoPlan.STARTER_249 ||
				planId === ZohoPlan.STANDARD_749 ||
				planId === ZohoPlan.UNLIMITED_999 ||
				planId === ZohoPlan.FREE_YEARLY ||
				planId === ZohoPlan.STARTER_YEARLY ||
				planId === ZohoPlan.STANDARD_YEARLY ||
				planId === ZohoPlan.UNLIMITED_YEARLY)
		) {
			isZohoSubscriber = true;
		}
	}

	return isZohoSubscriber;
};

export const isNonChargebeeUser = () => {
	let isNonChargebeeUser = false;

	if (invoiz.user && invoiz.user.subscriptionData) {
		const { vendor } = invoiz.user.subscriptionData;

		if (vendor === SubscriptionVendor.STORE || vendor === SubscriptionVendor.AMAZON || vendor === SubscriptionVendor.RZRPAY) {
			isNonChargebeeUser = true;
		}
	}

	return isNonChargebeeUser;
};

export const isImpressContingentUser = () => {
	let isImpressContingentUser = false;

	if (invoiz.user && invoiz.user.subscriptionData) {
		const { planId, vendor } = invoiz.user.subscriptionData;

		const isChargeebee =
			vendor === SubscriptionVendor.CHARGEBEE &&
			(planId === ChargebeePlan.STARTER ||
				planId === ChargebeePlan.STANDARD ||
				planId === ChargebeePlan.FREE_MONTH ||
				planId === ChargebeePlan.STANDARD_749 ||
				planId === ChargebeePlan.STARTER_249 ||
				planId === ChargebeePlan.FREE_YEARLY ||
				planId === ChargebeePlan.STARTER_YEARLY ||
				planId === ChargebeePlan.STANDARD_YEARLY ||
				planId === ChargebeePlan.UNLIMITED_YEARLY ||
				planId === ChargebeePlan.STANDARD_MONTHLY ||
				planId === ChargebeePlan.STARTER_MONTHLY ||
				planId === ChargebeePlan.UNLIMITED_MONTHLY ||
				planId === ZohoPlan.STANDARD ||
				planId === ZohoPlan.STARTER ||
				planId === ZohoPlan.FREE_MONTH ||
				planId === ZohoPlan.STANDARD_749 ||
				planId === ZohoPlan.STARTER_249 ||
				planId === ZohoPlan.FREE_YEARLY ||
				planId === ZohoPlan.STARTER_YEARLY ||
				planId === ZohoPlan.STANDARD_YEARLY ||
				planId === ZohoPlan.UNLIMITED_YEARLY);

		if ((planId && isChargeebee) || isNonChargebeeUser()) {
			isImpressContingentUser = true;
		}
	}

	return isImpressContingentUser;
};
// returns if you can extend users (multi user) for the given plan
export const canExtendUsers = (planId) => {
	let canExtend = false;
	if (invoiz.user && invoiz.user.subscriptionData) {
		const { planId, vendor } = invoiz.user.subscriptionData;

		if (
			planId &&
			vendor === SubscriptionVendor.CHARGEBEE &&
			(
				planId === ChargebeePlan.STANDARD ||
				planId === ChargebeePlan.TRIAL ||
				planId === ChargebeePlan.TRIAL_21 ||
				planId === ChargebeePlan.UNLIMITED ||
				planId === ChargebeePlan.STARTER ||
				planId === ChargebeePlan.FREE_MONTH ||
				planId === ChargebeePlan.STANDARD_749 ||
				planId === ChargebeePlan.STARTER_249 ||
				planId === ChargebeePlan.FREE_YEARLY ||
				planId === ChargebeePlan.STARTER_YEARLY ||
				planId === ChargebeePlan.STANDARD_YEARLY ||
				planId === ChargebeePlan.UNLIMITED_YEARLY ||
				planId === ChargebeePlan.STANDARD_MONTHLY ||
				planId === ChargebeePlan.STARTER_MONTHLY ||
				planId === ChargebeePlan.UNLIMITED_MONTHLY)
		) {
			canExtend = true;
		}
	}

	return canExtend;
};

// returns the multi user contingent for the different plans
export const multiUserContingent = (planId) => {
	let contingent = 1;

	if (planId && planId === ChargebeePlan.UNLIMITED_2020) {
		contingent = 3;
	}

	if (planId && (planId === ChargebeePlan.TRIAL || planId === ChargebeePlan.TRIAL_21)) {
		contingent = null;
	}

	return contingent;
};

// Method to check for Razorpay user
export const isRzrpaySubscriber = () => {
	let isRzrpaySubscriber = false;

	if (invoiz.user && invoiz.user.subscriptionData) {
		const { vendor } = invoiz.user.subscriptionData;

		if (
			vendor === SubscriptionVendor.RZRPAY
		) {
			isRzrpaySubscriber = true;
		}
	}

	return izRzrpaySubscriber;
};
