import { APP_IDS_OPEN_SAME_WINDOW } from 'helpers/constants';

export const openCallbackUrlWindow = (app, callbackUrl) => {
	const openInSameWindow = APP_IDS_OPEN_SAME_WINDOW.indexOf(app.appId) !== -1;
	window.open(callbackUrl, openInSameWindow ? '_self' : '_blank');
};
