export const parseInterpolationTags = (tagInterpolators, value, callback) => {
	value = value
		.split(tagInterpolators[0])
		.map((s1, i) => {
			const s2 = s1.split(tagInterpolators[1]);
			const preInterpolated = s2[0];
			let tagData;
			let parsedTagOutput;

			try {
				tagData = JSON.parse(preInterpolated);

				if (tagData) {
					if (callback) {
						parsedTagOutput = callback(tagData);
						s1 = s1.replace(preInterpolated, parsedTagOutput || '');
					}
				}
			} catch (err) {}

			if (s1) {
				return i
					? (tagData ? '' : tagInterpolators[0]) + (tagData ? s1.replace(tagInterpolators[1], '') : s1)
					: s1;
			}

			return s2.join('');
		})
		.join('');

	return value;
};
