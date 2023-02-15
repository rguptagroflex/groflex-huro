import React from 'react';
import ReactDOM from 'react-dom';
import NotificationComponent from 'shared/notification/notification.component';
import { generateUuid } from 'helpers/generateUuid';

class NotificationService {
	constructor() {
		const notificationWrapper = document.createElement('div');
		notificationWrapper.id = 'notification-component-wrapper';
		document.body.appendChild(notificationWrapper);
	}

	remove(notificationComponentId) {
		if ($(`#${notificationComponentId}`).length > 0) {
			ReactDOM.unmountComponentAtNode(document.querySelector(`#${notificationComponentId}`));
			document.querySelector(`#${notificationComponentId}`).remove();
			document.querySelector('#notification-component-wrapper').classList = '';
		}
	}

	show(options) {
		const { title, message, points, type, svgIcon, onClick, wrapperClass } = options;
		const notificationComponentWrapper = document.createElement('div');
		const notificationComponentId = `notification-component-${generateUuid()}`;
		notificationComponentWrapper.id = notificationComponentId;

		document.querySelector('#notification-component-wrapper').classList = wrapperClass || '';
		document.querySelector('#notification-component-wrapper').prepend(notificationComponentWrapper);

		ReactDOM.render(
			React.createElement(NotificationComponent, {
				id: notificationComponentId,
				title,
				message,
				points,
				type,
				svgIcon,
				wrapperClass,
				onClick: () => {
					if (onClick) {
						onClick();
					} else {
						this.remove(notificationComponentId);
					}
				},
				onRemove: id => {
					this.remove(id);
				}
			}),
			document.querySelector(`#${notificationComponentId}`)
		);
	}
}

export default new NotificationService();
