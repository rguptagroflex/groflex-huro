export const formatIban = value => {
	let formattedIban = '';

	value.split('').forEach((char, index) => {
		formattedIban += char;

		if (index > 0 && (index + 1) % 4 === 0) {
			formattedIban += ' ';
		}
	});

	return formattedIban;
};
