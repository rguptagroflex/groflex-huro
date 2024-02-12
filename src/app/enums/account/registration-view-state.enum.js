const RegistrationViewState = {
	START: 'start',
	WAIT_FOR_APPROVAL: 'doi',
	SET_PASSWORD: 'password',
	PICK_COMPANY_TYPE: 'legalform',
	CHANGE_MAIL: 'changemail',
	JUMP_TO_APPROVAL: 'approve',
	SET_MOBILE_NO: 'mobile',
	SET_BUSINESS_TYPE: 'businesstype',
	SET_BUSINESS_CATEGORY: 'businesscategory',
	SET_BUSINESS_TURNOVER: 'businessturnover',
	VERIFY_MOBILE_NO: 'mobileotp',
	CHANGE_MOBILE: 'changemobile'
};

export default Object.freeze(RegistrationViewState);
