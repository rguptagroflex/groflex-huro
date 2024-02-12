export const scrollbarWidth = () => {
	let scrollbarWidth = 0;

	if ($(document).height() > $(window).height()) {
		const detectionDiv = document.createElement('div');

		detectionDiv.className = 'scrollbar-measure';
		document.body.appendChild(detectionDiv);

		scrollbarWidth = detectionDiv.offsetWidth - detectionDiv.clientWidth;

		document.body.removeChild(detectionDiv);
	}

	return scrollbarWidth;
};
