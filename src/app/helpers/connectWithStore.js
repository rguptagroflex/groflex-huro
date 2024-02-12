import React from 'react';
import { connect } from 'react-redux';

export const connectWithStore = (store, WrappedComponent, ...args) => {
	const ConnectedWrappedComponent = connect(...args)(WrappedComponent);

	return function (props) {
		return <ConnectedWrappedComponent {...props} store={store} />;
	};
};
