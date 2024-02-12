const helperHash = {};
helperHash['1'] = 'One';
helperHash['2'] = 'Two';
helperHash['3'] = 'Three';
helperHash['4'] = 'Four';
helperHash['5'] = 'Five';
helperHash['6'] = 'Six';
helperHash['7'] = 'Seven';
helperHash['8'] = 'Eight';
helperHash['9'] = 'Nine';
helperHash['10'] = 'Ten';
helperHash['11'] = 'Eleven';
helperHash['12'] = 'Twelve';
helperHash['13'] = 'Thirteen';
helperHash['14'] = 'Fourteen';
helperHash['15'] = 'Fifteen';
helperHash['16'] = 'Sixteen';
helperHash['17'] = 'Seventeen';
helperHash['18'] = 'Eighteen';
helperHash['19'] = 'Nineteen';
helperHash['20'] = 'Twenty';
helperHash['30'] = 'Thirty';
helperHash['40'] = 'Forty';
helperHash['50'] = 'Fifty';
helperHash['60'] = 'Sixty';
helperHash['70'] = 'Seventy';
helperHash['80'] = 'Eighty';
helperHash['90'] = 'Ninety';
helperHash['100'] = 'Hundred';
helperHash['1000'] = 'Thousand';
helperHash['100000'] = 'Lakh';
helperHash['10000000'] = 'Crore';

export function convertToWords(amount) {
	// Seperating rupees amount and paisa amount
	amount = amount.toFixed(2);
	const wholeAmount = amount.toString().split('.')[0];
	const decimalAmount = amount.toString().split('.')[1] ? amount.toString().split('.')[1] : '0';

	let wholeAmountInWords = '';
	let decimalAmountInWords = '';
	let limitedExceeded = false;

	// Handling rupees amount
	// Removing leading zeros
	if (Number(wholeAmount).toString().length > 11) {
		limitedExceeded = true;
	} else {
		wholeAmountInWords = getAmountInWords(wholeAmount);
		decimalAmountInWords = getHundredthPlace(decimalAmount.slice(0, 2));
	}

	if (limitedExceeded) {
		return '';
	} else {
		return `${wholeAmountInWords.length ? `${wholeAmountInWords} Rupee${wholeAmountInWords === 'One' ? '' : 's'}` : ``}${wholeAmountInWords.length && decimalAmountInWords.length ? ' and ' : ''}${decimalAmountInWords.length ? `${decimalAmountInWords} Paisa` : ``}`;
	}
}

function getAmountInWords(amount) {
	amount = Number(amount).toString();
	const amountLength = amount.toString().length;

	if (amountLength <= 3) {
		return getHundredthPlace(amount);
	} else if (amountLength > 3 && amountLength <= 5) {
		return getThousandthPlace(amount);
	} else if (amountLength > 5 && amountLength <= 7) {
		return getLakhsPlace(amount);
	} else if (amountLength > 7 && amountLength <= 9) {
		return getCrorePlace(amount);
	} else if (amountLength > 9 && amountLength <= 11) {
		return getHundredCrorePlace(amount);
	} else return '';
}

function getHundredthPlace(lastThreeDigits) {
	let result = '';
	if (lastThreeDigits === '000') {
		result = '';
	} else if (helperHash[lastThreeDigits]) {
		result = helperHash[lastThreeDigits];
	} else {
		const finalArray = [];
		const firstDigit = Math.floor((lastThreeDigits % 1000) / 100);
		if (firstDigit !== 0) {
			finalArray.push(helperHash[firstDigit]);
			finalArray.push(helperHash[100]);
		}
		const lastTwoDigits = (lastThreeDigits % 100).toString();
		if (helperHash[lastTwoDigits]) {
			finalArray.push(helperHash[lastTwoDigits]);
		} else {
			const secondLastDigit = lastTwoDigits.split('')[0];
			finalArray.push(helperHash[secondLastDigit * 10]);
			finalArray.push(helperHash[lastTwoDigits.split('')[1]]);
		}
		result = finalArray.join(' ');
	}
	return result.trim();
}

function getThousandthPlace(amount) {
	if (amount === '0') {
		return '';
	}
	const firstTwoDigits = Math.floor((amount % 100000) / 1000).toString();
	const lastThreeDigits = (amount % 1000).toString();
	const finalArray = [];
	if (helperHash[firstTwoDigits]) {
		finalArray.push(helperHash[firstTwoDigits]);
	} else {
		const secondDigit = firstTwoDigits.split('')[0];
		finalArray.push(helperHash[secondDigit * 10]);
		finalArray.push(helperHash[firstTwoDigits.split('')[1]]);
	}
	finalArray.push(helperHash[1000]);
	finalArray.push(getHundredthPlace(lastThreeDigits));
	return finalArray.join(' ').trim();
}

function getLakhsPlace(amount) {
	if (amount === '0') {
		return '';
	}
	const firstTwoDigits = Math.floor((amount % 10000000) / 100000).toString();
	const thousandthPlaceDigits = (amount % 100000).toString();
	const finalArray = [];
	if (helperHash[firstTwoDigits]) {
		finalArray.push(helperHash[firstTwoDigits]);
	} else {
		const secondDigit = firstTwoDigits.split('')[0];
		finalArray.push(helperHash[secondDigit * 10]);
		finalArray.push(helperHash[firstTwoDigits.split('')[1]]);
	}
	finalArray.push(helperHash[100000]);
	finalArray.push(getThousandthPlace(thousandthPlaceDigits));
	return finalArray.join(' ').trim();
}

function getCrorePlace(amount) {
	const firstTwoDigits = Math.floor((amount % 1000000000) / 10000000).toString();
	const lakhPlaceDigits = (amount % 10000000).toString();
	const finalArray = [];
	if (helperHash[firstTwoDigits]) {
		finalArray.push(helperHash[firstTwoDigits]);
	} else {
		const secondDigit = firstTwoDigits.split('')[0];
		finalArray.push(helperHash[secondDigit * 10]);
		finalArray.push(helperHash[firstTwoDigits.split('')[1]]);
	}
	finalArray.push(helperHash[10000000]);
	finalArray.push(getLakhsPlace(lakhPlaceDigits));
	return finalArray.join(' ').trim();
}

function getHundredCrorePlace(amount) {
	const firstTwoDigits = Math.floor((amount % 100000000000) / 1000000000).toString();
	const crorePlaceDigits = (amount % 1000000000).toString();
	const finalArray = [];
	if (helperHash[firstTwoDigits]) {
		finalArray.push(helperHash[firstTwoDigits]);
	} else {
		const secondDigit = firstTwoDigits.split('')[0];
		finalArray.push(helperHash[secondDigit * 10]);
		finalArray.push(helperHash[firstTwoDigits.split('')[1]]);
	}
	finalArray.push(helperHash[100]);
	finalArray.push(getCrorePlace(crorePlaceDigits));
	return finalArray.join(' ').trim();
}
