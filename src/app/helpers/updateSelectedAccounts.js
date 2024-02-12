import WebStorageService from 'services/webstorage.service';
import WebStorageKey from 'enums/web-storage-key.enum';

export const updateSelectedAccountsForAllViews = addedAccounts => {
	const cachedAccounts = WebStorageService.getItem(WebStorageKey.SELECTED_BANK_ACCOUNTS);
	const cachedAccountsCockpit = WebStorageService.getItem(WebStorageKey.SELECTED_BANK_ACCOUNTS_COCKPIT);

	const accounts = JSON.parse(JSON.stringify(addedAccounts));
	const accountsCockpit = JSON.parse(JSON.stringify(addedAccounts));

	if (cachedAccounts && cachedAccounts[0] !== 'all') {
		cachedAccounts.forEach(accountId => {
			accounts.push({
				id: accountId
			});
		});
	}

	if (cachedAccountsCockpit && cachedAccountsCockpit[0] !== 'all') {
		cachedAccountsCockpit.forEach(accountId => {
			accountsCockpit.push({
				id: accountId
			});
		});
	}

	updateSelectedAccounts(accounts, WebStorageKey.SELECTED_BANK_ACCOUNTS, true);
	updateSelectedAccounts(accountsCockpit, WebStorageKey.SELECTED_BANK_ACCOUNTS_COCKPIT, true);
};

export const updateSelectedAccounts = (accounts, webstorageKey, isFullUpdate) => {
	const cachedSelectedAccounts = WebStorageService.getItem(webstorageKey);
	let updatedSelectedAccounts = [];

	if (cachedSelectedAccounts && cachedSelectedAccounts[0] !== 'all') {
		if (isFullUpdate) {
			accounts.forEach(account => {
				updatedSelectedAccounts.push(account.id);
			});
		} else {
			accounts.forEach(account => {
				if (cachedSelectedAccounts.indexOf(account.id) !== -1) {
					updatedSelectedAccounts.push(account.id);
				}
			});
		}
	}

	if (updatedSelectedAccounts.length === 0) {
		updatedSelectedAccounts = ['all'];
	}

	WebStorageService.setItem(webstorageKey, updatedSelectedAccounts);

	return updatedSelectedAccounts;
};
