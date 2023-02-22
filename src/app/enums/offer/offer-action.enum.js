const OfferAction = {
	ACCEPT: 'accept',
	INVOICE: 'invoice',
	REJECT: 'reject',
	PROJECT: 'createProject',
	RESET: 'reset',
	EDIT: 'edit',
	COPY_AND_EDIT: 'copyAndEdit',
	DELETE: 'delete',
	DOWNLOAD_PDF: 'downloadPdf',
	PRINT: 'print',
	EMAIL: 'email',
	SHOW_PRINT_SETTINGS_POPOVER: 'showPrintSettingsPopover',
	FINALIZE_IMPRESS_OFFER: 'finalizeImpressOffer',
	EDIT_IMPRESS_OFFER: 'editImpressOffer',
	COPY_CUSTOMERCENTER_LINK: 'copyCustomerCenterLink',
	SHOW_COPY_LINK_POPOVER: 'showCopyLinkPopover',
	SAVE_IMPRESS_OFFER_AS_TEMPLATE: 'saveImpressOfferAsTemplate',
	FINALISE: 'finalise'
};

export default Object.freeze(OfferAction);
