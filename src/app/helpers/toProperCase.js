export default function toProperCase (str) {
	if (str === null || str === '' || str === undefined) return false;
	str = str.toString();
	return str.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}
