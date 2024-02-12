import React from 'react';
import ReactDOM from 'react-dom';
import LoadingOverlayComponent from 'shared/loading-overlay/loading-overlay.component';
import { getResource } from 'helpers/resource';

class LoadingService {
	constructor() {
		const loadingElement = document.createElement('div');
		loadingElement.id = 'loading-overlay-wrapper';
		document.body.appendChild(loadingElement);

		setTimeout(() => {
			this.loadingOverlay = ReactDOM.render(
				React.createElement(LoadingOverlayComponent, {}),
				document.getElementById('loading-overlay-wrapper')
			);
		});
	}

	show(content) {
		$('body').addClass('is-loading');
		this.loadingOverlay.show(content || getResource('str_loading'));
	}

	hide() {
		this.loadingOverlay.hide();
		$('body').removeClass('is-loading');
	}
}

export default new LoadingService();
