export default class LetterElement {
	constructor (data) {
		data = data || {};

		this.id = data.id;
		this.sortId = data.sortId;
		this.type = data.type;
		this.metaData = data.metaData || {};
		this.x = data.x;
		this.y = data.y;
	}
}
