import invoiz from 'services/invoiz.service';

export const navigateToAppId = (appType) => {
	let allApps = [];

	if (invoiz.user.subscriptionData && invoiz.user.subscriptionData.apps) {
		allApps = invoiz.user.subscriptionData.apps.activeApps.concat(
			invoiz.user.subscriptionData.apps.deactivatedApps
		);
		allApps = allApps.concat(invoiz.user.subscriptionData.apps.featuredApps);
		allApps = allApps.concat(invoiz.user.subscriptionData.apps.otherApps);
		allApps = allApps.concat(invoiz.user.subscriptionData.apps.popularApps);
		allApps = allApps.concat(invoiz.user.subscriptionData.apps.trialApps);
	}

	allApps.forEach((app) => {
		if (app.attributes && app.attributes.invoizAppType === appType) {
			invoiz.router.redirectTo(`/apps/${app.appId}`, null, null, true);
		}
	});
};
