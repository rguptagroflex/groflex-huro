class PendoService {
	init(pendoData) {
		if (pendoData) {
			if (!window.pendo) {
				setTimeout(() => {
					this.init(pendoData);
				}, 3000);
			} else if (window.pendo.initialize) {
				const { id } = pendoData;

				window.pendo.initialize({
					visitor: { id },
					account: pendoData
				});
			}
		}
	}
}

export default new PendoService();
