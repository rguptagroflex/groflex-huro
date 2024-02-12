import { getResource } from './resource';

export const getCompanyTypes = () => {
	const companyTypeTitle = getResource('companyTypes');
	const companyTypes = [
		{ label: companyTypeTitle.smallbusiness, value: 'smallbusiness' },
		{ label: companyTypeTitle.freelancer, value: 'freelancer' },
		{ label: companyTypeTitle.trader, value: 'trader' },
		{ label: companyTypeTitle.partnership, value: 'partnership' },
		{ label: companyTypeTitle.corporation, value: 'corporation' }
	];
	return companyTypes;
};
