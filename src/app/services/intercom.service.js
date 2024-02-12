import React from 'react';

class Intercom extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const { appId: app_id, user } = this.props;
        return <div>{window.Intercom('boot', {app_id, ...user})}</div>
    }
}

class IntercomApiService {
    update() {
        window.Intercom('update');
    }
}

export const IntercomAPI = new IntercomApiService();
export default Intercom;