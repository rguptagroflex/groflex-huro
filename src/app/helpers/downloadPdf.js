import invoiz from 'services/invoiz.service';
import download from 'downloadjs';

export const downloadPdf = options => {
	const fetchPromise = options.isPost
		? fetch(options.pdfUrl, {
			body: JSON.stringify(options.postData),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				authorization: `Bearer ${invoiz.user.token}`
			}
		  })
		: fetch(options.pdfUrl, {
			method: 'GET'
		  });

	fetchPromise
		.then(response => response.arrayBuffer())
		.then(arrayBuffer => PDFJS.getDocument(arrayBuffer))
		.then(pdf => pdf.getData())
		.then(pdfData => {
			download(pdfData, `${options.title}.pdf`, 'application/pdf');
			options.callback && options.callback();
		});
};
