import { RegExPatterns } from 'helpers/constants';

export const normalizeHttpUrl = (website) => {
	const reg = RegExPatterns.HTTP_HTTPS;
	return reg.test(website) ? website : `http://${website}`;
};
