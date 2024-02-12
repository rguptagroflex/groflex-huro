export const initTargetLinePlugin = Chartist => {
	const defaultOptions = {
		className: 'ct-target-line',
		value: null
	};

	Chartist.plugins = Chartist.plugins || {};

	Chartist.plugins.ctTargetLine = options => {
		options = Chartist.extend({}, defaultOptions, options);

		return function ctTargetLine(chart) {
			chart.on('created', context => {
				const projectTarget = (chartRect, bounds, value) => {
					const targetLineX = chartRect.x1 + (chartRect.width() / bounds.max) * value;

					return {
						x1: targetLineX,
						x2: targetLineX,
						y1: chartRect.y1,
						y2: chartRect.y2
					};
				};

				const targetLine = projectTarget(context.chartRect, context.bounds, options.value);

				context.svg.elem('line', targetLine, options.className);
			});
		};
	};
};
