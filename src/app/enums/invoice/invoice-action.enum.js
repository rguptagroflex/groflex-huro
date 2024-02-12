const InvoiceAction = {
	CREATE_PAYMENT: 'createPayment',
	EDIT: 'edit',
	LOCK: 'lock',
	COPY_AND_EDIT: 'copyAndEdit',
	DELETE: 'delete',
	DELETE_AND_CANCEL: 'deleteAndCancel',
	DUN: 'dun',
	CANCEL: 'cancel',
	DOWNLOAD_PDF: 'downloadPdf',
	PRINT: 'print',
	EMAIL: 'email',
	AUTO_DUNNING: 'autoDunning',
	LINK_CANCELLATION: 'linkCancellation',
	LINK_PROJECT: 'linkProject',
	SHOW_PRINT_SETTINGS_POPOVER: 'showPrintSettingsPopover',
	COPY_CUSTOMERCENTER_LINK: 'copyCustomerCenterLink',
	SHOW_COPY_LINK_POPOVER: 'shoCopyLinkPopover'
};

export default Object.freeze(InvoiceAction);
