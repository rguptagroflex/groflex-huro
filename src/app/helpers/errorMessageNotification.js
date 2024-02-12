import invoiz from 'services/invoiz.service';
import resources from '../../lang/lang_en.json';

export const handleNotificationErrorMessage = meta => {
	const errorMessage =
		meta && meta.id && meta.id[0] && meta.id[0].message ? meta.id[0].message : resources.defaultErrorMessage;
	invoiz.page.showToast({
		message: errorMessage,
		type: 'error'
	});
};
