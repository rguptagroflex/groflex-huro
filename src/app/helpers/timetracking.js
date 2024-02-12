const moment = require('moment');

const removePrepaddedZeros = timeStringSlice => {
	return timeStringSlice.match(/^0+$/g, '') ? '0' : timeStringSlice.replace(/^0*/g, '');
};

const isNegativeOrNotANumber = numberAsString => {
	const sanitizedNumberAsString = removePrepaddedZeros(numberAsString);
	const num = parseInt(sanitizedNumberAsString || 0, 10);
	return num < 0 || num !== parseInt(numberAsString, 10);
};

const sanitizeTimeString = timeString => {
	const timeSlices = timeString ? timeString.split(':') : [];
	const sanitizedTimeSlices = timeSlices.map(removePrepaddedZeros);

	if (sanitizedTimeSlices.length === 1 && !isNegativeOrNotANumber(sanitizedTimeSlices[0])) {
		return `${sanitizedTimeSlices[0]}:00`;
	} else if (
		sanitizedTimeSlices.length > 1 &&
		!isNegativeOrNotANumber(sanitizedTimeSlices[0]) &&
		!isNegativeOrNotANumber(sanitizedTimeSlices[1])
	) {
		const minutes = sanitizedTimeSlices[1].length === 2 ? sanitizedTimeSlices[1] : `0${sanitizedTimeSlices[1]}`;
		return `${sanitizedTimeSlices[0]}:${minutes}`;
	}
	return '0:00';
};

export const convertStringToTimeObject = timeString => {
	const validTimeString = sanitizeTimeString(timeString);
	const timeSlices = validTimeString.split(':');
	const timeObject = {
		hour: parseInt(timeSlices[0], 10),
		minute: parseInt(timeSlices[1], 10)
	};

	return timeObject;
};

export const isValid24HourTimeObject = timeObject => {
	const isWithinHourBoundary = timeObject.hour >= 0 && timeObject.hour < 24;
	const isWithinMinuteBoundary = timeObject.minute >= 0 && timeObject.minute < 60;
	return isWithinHourBoundary && isWithinMinuteBoundary;
};

export const calculateDiffBetweenTwoTimeStrings = (startTimeString, endTimeString) => {
	const timeStartObject = convertStringToTimeObject(startTimeString);
	const timeEndObject = convertStringToTimeObject(endTimeString);
	const calculatedTrackedTime = {
		hour: 0,
		minute: 0
	};

	// only calculate the difference if start < end; else return { hour: 0, minute: 0 }
	if (
		timeStartObject.hour < timeEndObject.hour ||
		(timeStartObject.hour === timeEndObject.hour && timeStartObject.minute < timeEndObject.minute)
	) {
		if (timeStartObject.minute <= timeEndObject.minute) {
			calculatedTrackedTime.minute = timeEndObject.minute - timeStartObject.minute;
		} else {
			calculatedTrackedTime.minute = 60 - (timeStartObject.minute - timeEndObject.minute);
			calculatedTrackedTime.hour = -1;
		}
		calculatedTrackedTime.hour = calculatedTrackedTime.hour + (timeEndObject.hour - timeStartObject.hour);
	}

	return calculatedTrackedTime;
};

export const convertMinutesToTimeString = durationInMinutes => {
	let timeString = '0:00';

	if (durationInMinutes > 0) {
		const hours = Math.floor(durationInMinutes / 60);
		let minutes = durationInMinutes % 60;
		if (minutes === 0) {
			minutes = '00';
		} else if (minutes < 10) {
			minutes = `0${minutes}`;
		}
		timeString = `${hours}:${minutes}`;
	}

	return timeString;
};

export const getRemainingTime = (start, endAmount, endUnit) => {
	const startDateTime = moment();
	let endDateTime = moment(new Date(start)).add(endAmount, endUnit);
	let timeLeft = endDateTime.diff(startDateTime, 'milliseconds', true);
	const remainingMinutes = Math.floor(moment.duration(timeLeft).asMinutes());

	endDateTime = endDateTime.subtract(remainingMinutes, 'minutes');
	timeLeft = endDateTime.diff(startDateTime, 'milliseconds', true);

	const remainingSeconds = Math.floor(moment.duration(timeLeft).asSeconds());

	return {
		minutes: remainingMinutes,
		seconds: remainingSeconds
	};
};