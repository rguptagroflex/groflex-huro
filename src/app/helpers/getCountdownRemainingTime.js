const monthDayCount = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isLeapYear = year => {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const getCountdownRemainingTime = (startDate, endDate) => {
	const startEndDifference = new Date(endDate - startDate);
	const startEndDifferenceSeconds = Math.floor(startEndDifference.valueOf() / 1000);

	let remainingMonths = 0;
	let remainingDays = Math.floor(startEndDifferenceSeconds / 86400) % (100 * 1000);

	for (let thisYear = startDate.getFullYear(); remainingDays >= (isLeapYear(thisYear + 1) ? 366 : 365); thisYear++) {
		remainingDays -= isLeapYear(thisYear + 1) ? 366 : 365;
	}

	for (let thisMonth = startDate.getMonth(); remainingDays >= monthDayCount[thisMonth]; thisMonth++) {
		remainingDays -= monthDayCount[thisMonth];
		remainingMonths++;

		if (thisMonth === 11) {
			thisMonth = 0;
		}
	}

	return {
		months: remainingMonths,
		days: remainingDays
	};
};
