export const detectDevice = () => {
	const ua = navigator.userAgent.toLowerCase();

	if (
		/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
			ua
		)
	) {
		return 'tablet';
	} else if (
		/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(
			ua
		)
	) {
		return 'phone';
	} else {
		return 'desktop';
	}
};
