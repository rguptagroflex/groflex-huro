export const getScaledValue = (value, sourceScale, targetScale) => {
	return Math.floor((value / targetScale) * sourceScale);
};
