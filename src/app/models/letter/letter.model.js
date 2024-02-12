import LetterElement from './letter-element.model';

export default class Letter {
	constructor (data) {
		data = !data ? {} : data;

		if (data.header) {
			this.header = data.header.map(item => {
				return new LetterElement(item);
			});
		}

		if (data.footer) {
			this.footer = data.footer.map(item => {
				return new LetterElement(item);
			});
		}

		this.sender = data.sender || '';
	}
}
