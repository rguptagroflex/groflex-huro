export const createArrayGroups = (items, count, verticalGroups) => {
	let groups = [];
	let currentRowIndex = -1;
	let groupsVertical = null;

	items.forEach((item, index) => {
		if (index % count === 0) {
			groups.push([]);
			currentRowIndex++;
		}

		groups[currentRowIndex].push(item);
	});

	if (verticalGroups) {
		groupsVertical = [];

		for (let i = 0; i < count; i++) {
			groupsVertical.push([]);
		}

		groups.forEach((group, groupIndex) => {
			group.forEach((item, itemIndex) => {
				groupsVertical[itemIndex].push(item);
			});
		});

		groups = groupsVertical;
	}

	return groups;
};
