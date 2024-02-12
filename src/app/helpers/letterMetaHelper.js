const buildLetterMetaFormField = ({ x, y, width, height, sortId, type }) => {
	return {
		position: 'absolute',
		whiteSpace: 'pre',
		zIndex: sortId,
		left: `${x}px`,
		top: `${y}px`,
		height: type === 'image' || type === 'rectangle' ? `${height}px` : undefined,
		width: type === 'image' || type === 'rectangle' ? `${width}px` : undefined
	};
};

export { buildLetterMetaFormField };
