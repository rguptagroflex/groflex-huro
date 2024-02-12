import invoiz from 'services/invoiz.service';
import WebStorageService from 'services/webstorage.service';

export const applyAppEnabledFilterItems = (filterItems, webstorageKey) => {
	let newFilterItems = filterItems;

	const currentListSettings = WebStorageService.getItem(webstorageKey);

	if (currentListSettings) {
		newFilterItems = filterItems.filter(filterItem => {
			return filterItem.key !== 'offer';
		});
	}

	let currentFilterEnabled = false;

	if (currentListSettings) {
		newFilterItems.forEach(filter => {
			if (filter.key === currentListSettings.currentFilter) {
				currentFilterEnabled = true;
			}
		});

		if (!currentFilterEnabled) {
			WebStorageService.setItem(webstorageKey, {
				orderBy: currentListSettings.orderBy,
				sortDirection: currentListSettings.sortDirection,
				currentFilter: 'all'
			});
		}
	}

	return newFilterItems;
};
