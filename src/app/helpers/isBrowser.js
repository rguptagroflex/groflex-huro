export const isIE = () => {
	const ua = navigator.userAgent;
	const msie = ua.indexOf('MSIE ');
	const trident = ua.indexOf('Trident/');
	const edge = ua.indexOf('Edge/');

	return msie > 0 || trident > 0 || edge > 0;
};

export const isFirefox = () => {
	return /firefox/i.test(navigator.userAgent);
};

export const isChromeSafari = () => {
	return (/chrome/i.test(navigator.userAgent) || /safari/i.test(navigator.userAgent)) && !isIE();
};

export const isChrome = () => {
	return (/chrome/i.test(navigator.userAgent)) && !isIE();
};

export const isSafari = () => {
	return (/safari/i.test(navigator.userAgent)) && !isIE();

}
