import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import invoiz from 'services/invoiz.service';
import ModalService from 'services/modal.service';
import { getResource } from './resource';

class ChangeDetection {
	constructor() {
		this.getModels = $.noop;
		this.checkForChanges = this.checkForChanges.bind(this);
	}

	checkForChanges(evt) {
		const models = this.getModels();
		const isModelUnchanged = _.isEqual(models.original, models.current);
		if (!isModelUnchanged) {
			evt.preventDefault();
			evt.stopPropagation();

			ModalService.open(
				<div dangerouslySetInnerHTML={{ __html: getResource('unSavedChangesMessage') }}></div>,
				{
					headline: getResource('str_attention'),
					confirmLabel: getResource('str_yesLowerCase'),
					cancelLabel: getResource('str_noLowerCase'),
					onConfirm: () => {
						ModalService.close();

						let targetRoute = $(evt.target).attr('data-href');

						if (!targetRoute) {
							targetRoute = $(evt.target)
								.closest('.menuItem')
								.attr('data-href');

							if (!targetRoute) {
								targetRoute = '/';
							}
						}

						invoiz.router.navigate(targetRoute);
					}
				}
			);
		}
	}

	setModelGetter(getModelsFunc) {
		this.getModels = getModelsFunc;
	}

	bindEventListeners(opts) {
		$('.menuBar_content a:not([href]), .menuBar_content div.menuItem, .menuHeader_logo, .topbar-back-button').each((idx, elm) => {
			$(elm).on('click', this.checkForChanges);
		});
	}

	unbindEventListeners(opts) {
		$('.menuBar_content a:not([href]), .menuBar_content div.menuItem, .menuHeader_logo, .topbar-back-button').each((idx, elm) => {
			$(elm).off('click', this.checkForChanges);
		});
	}
}

export default ChangeDetection;
