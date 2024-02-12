import React from 'react';
import { Link } from 'react-router-dom';
import InvoiceState from 'enums/invoice/invoice-state.enum';
import { formatCurrency } from 'helpers/formatCurrency';
// import { formatDate } from 'helpers/formatDate';
import { formatClientDate } from 'helpers/formatDate';
import { getResource } from '../resource';

export const createDetailViewInvoiceListObjects = (invoices) => {
	const invoicesTable = {
		columns: [
			{ title: 'Nr.', width: '10%', resourceKey: 'serialNumber' },
			{ title: 'Datum', width: '20%', resourceKey: 'date' },
			{ title: 'Zahlungsstatus', resourceKey: 'paymentStatus' },
			{ title: 'Betrag', width: '15%', align: 'right', resourceKey: 'amountTitle' }
		],
		rows: []
	};

	if (invoices) {
		invoices.forEach(invoice => {
			const number = { value: invoice.state === InvoiceState.DRAFT ? getResource('str_draft') : invoice.number };
			const state = { value: getResource('str_notPaid') };
			const amount = { value: formatCurrency(invoice.totalGross) };
			// const date = { value: formatDate(invoice.date, 'YYYY-MM-DD', 'DD.MM.YYYY') };
			const date = { value: formatClientDate(invoice.date) };

			switch (invoice.state) {
				case InvoiceState.DRAFT:
					state.value = '-';
					break;
				case InvoiceState.PARTIALLY_PAID:
					state.value = getResource('str_partiallyPaidShort');
					break;
				case InvoiceState.PAID:
					state.value = getResource('str_completelyPaid');
					break;
				case InvoiceState.CANCELLED:
					state.value = getResource('str_canceled');
					if (invoice.metaData && invoice.metaData.cancellation) {
						const cancellationId = invoice.metaData.cancellation && invoice.metaData.cancellation.id;
						const cancellationNumber =
							invoice.metaData.cancellation && invoice.metaData.cancellation.number;
						number.subValue = (
							<div>
								{getResource('str_canceledBy')}{' '}
								<Link className="hover-underline" to={`/cancellation/${cancellationId}`}>
									{cancellationNumber}
								</Link>
							</div>
						);
						state.subValue = '-';
						// date.subValue = formatDate(invoice.metaData.cancellation.date, 'YYYY-MM-DD', 'DD.MM.YYYY');
						date.subValue = formatClientDate(invoice.metaData.cancellation.date);
						amount.subValue = formatCurrency(invoice.metaData.cancellation.totalGross);
					}
					break;
			}
			const cells = [number, date, state, amount];
			invoicesTable.rows.push({ cells, id: invoice.id });
		});
	}

	return invoicesTable;
};
