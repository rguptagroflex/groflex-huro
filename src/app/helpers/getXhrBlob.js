export const getXhrBlob = (url, callback) => {
	let blob = null;
	const xhr = new XMLHttpRequest();

	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.onload = () => {
		blob = xhr.response;
		callback && callback(blob);
	};

	xhr.send();
};
