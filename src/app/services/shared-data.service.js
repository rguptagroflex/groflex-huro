class SharedDataService {
	constructor () {
		this.sharedData = {};
	}

	get (key) {
		return this.sharedData[key];
	}

	set (key, value) {
		this.sharedData[key] = value;
	}
}

export default new SharedDataService();
