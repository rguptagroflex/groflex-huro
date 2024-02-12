export const addElementButtonPositionFixer = () => {
	const selectorAddElementBtn = '.impress-content-container .impress-edit--content-add-element-area';
	const selectorAddElementBtnFixedSpace =
		'.impress-content-container .impress-edit--content-add-element-area-fixed-space';
	const positionRight = $('.impress-content-container').outerWidth() / 2 - 50 - 270 / 2;

	if ($('.impress-content-container')[0]) {
		if ($('.impress-content-container')[0].scrollHeight > $('body')[0].scrollHeight) {
			$(selectorAddElementBtn)
				.addClass('fixed')
				.css({ right: positionRight });
			$(selectorAddElementBtnFixedSpace).addClass('visible');
		} else {
			$(selectorAddElementBtn)
				.removeClass('fixed')
				.css({ right: 'auto' });
			$(selectorAddElementBtnFixedSpace).removeClass('visible');
		}
	}
};
