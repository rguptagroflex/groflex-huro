import { convertDateKeyToPreview } from 'helpers/convertDateKeyToPreview';
import InvoiceState from 'enums/invoice/invoice-state.enum';

export const getInvoiceNumber = (numerationOptions, state, number) => {
	let nextNewNumber = numerationOptions.currentValue + 1
	let numberString = nextNewNumber.toString();
	numberString = numberString.padStart(numerationOptions.counterLength, '0');

	const datePart = convertDateKeyToPreview(numerationOptions.datePart);

	const nextNumber =
		numerationOptions.prefix +
		numerationOptions.placeHolder1 +
		datePart +
		numerationOptions.placeHolder2 +
		numberString +
		numerationOptions.placeHolder3 +
		numerationOptions.suffix;

	return state === InvoiceState.DRAFT || state === InvoiceState.RECURRING_TEMPLATE ? nextNumber : number;
};
