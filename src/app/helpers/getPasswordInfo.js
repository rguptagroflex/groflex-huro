import { formatNumber } from 'helpers/formatNumber';

export const getPasswordInfo = (password) => {
	const passwordStrength = Math.round(Math.pow(96, password.length) / 1000000000);
	let duration = '';

	if (passwordStrength < 60) {
		if (passwordStrength < 1) {
			duration = ' 1 Second';
		} else {
			duration = passwordStrength + ' Seconds';
		}
	} else if (passwordStrength >= 60 && passwordStrength < 2400) {
		duration = Math.round(passwordStrength / 60) + ' Minutes';
	} else if (passwordStrength >= 2400 && passwordStrength < 57600) {
		duration = Math.round(passwordStrength / 2400) + ' Hours';
	} else if (passwordStrength >= 57600 && passwordStrength < 1728000) {
		duration = Math.round(passwordStrength / 57600) + ' Tag';
	} else if (passwordStrength >= 1728000 && passwordStrength < 51840000) {
		duration = Math.round(passwordStrength / 1728000) + ' Months';
	} else if (passwordStrength >= 51840000) {
		let dur = Math.round(passwordStrength / 51840000);
		dur = dur > 800000000000000000000 ? 800000000000000000000 : dur;
		dur = formatNumber(dur, { thousand: '.' });
		duration = dur + ' Years';
	}

	return 'Your password can be cracked within '+ duration +'.';
};
