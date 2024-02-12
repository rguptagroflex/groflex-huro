export const parsePxToNumber = (value) => {
	return value && parseInt(value.substring(0, value.indexOf('px')));
};
