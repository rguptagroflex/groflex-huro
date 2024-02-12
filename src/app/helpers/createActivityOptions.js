export const createActivityOptions = (options) => {
	const newOptions = options.map((option) => {
		let icon = '';

		switch (option) {
			case 'Notiz':
				icon = 'icon-note';
				break;
			case 'Meeting':
				icon = 'icon-meeting';
				break;
			case 'Telefonat':
				icon = 'icon-phone';
				break;
			case 'E-Mail':
				icon = 'icon-mail';
				break;
			default:
				icon = 'icon-note';
		}

		return {
			name: option,
			icon,
			isExisting: true,
		};
	});

	newOptions.push({
		name: 'Kategorie hinzufügen',
		isDummy: true,
	});

	return newOptions;
};
