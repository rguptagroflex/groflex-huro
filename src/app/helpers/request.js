import _ from 'lodash';
import qs from 'qs';
import invoiz from 'services/invoiz.service';
import config from 'config';


 const blobTypes=['pdf','csv']
 const textTypes=['json','text']


 const isMatching=(header,types)=>{
	 if(!header)
	 return header
	 for(let type of types)
	   if( header.includes(type)) // need to modify in future
	      return true   
 }


export const request = (endpoint, options) => {
	options = options || {};

	const fetchOptions = {
		method: options.method || 'GET',
		headers: options.headers || { 'Content-Type': 'application/json' },
		url: endpoint
	};

	if (options.auth === true && (options.authCustomBearerToken || (invoiz.user && invoiz.user.token))) {
		if (options.authCustomBearerToken) {
			fetchOptions.headers.authtoken = options.authCustomBearerToken;
			fetchOptions.headers['api-version'] = '1';

			if (options.requestId) {
				fetchOptions.headers['logLevel'] = 'Debug';
				fetchOptions.headers['requestId'] = options.requestId;
			}
		} else {
			fetchOptions.headers.authorization = `Bearer ${invoiz.user.token}`;
		}
	}

	if (options.customHeaders && options.customHeaders && Object.keys(options.customHeaders).length > 0) {
		Object.keys(options.customHeaders).forEach((key) => {
			fetchOptions.headers[key] = options.customHeaders[key];
		});
	}

	if (fetchOptions.method === 'GET' && options.data) {
		const forXDataOptimizedParams = _.reduce(
			options.data,
			(result, value, key) => {
				result[key] = _.isString(value) ? `${value}` : value;
				return result;
			},
			{}
		);

		endpoint = `${fetchOptions.url}?${qs.stringify(forXDataOptimizedParams)}`;
	} else if (fetchOptions.method !== 'GET' && options.data) {
		fetchOptions.body = JSON.stringify(options.data);
	}

	if (fetchOptions.method !== 'GET' && options.responseType) {
		fetchOptions.responseType = options.responseType;
	}
	//console.log(endpoint, fetchOptions)

	if (!endpoint.includes("/lang/lang_en.json") && config.releaseStage == "local") {
		var options = {
			'method': 'POST',
			'headers': {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(fetchOptions)
		
		};
		return new Promise((resolve, reject) => {
		fetch('http://localhost:18000/serverconnect', options)
			.then(res => {
				if (!res.ok) {
					if (res.status === 401 && res.url !== config.account.endpoints.login) {
						invoiz.user.logout();
					} else {
						if (res.status === 404) {
							const error = {
								body: res.statusText
							};

							reject(error);
						} else if (res.status === 500) {
							const error = {
								body: res.statusText
							};

							reject(error);
						} else {
							res.json().then(err => {
								const error = {
									body: err
								};

								reject(error);
							});
						}
					}

					throw Error(res.statusText);
				}
				if(isMatching(fetchOptions.headers['Content-Type'],textTypes))
					return res.text();
				if(isMatching(fetchOptions.headers['Content-Type'],blobTypes))
					return res.blob()
				return res
			})
			.then(data => {
				try {
					if(isMatching(fetchOptions.headers['Content-Type'],textTypes))
						data = JSON.parse(data);
						resolve({ body: data });
					
				} catch (err) {
					resolve(true);
				}
			})
			.catch(reason => {});
		});
	} else {
		return new Promise((resolve, reject) => {
			fetch(endpoint, fetchOptions)
				.then(res => {
					if (!res.ok) {
						if (res.status === 401 && res.url !== config.account.endpoints.login) {
							invoiz.user.logout();
						} else {
							if (res.status === 404) {
								const error = {
									body: res.statusText
								};

								reject(error);
							} else if (res.status === 500) {
								const error = {
									body: res.statusText
								};

								reject(error);
							} else {
								res.json().then(err => {
									const error = {
										body: err
									};

									reject(error);
								});
							}
						}

						throw Error(res.statusText);
					}
					if(isMatching(fetchOptions.headers['Content-Type'],textTypes))
						return res.text();
					if(isMatching(fetchOptions.headers['Content-Type'],blobTypes))
						return res.blob()
					return res
				})
				.then(data => {
					try {
						if(isMatching(fetchOptions.headers['Content-Type'],textTypes))
							data = JSON.parse(data);
							resolve({ body: data });
						
					} catch (err) {
						resolve(true);
					}
				})
				.catch(reason => {});
		});
	}
};
