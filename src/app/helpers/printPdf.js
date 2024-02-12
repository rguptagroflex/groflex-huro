import invoiz from 'services/invoiz.service';
import { isIE, isFirefox, isChromeSafari, isChrome, isSafari } from 'helpers/isBrowser';

export const printPdf = options => {
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
		.then(response => {
			return response.arrayBuffer();
		})
		.then(data => {
			const oldPrintFrame = document.getElementById('printFrame');

			if (oldPrintFrame) {
				oldPrintFrame.parentNode.removeChild(oldPrintFrame);
			}

			const newBlob = new Blob([data], { type: 'application/pdf' });
			const objectURL = window.URL.createObjectURL(newBlob);

			const printFrame = document.createElement('iframe');
			printFrame.id = 'printFrame';
			printFrame.name = 'printFrame';
			printFrame.style.display = 'none';
			printFrame.src = objectURL;

			if (isFirefox()) {
				const link = document.createElement('a');
				link.href = objectURL;
				link.target = '_blank';
				link.dispatchEvent(new MouseEvent(`click`, { bubbles: true, cancelable: true, view: window }));
				options.callback && options.callback();
			} 
			else if (isChrome()) {
				const link = document.createElement('a');
				link.href = objectURL;
				link.target = '_blank';
				link.dispatchEvent(new MouseEvent(`click`, { bubbles: true, cancelable: true, view: window }));
				options.callback && options.callback();
			} 
			else if (!isIE()) {
				printFrame.onload = () => {
					printFrame.contentWindow.focus();
					printFrame.contentWindow.print();
					options.callback && options.callback();
				};
			} else {
				printFrame.onload = () => {
					setTimeout(() => {
						printFrame.contentWindow.focus();
						printFrame.contentWindow.print();
						options.callback && options.callback();
					}, 1000);
				};
			}

			document.body.appendChild(printFrame);
		});
};

export const printPdfPrepare = (options) => {
	invoiz
		.request(options.url, {
			auth: true,
			method: 'POST',
			data: {
				isPrint: true,
			},
		})
		.then((res) => {
			options.callback && options.callback(res);
		})
		.catch(() => {
			invoiz.showNotification({ message: lang.defaultErrorMessage, type: 'error' });
		});
};