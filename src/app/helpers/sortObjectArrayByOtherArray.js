export const sortObjectArrayByOtherArray = (arrayA, arrayB, keyA, keyB) => {
	const sortedArrayA = [];

	arrayB.forEach((objB) => {
		const refA = arrayA.find((objA) => objA[keyA] === objB[keyB]);

		if (refA) {
			sortedArrayA.push(refA);
		}
	});

	arrayA.forEach((objA) => {
		const refB = arrayB.find((objB) => objB[keyB] === objA[keyA]);

		if (!refB) {
			sortedArrayA.unshift(objA);
		}
	});

	return sortedArrayA;
};
