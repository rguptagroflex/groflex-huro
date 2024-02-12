export default (value, props) => {
	let i = 0;

	return (
		value
			// replace everything that is not a decimal separator, minus or digit
			.replace(new RegExp('[^\\d-' + (props.precision ? props.decimal : '') + ']', 'g'), '')
			// replace all decimal separators but the first
			.replace(new RegExp('[' + props.decimal + ']', 'g'), function() {
				return i++ < 1 ? props.decimal : '';
			})
			// replace every minus except when its the first character
			.replace(/(?!^)-/g, '')
	);
};
