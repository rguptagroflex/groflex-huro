import invoiz from 'services/invoiz.service';
import config from 'config';
import { getResource } from 'helpers/resource';
import { getCountries } from 'helpers/getCountries';
import toProperCase from 'helpers/toProperCase';
class ImportService {
	createObjects(rows, columns) {
		const data = [];
		if (rows && rows.length > 0) {
			rows.forEach(row => {
				const entry = { address: {} };
				columns.forEach((column, index) => {
					if (column && column.key) {
						if (['street', 'zipCode', 'city', 'countryIso', 'gstNumber', 'cinNumber'].indexOf(column.key) >= 0) {
							entry.address[column.key] = row[index] || null;

							if (
								column.key === 'countryIso' &&
								entry.address[column.key] &&
								entry.address[column.key].length >= 2
							) {
								if (entry.address[column.key].length === 2) {
									entry.address[column.key] = row[index].toUpperCase();
								} else {
									const countries = getCountries();
									const selectedCountry = countries.find(country => {
										return country.label === entry.address[column.key];
									});
									entry.address[column.key] = selectedCountry ? selectedCountry.iso2 : '';
								}
							} else if (
							 column.key === 'countryIso' &&
							 (entry.address[column.key] === '' || entry.address[column.key] === null || entry.address[column.key].length <= 1)
							) {
								entry.address[column.key] = 'IN';
							} else if (['street', 'city'].indexOf(column.key) >= 0) {
								entry.address[column.key] = row[index] ? toProperCase(row[index]) : '';
							}
						 } else if (['stateName', 'category', 'firstName', 'lastName'].indexOf(column.key) >= 0) {
							entry[column.key] = row[index] ? toProperCase(row[index]) : '';
						} else if (['salutation', 'email', 'type', 'kind', 'phone1', 'phone2', 'unit'].indexOf(column.key) >= 0) {
							entry[column.key] = row[index] && (typeof row[index]) !== 'number' ? row[index].replace(/\s+/g, '') : '';
							if (['email', 'type', 'kind'].indexOf(column.key) >= 0) {
								entry[column.key] = entry[column.key] ? entry[column.key].toLowerCase() : '';
							}
						} else {
							 entry[column.key] = (typeof row[index]) === 'number' ? row[index].toString() : row[index] || null;

							if (
								entry[column.key] &&
								(column.key === 'price' || column.key === 'purchasePrice' || column.key === 'discount')
							) {
								entry[column.key] = entry[column.key].replace(',', '.');
							}
						}

					}
				});

				data.push(entry);
			});
		}

		return data;
	}

	getDefaultColumns(type) {
		switch (type) {
			case 'customers':
				return Object.freeze(getCustomerFields());

			case 'articles':
				return Object.freeze(getArticleFields());
		}
	}

	import(data, type) {
		switch (type) {
			case 'customers':
				return importCustomers(data);

			case 'articles':
				return importArticles(data);
		}
	}

	mapErrors(errors, type) {
		const fields = type === 'customers' ? getCustomerFields() : getArticleFields();

		errors.forEach(error => {
			const field = fields.find(field => {
				return field.key === error.key;
			});

			const ERROR_REASONS = [
				{
					key: 'numberExists',
					label: getResource('str_alreadyTaken')
				}
			];

			const reason = ERROR_REASONS.find(reason => {
				return reason.key === error.reason;
			});

			if (field) {
				error.description = `${getResource('str_row')} ${error.index + 1}, ${field.label} ${reason ? reason.label : getResource('str_invalid')}`;
			}
		});

		return errors;
	}

	validate(data, type) {
		const invalidRows = [];
		let fields;

		switch (type) {
			case 'customers':
				fields = getCustomerFields();
				break;

			case 'articles':
				fields = getArticleFields();
				break;
		}

		if (data && data.length > 0) {
			data.forEach((field, index) => {
				const invalidColumns = [];
				fields.forEach(column => {
					if (Array.isArray(column.required)) {
						const key = column.required[0];
						const value = column.required[1];
						if (!field[key] || (field[key].toLowerCase() === value.toLowerCase() && !field[column.key])) {
							invalidColumns.push(column);
						}
					} else if (column.allowed) {
						column.allowed = column.allowed.map(function(x) { return x.toLowerCase(); });
						if (column.required) {
							if (field[column.key] && column.allowed.indexOf(field[column.key].toLowerCase()) === -1) {
								invalidColumns.push(column);
							} else if (field[column.key] === null || field[column.key] === '') {
								invalidColumns.push(column);
								column.required = column.allowed;
								delete column.allowed;
							}
						} else {

							if (field[column.key] && column.allowed.indexOf(field[column.key].toLowerCase()) === -1) {
								invalidColumns.push(column);
							}

							if (
								field['address'] &&
								field['address'][column.key] &&
								column.allowed.indexOf(field['address'][column.key].toLowerCase()) === -1
							) {
								invalidColumns.push(column);
							}
						}
					} else if (column.required && !field[column.key]) {
						invalidColumns.push(column);
					} else if (column.key === 'discount' && (field[column.key] < 0 || field[column.key] > 100)) {
						invalidColumns.push(column);
					}
				});

				if (invalidColumns.length > 0) {
					invalidRows.push({ index, invalidColumns });
				}
			});
		}

		return invalidRows;
	}

	parseInput(input) {
		let columnCount = 0;
		const rows = [];

		if (input.length > 0) {
			// const lines = input.split('\n');

			input.forEach(columns => {
				let rowHasValues = false;
				// const columns = line.split('\t');
				const row = {};

				columns.forEach((column, index) => {
					row[index] = column;
					if (column) {
						rowHasValues = true;
					}
				});

				if (rowHasValues) {
					columnCount = columns.length > columnCount ? columns.length : columnCount;
					rows.push(row);
				}
			});
		}
		return { rows, columnCount };
	}
}

export default new ImportService();

const importArticles = articles => {
	return new Promise((resolve, reject) => {
		invoiz
			.request(`${config.resourceHost}import/articles`, {
				method: 'POST',
				auth: true,
				data: { articles }
			})
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				reject(err);
			});
	});
};

const importCustomers = customers => {
	customers.forEach(customer => {
		if (customer.kind && customer.kind.toLowerCase() === 'private') {
			customer.kind = 'person';
		}

		if (customer.kind && customer.kind.toLowerCase() === 'company') {
			customer.kind = 'company';
		}
		if (customer.type) {
			customer.type = customer.type.toLowerCase();
		}
	});
	return new Promise((resolve, reject) => {
		invoiz
			.request(`${config.resourceHost}import/customers`, {
				method: 'POST',
				auth: true,
				data: { customers }
			})
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				reject(err);
			});
	});
};

const getArticleFields = () => {
	const ARTICLE_FIELDS = [
		{
			key: 'number',
			label: getResource('str_articleNumber')
		},
		{
			key: 'title',
			label: getResource('str_designation'),
			required: true
		},
		{
			key: 'description',
			label: getResource('str_description')
		},
		{
			key: 'hsnSacCode',
			label: getResource('str_hsnSacCode')
		},
		{
			key: 'vatPercent',
			label: getResource('str_vatUpperCase'),
			allowed: config.vatPercentArray
		},
		{
			key: 'purchasePrice',
			label: getResource('str_purchasePrice')
		},
		{
			key: 'price',
			label: getResource('str_salesPrice')
		},
		{
			key: 'unit',
			label: getResource('str_unit'),
			required: true
		},
		{
			key: 'category',
			label: getResource('str_articleCategory')
		}
	];
	return ARTICLE_FIELDS;
};

const allowedCountryValues = config.countries.map(country => {
	return country.iso2;
});

const allowedStateValues = config.states.map(state => {
	return state.stateName;
});

const getCustomerFields = () => {
	const CUSTOMER_FIELDS = [
		{
			key: 'kind',
			label: getResource('str_kind'),
			required: true,
			allowed: ['Company', 'Private']
		},
		{
			key: 'number',
			label: getResource('str_custPayeeNumber')
		},
		{
			key: 'companyName',
			label: getResource('str_companyName'),
			required: ['kind', 'Company']
		},
		{
			key: 'gstNumber',
			label: getResource('str_gstNumber')
		},
		{
			key: 'cinNumber',
			label: getResource('str_cinNumber')
		},
		{
			key: 'salutation',
			label: getResource('str_salutation')
		},
		{
			key: 'title',
			label: getResource('str_title')
		},
		{
			key: 'lastName',
			label: getResource('str_surName'),
			required: true
		},
		{
			key: 'firstName',
			label: getResource('str_firstName')
		},
		{
			key: 'street',
			label: getResource('str_street')
		},
		{
			key: 'zipCode',
			label: getResource('str_postCode')
		},
		{
			key: 'city',
			label: getResource('str_city')
		},
		{
			key: 'stateName',
			label: getResource('str_state'),
			required: true
		},
		{
			key: 'countryIso',
			label: getResource('str_country'),
			allowed: allowedCountryValues
		},
		{
			key: 'email',
			label: getResource('str_email')
		},
		{
			key: 'website',
			label: getResource('str_website')
		},
		{
			key: 'phone1',
			label: getResource('str_phone1')
		},
		{
			key: 'phone2',
			label: getResource('str_phone2')
		},
		{
			key: 'fax',
			label: getResource('str_fax')
		},
		{
			key: 'mobile',
			label: getResource('str_mobile')
		},
		{
			key: 'category',
			label: getResource('str_contactCategory')
		},
		{
			key: 'type',
			label: getResource('str_contactType'),
			required: true,
			allowed: ['customer', 'payee']
		},
		{
			key: 'discount',
			label: getResource('str_discount')
		}
	];
	return CUSTOMER_FIELDS;
};
