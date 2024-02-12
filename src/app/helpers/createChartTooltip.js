import { formatCurrency } from 'helpers/formatCurrency';

export const createChartTooltip = options => {
	const $chart = $(`.${options.target}`);

	let mouseHideTimeout = null;

	const $toolTip = $chart
		.append(`<div class="chartist-tooltip ${options.tooltipClass || ''}"></div>`)
		.find('.chartist-tooltip')
		.hide();

	$chart.on('mouseenter', options.tooltipSelector, function() {
		const $point = $(this);

		const value = $point.attr('ct:value');
		const meta = $point.attr('ct:meta');

		clearTimeout(mouseHideTimeout);

		if (options.onMouseEnter) {
			options.onMouseEnter($point, $toolTip);
		} else {
			$toolTip.html(`${meta}<br>${formatCurrency(value)}`).show();
		}
	});

	$chart.on('mouseleave', options.tooltipSelector, function() {
		options.onMouseLeave && options.onMouseLeave();

		$toolTip.hide();

		mouseHideTimeout = setTimeout(() => {
			options.onMouseLeave && options.onMouseLeave();
			$toolTip.hide();
		}, 500);
	});

	$chart.on('mousemove', function(event) {
		const box = $chart[0].getBoundingClientRect();

		if (options.onMouseMove) {
			options.onMouseMove(event, $toolTip);
		} else {
			$toolTip.css({
				left: event.pageX - box.left - $toolTip.width() / 2 - 10,
				top: event.pageY - box.top - window.pageYOffset - $toolTip.height() - 40
			});
		}
	});
};
