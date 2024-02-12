import _ from 'lodash';

export const shuffleArray = array => {
	const shuffeldArray = _.cloneDeep(array);
	let currentIndex = shuffeldArray.length;
	let temporaryValue;
	let randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = shuffeldArray[currentIndex];
		shuffeldArray[currentIndex] = shuffeldArray[randomIndex];
		shuffeldArray[randomIndex] = temporaryValue;
	}

	return shuffeldArray;
};
