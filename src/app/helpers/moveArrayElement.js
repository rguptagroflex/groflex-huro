export const moveArrayElement = (arr, oldIndex, newIndex) => {
	if (newIndex >= arr.length) {
		let k = newIndex - arr.length + 1;

		while (k--) {
			arr.push(undefined);
		}
	}

	arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
};
