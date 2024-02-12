import invoiz from 'services/invoiz.service';
import React from 'react';
import ReactDOM from 'react-dom';
import ModalBaseComponent from 'shared/modals/modal-base.component';

class ModalService {
	constructor() {
		const modalElement = document.createElement('div');
		modalElement.id = 'modal-component-wrapper';
		document.body.appendChild(modalElement);

		setTimeout(() => {
			this.modalBase = ReactDOM.render(
				React.createElement(ModalBaseComponent, {}),
				document.getElementById('modal-component-wrapper')
			);
		});

		invoiz.on('triggerModalClose', () => {
			this.close();
		});
	}

	open(content, options) {
		$('body').addClass('has-modal');
		this.modalBase.open(content, options);
	}

	close(isFromCancel) {
		this.modalBase.close(isFromCancel);
		setTimeout(() => {
			$('body').removeClass('has-modal');
		}, 300);
	}
}

export default new ModalService();
