import AppBillingPeriod from 'enums/apps/app-billing-period.enum';
import AppChargeType from 'enums/apps/app-charge-type.enum';
import AppType from 'enums/apps/app-type.enum';

export const getAppPeriod = app => {
	let label = '';

	if (
		app.customData.chargeType === AppChargeType.RECURRING &&
		app.customData.billingPeriod === AppBillingPeriod.MONTHLY
	) {
		label = 'mtl.';
	} else if (app.customData.chargeType === AppChargeType.NON_RECURRING) {
		label = 'einm.';
	}

	if (app.attributes.invoizAppType === AppType.IMPRESS) {
		label = '';
	}

	return label;
};
