const ErrorCodes = {
	REQUIRED: 'REQUIRED',
	NOT_EMPTY: 'NOT_EMPTY',
	INCORRECT: 'INCORRECT',
	INVALID: 'INVALID',
	NO_INTEGER: 'NO_INTEGER',
	NO_NUMBER: 'NO_NUMBER',
	NO_DATE: 'NO_DATE',
	NO_DATETIME: 'NO_DATETIME',
	NO_STRING: 'NO_STRING',
	NOT_ALLOWED: 'NOT_ALLOWED',
	NOT_FOUND: 'NOT_FOUND',
	NOT_POSITIVE: 'NOT_POSITIVE',
	NOT_CONFIRMED: 'NOT_CONFIRMED',
	TOO_SMALL: 'TOO_SMALL',
	TOO_LARGE: 'TOO_LARGE',
	IS_CONFIRMED: 'IS_CONFIRMED',
	EXISTS: 'EXISTS'
};

export default Object.freeze(ErrorCodes);
