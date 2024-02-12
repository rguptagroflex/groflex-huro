export const scrollToTop = (top, duration) => {
	$('html, body').animate({ scrollTop: top || 0 }, duration || 1);
};

export const scrollToElement = (elm, offset, duration) => {
	$('html, body').animate({ scrollTop: elm.offset().top - (offset || 0) }, duration || 1);
};
