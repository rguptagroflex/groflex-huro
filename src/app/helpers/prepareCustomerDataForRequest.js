import { omit } from 'lodash';
import { customerTypes } from 'helpers/constants';

const { COMPANY, PERSON } = customerTypes;

const propsToOmitForTransactionCustomerData = [
	'id',
	'deliveryConditionId',
	'payConditionId',
	'notes',
	'notesAlert',
	'category',
	'discount',
	'country',
	'credits',
	'debits',
	'outstandingAmount'
];

const cleanCustomerData = customerData => {
	if (customerData.kind === PERSON) {
		['companyName', 'companyNameAffix'].forEach(key => {
			if (customerData.hasOwnProperty(key)) {
				delete customerData[key];
			}
		});
	}

	if (customerData.hasOwnProperty('contact') && Object.keys(customerData.contact).length === 0) {
		['contactPersonFirstName', 'contactPersonLastName', 'contactPersonSalutation', 'contactPersonTitle'].forEach(
			key => {
				if (customerData.hasOwnProperty(key)) {
					delete customerData[key];
				}
			}
		);

		delete customerData['contact'];
	}

	if (customerData.hasOwnProperty('contact') && Object.keys(customerData.contact).length > 0) {
		['contactPersonFirstName', 'contactPersonLastName', 'contactPersonSalutation', 'contactPersonTitle'].forEach(
			key => {
				if (customerData.hasOwnProperty(key)) {
					delete customerData[key];
				}
			}
		);

		['contactPersonFirstName', 'contactPersonLastName', 'contactPersonSalutation', 'contactPersonTitle'].forEach(
			key => {
				if (customerData.contact.hasOwnProperty(key)) {
					delete customerData.contact[key];
				}
			}
		);
	}
};

export const prepareCustomerDataForRequest = customerData => {
	let omittedCustomerData = omit(customerData, propsToOmitForTransactionCustomerData);

	if (customerData.kind === COMPANY) {
		omittedCustomerData = omit(omittedCustomerData, ['salutation', 'title', 'firstName', 'lastName', 'email']);
	}

	cleanCustomerData(omittedCustomerData);

	return Object.assign({}, omittedCustomerData);
};
