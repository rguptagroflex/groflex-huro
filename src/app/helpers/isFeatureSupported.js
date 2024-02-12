const features = {
	smil: function() {
		return (
			document.createElementNS &&
			/SVGAnimate/.test(document.createElementNS('http://www.w3.org/2000/svg', 'animate'))
		);
	}
};

const isFeatureSupported = name => {
	if (features.hasOwnProperty(name)) {
		return features[name]();
	}
};

export default isFeatureSupported;
