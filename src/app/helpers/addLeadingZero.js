export const addLeadingZero = (value, length) => {
	return ('0' + value.toString()).slice(-length);
};
