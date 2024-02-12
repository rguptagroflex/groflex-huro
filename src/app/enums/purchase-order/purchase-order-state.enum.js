const PurchaseOrderState = {
	OPEN: 'open',
	ACCEPTED: 'accepted',
	REJECTED: 'rejected',
	EXPENSED: 'expensed',
	PROJECT_CREATED: 'projectCreated',
	DRAFT: 'draft',
	TEMP: 'temp'
};

export default Object.freeze(PurchaseOrderState);
