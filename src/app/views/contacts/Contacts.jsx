import React from 'react';
import PageContent from '../../shared/components/pageContent/PageContent';
import { ListAdvancedComponent } from '../../shared/components/list-advanced/ListAdvancedComponent';
import { formatCurrency } from '../../helpers/formatCurrency';
import {
	ListAdvancedDefaultSettings,
	customerTypes,
} from '../../helpers/constants';
import { isNil } from '../../helpers/isNil';

const getCompanyPersonIcon = (
	value,
	personIconWidth,
	blankContactPersonIcon,
	isMainContact
) => {
	const masterDetailArrowClass =
		!isNil(isMainContact) && isMainContact.toString() === 'false' ? 'grey' : '';

	return value === customerTypes.PERSON ? (
		`<span class="icon-user-wrapper"><img src="/assets/images/svg/user.svg" width="${personIconWidth}" /></span>`
	) : value === ListAdvancedDefaultSettings.CUSTOMER_TYPE_CONTACTPERSON ? (
		blankContactPersonIcon ? (
			''
		) : (
			`<span class="icon icon-arrow_right2 master-detail-arrow ${masterDetailArrowClass}"></span>`
		)
	) : (
		<i style={{ color: '#00A353' }} className={'fas fa-building'}></i>
	);
};

const Contacts = () => {
	const actions = [
		{ name: 'Edit', icon: 'edit' },
		{ name: 'Delete', icon: 'trash-alt' },
	];

	return (
		<PageContent title="Contacts">
			<ListAdvancedComponent
				columnDefs={[
					{ field: 'number', headerName: 'No.', filter: false },
					{
						field: 'kind',
						headerName: 'Type',
						cellRenderer: (evt) => {
							return getCompanyPersonIcon(evt.value, 20, true);
						},
						filter: false,
						flex: 1.5,
					},
					{
						field: 'type',
						headerName: 'Contact Type',
						cellRenderer: (evt) => {
							return evt.data.type === `customer` ? `Customer` : `Payee`;
						},
					},
					{ field: 'name', headerName: 'Name' },
					{
						field: 'outstandingAmount',
						headerName: 'Outstanding Amount',
						valueFormatter: (evt) => {
							return formatCurrency(evt.value);
						},
					},
					{ field: 'address.street', headerName: 'Address' },
					{ field: 'email', headerName: 'E-mail' },
					{ field: 'phone1', headerName: 'Telephone' },
					{ field: 'mobile', headerName: 'Mobile' },
					{ field: 'category', headerName: 'Category' },
					{ field: 'address.gstNumber', headerName: 'GST Number' },
				]}
				fetchBody={{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						method: 'GET',
						url: 'https://dev.groflex.in/api/customer?offset=0&searchText=&limit=9999999&orderBy=number&desc=false',
						headers: {
							Authorization:
								'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo1MTYsInRlbmFudCI6NDM4LCJjbGllbnRMYW5ndWFnZSI6IkVOIiwic2Vzc2lvbklkIjo2OTk0LCJpYXQiOjE2ODQzMDk0ODEsImV4cCI6MTY4NDMzMTA4MX0.jcpLey7WEJoybrChj6FHzXQylEBf0VA4h_jYMRV-WjE',
							'Content-Type': 'application/json',
						},
					}),
				}}
				actionMenuData={actions}
				onActionClick={() => {}}
			/>
		</PageContent>
	);
};

export default Contacts;
