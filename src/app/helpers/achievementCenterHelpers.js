import moment from 'moment';
import { getCountdownRemainingTime } from 'helpers/getCountdownRemainingTime';
import { getResource } from './resource';

export const getAchievementNextActivationCountdown = freeMonthActivatedAt => {
	let newActivationPossibleDate = null;
	let remainingMonths = 0;
	let remainingDays = 0;

	newActivationPossibleDate = moment(new Date(freeMonthActivatedAt))
		.endOf('day')
		.add(6, 'months');

	const remainingTime = getCountdownRemainingTime(new Date(moment().endOf('day')), newActivationPossibleDate);
	remainingMonths = remainingTime.months;
	remainingDays = remainingTime.days;

	if (remainingMonths < 0) {
		remainingMonths = 0;
	}

	if (remainingDays < 0) {
		remainingDays = 0;
	}

	return {
		remainingMonths,
		remainingDays
	};
};

export const getAchievementRank = (reachedPoints, activateFreeMonth) => {
	let minPoints = 0;
	let maxPoints = 0;
	let rankTitle = '';

	if (!activateFreeMonth) {
		reachedPoints += 1;
	}

	if (reachedPoints <= 500) {
		minPoints = 0;
		maxPoints = 500;
		rankTitle = getResource('achievementRankTitle1');
	} else if (reachedPoints > 500 && reachedPoints <= 1000) {
		minPoints = 500;
		maxPoints = 1000;
		rankTitle = getResource('achievementRankTitle2');
	} else if (reachedPoints > 1000 && reachedPoints <= 1500) {
		minPoints = 1000;
		maxPoints = 1500;
		rankTitle = getResource('achievementRankTitle3');
	} else if (reachedPoints > 1500 && reachedPoints <= 2000) {
		minPoints = 1500;
		maxPoints = 2000;
		rankTitle = getResource('achievementRankTitle4');
	} else if (reachedPoints > 2000 && reachedPoints <= 2500) {
		minPoints = 2000;
		maxPoints = 2500;
		rankTitle = getResource('achievementRankTitle5');
	} else if (reachedPoints > 2500) {
		minPoints = 2500;
		maxPoints = 3000;
		rankTitle = getResource('achievementRankTitle6');
	}

	return {
		minPoints,
		maxPoints,
		rankTitle
	};
};
