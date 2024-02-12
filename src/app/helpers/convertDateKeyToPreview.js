const YEAR_KEY = 'YYYY';
const YEAR_SHORT_KEY = 'YY';
const YEAR_MONTH_KEY = 'YYYYMM';
const YEAR_SHORT_MONTH_KEY = 'YYMM';
const YEAR_MONTH_DAY_KEY = 'YYYYMMDD';
const YEAR_SHORT_MONTH_DAY_KEY = 'YYMMDD';
const FY_KEY = 'YYYYYY'

export const convertDateKeyToPreview = dateKey => {
	const date = new Date();
	let year = date.getFullYear();
	let nextYear = year + 1;
	let month = (date.getMonth() + 1).toString();
	month = month.padStart(2, '0');
	let day = date.getDate().toString();
	day = day.padStart(2, '0');
	
	if (dateKey === YEAR_SHORT_KEY || dateKey === YEAR_SHORT_MONTH_KEY || dateKey === YEAR_SHORT_MONTH_DAY_KEY) {
		year = year.toString().substr(2, 2);
	}

	let dateString = '';

	if (dateKey === YEAR_KEY || dateKey === YEAR_SHORT_KEY) {
		dateString += year;
	} else if (dateKey === YEAR_MONTH_KEY || dateKey === YEAR_SHORT_MONTH_KEY) {
		dateString += year + month;
	} else if (dateKey === YEAR_MONTH_DAY_KEY || dateKey === YEAR_SHORT_MONTH_DAY_KEY) {
		dateString += year + month + day;
	} else if (dateKey === FY_KEY) {
		dateString += year + nextYear.toString().substr(2, 2)
	}

	return dateString;
};
