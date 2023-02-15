import invoiz from 'services/invoiz.service';

const getKey = (key, usePlainKey) => {
	let newKey = key;

	if (invoiz && invoiz.user && invoiz.user.loggedIn && invoiz.user.tenantId && invoiz.user.userId && !usePlainKey) {
		const { tenantId, userId } = invoiz.user;
		newKey = `${tenantId}_${userId}_${key}`;
	}

	return newKey;
};

class WebStorageService {
	constructor() {
		this._storageType = 'localStorage';
		this._fallbackStorage = {};

		if (!navigator.cookieEnabled || !window.localStorage) {
			this._storageType = 'webStorageFallback';
			this._createFallbackStorage();
		}
	}

	setItem(key, value, usePlainKey) {
		const newKey = getKey(key, usePlainKey);
		window[this._storageType].setItem(newKey, typeof value === 'string' ? value : JSON.stringify(value));
	}

	getItem(key, usePlainKey) {
		const newKey = getKey(key, usePlainKey);
		let value = null;

		try {
			value = JSON.parse(window[this._storageType].getItem(newKey));
		} catch (err) {
			value = window[this._storageType].getItem(newKey);
		}

		return value;
	}

	removeItem(key, usePlainKey) {
		const newKey = getKey(key, usePlainKey);
		window[this._storageType].removeItem(newKey);
	}

	clear() {
		window[this._storageType].clear();
	}

	_createFallbackStorage() {
		const self = this;

		window[this._storageType] = {
			clear: () => {
				self._fallbackStorage = {};
			},

			getItem: (key, usePlainKey) => {
				const newKey = getKey(key, usePlainKey);
				return self._fallbackStorage[newKey];
			},

			removeItem: (key, usePlainKey) => {
				const newKey = getKey(key, usePlainKey);
				delete self._fallbackStorage[newKey];
			},

			setItem: (key, value, usePlainKey) => {
				const newKey = getKey(key, usePlainKey);
				self._fallbackStorage[newKey] = value;
			},
		};
	}
}

export default new WebStorageService();
