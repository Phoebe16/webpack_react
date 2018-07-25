import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

function formData(response) {
    const contentType = response.headers.get('Content-Type') || '';
    let data = '';
}

function formatData(response) {
    const contentType = response.headers.get('Content-Type') || '';
    let data = '';
    console.log('content type', contentType);
    return new Promise((resolve, reject) => {
        if (contentType.includes('application/json')) {
            response.json().then(res => data = res).
            catch(err => data = 'Invalid JSON: ' + err.message)
            .finally(() => resolve(data));
        } else if (contentType.includes('text/html')) {
            response.text().then(res => {
                console.log('text/html data', res)
                data = res;
            }).
            catch(err => data = 'Invalid Text: ' + err.message)
            .finally(() => resolve(data));
        } else if (contentType.includes('application/')) {
            response.buffer().then(res => data = res).
            catch(err => data = 'Invalid Buffer: ' + err.message)
            .finally(() => resolve(data));
        } else {
            let json = '';
            let text = '';
            const promiseJson = response.json().then(res => json = res).
            catch(err => data = 'Invalid JSON: ' + err.message);
            const promiseText = response.text().then(res => text = res).
            catch(err => data = 'Invalid Text: ' + err.message);
            Promise.all([promiseJson, promiseText]).then(() => {
                if (json || text) data = json || text;
                console.log(`${response.url}: Invalid content type: ${contentType}`);
                resolve(data);
            })
        }
    })
}

function get(url, params) {
    return new Promise((resolve, reject) => {
        fetch(url, params).then(response => {
            console.log('fetch response', response);
            formatData(response).then(json => {
                console.log('jsono', json);
                if (response.ok) {
                    return resolve(json);
                } else {
                    const error = Object.assign({}, json, {
                        status: response.status,
                        statusText: response.statusText
                    });
                    return reject(error);
                }
            }).catch(error => {
                console.log('error', error);
                reject(error);
                if (error.status === 404) {
                    console.log('url not found...');
                }
            })
        })
    })
}

function post(url, params) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: querystring.stringify(params)
    };
    fetch(url, options).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            console.log('Something went wrong...');
            return Promise.reject({
                status: response.status,
                statusText: response.statusText
            })
        }
    }).catch(error => {
        if (error.status === 404) {
            console.log('url not found...')
        }
    })
}

export default {
    get,
    post
};;
