const InvoiceState = {
	DRAFT: 'draft',
	LOCKED: 'locked',
	CANCELLED: 'cancelled',
	DUNNED: 'dunned',
	PAID: 'paid',
	PARTIALLY_PAID: 'partiallyPaid',
	PRINTED: 'printed',
	SENT: 'sent',
	RECURRING_TEMPLATE: 'recurringTemplate',
	DOWNLOADED: 'downloaded'
};

export default Object.freeze(InvoiceState);
