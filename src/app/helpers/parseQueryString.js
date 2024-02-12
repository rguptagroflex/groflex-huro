import _ from 'lodash';

export const parseQueryString = queryString => {
	const params = {};

	if (queryString) {
		_.each(
			_.map(
				decodeURI(window.location.search)
					.replace(/^\?/, '')
					.split(/&/g),
				(el, i) => {
					const aux = el.split('=');
					const obj = {};

					if (aux.length >= 1) {
						let val;

						if (aux.length === 2) {
							val = aux[1];
						}

						obj[aux[0]] = val;
					}

					return obj;
				}
			),
			obj => {
				_.extend(params, obj);
			}
		);
	}

	return params;
};
