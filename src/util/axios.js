const axios = require('axios');
const querystring = require('querystring');

export function axiosPost(url, params , callback ,errorCallback) {
    const config = {
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    axios.post(url, querystring.stringify(params)).then(res => callback(res))
    .catch(e => {
        console.log('Something went wrong', e);
        if (errorCallback) errorCallback(e);
    });
}

export function axiosGet(url, callback ,errorCallback) {
    const data = {
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    axios.get(url, data).then(res => callback(res))
    .catch(e => {
        console.log('Something went wrong', e);
        if (errorCallback) errorCallback(e);
    });
}
