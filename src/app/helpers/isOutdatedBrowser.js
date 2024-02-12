export const isOutdatedBrowser = () => {
	const ua = navigator.userAgent;
	let tem;
	let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return true;
	}

	if (M[1] === 'Chrome') {
		tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
		if (tem !== null) {
			if (tem[1] === 'Edge') {
				return false;
			} else {
				return false;
			}
		}
	}

	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
		M.splice(1, 1, tem[1]);
	}

	if (M[0] === 'Chrome') {
		return false;
	} else if (M[0] === 'Safari') {
		return false;
	} else if (M[0] === 'Firefox') {
		return false;
	}

	return false;
};
