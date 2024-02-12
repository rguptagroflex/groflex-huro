import moment from 'moment';

export const getRemainingTrialDays = trialEnd => {
	let dateTrialEnd = null;
	let dateNow = moment();
	let remainingTrialDays = -1;

	if (trialEnd) {
		dateTrialEnd = moment(new Date(trialEnd));
		dateNow = moment();
		remainingTrialDays = dateTrialEnd.diff(dateNow, 'days');
	}

	return remainingTrialDays;
};
