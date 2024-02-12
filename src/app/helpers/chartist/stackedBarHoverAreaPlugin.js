export const initStackedBarHoverAreaPlugin = Chartist => {
	Chartist.plugins = Chartist.plugins || {};

	Chartist.plugins.ctStackedBarHoverArea = () => {
		return function ctStackedBarHoverArea(chart) {
			chart.on('created', context => {
				const groupSeriesA = context.svg.querySelectorAll('g.ct-series.ct-series-a').svgElements;

				groupSeriesA[0].querySelectorAll('line').svgElements.forEach((line, lineIndex) => {
					context.svg.elem(
						'line',
						{
							x1: line.attr('x1'),
							x2: line.attr('x1'),
							y1: context.chartRect.y1,
							y2: context.chartRect.y2,
							'ct:line-index': lineIndex
						},
						`ct-stacked-hover-area`
					);
				});
			});
		};
	};
};
