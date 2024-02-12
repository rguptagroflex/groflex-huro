import invoiz from 'services/invoiz.service';
import download from 'downloadjs';

export const downloadFile = (url, title, mimeType) => {
	fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			authorization: `Bearer ${invoiz.user.token}`,
		},
	})
		.then((response) => response.blob())
		.then((blob) => {
			download(blob, title, mimeType);
		});
};
