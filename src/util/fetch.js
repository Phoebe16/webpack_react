import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

function formData(response) {
    const contentType = response.headers.get('Content-Type') || '';
    console.log('contenttype', contentType)
    let data = '';
    if (contentType.includes('application/json')) {
        response.json().then(res => data = res).
        catch(err => data = 'Invalid JSON: ' + err.message)
        .finally(() => Promise.resolve(data));
    } else if (contentType.includes('text/html')) {
        response.text().then(res => {
            console.log('text/html data', res)
            data = res;
        }).
        catch(err => data = 'Invalid Text: ' + err.message)
        .finally(() => Promise.resolve(data));
    } else if (contentType.includes('application/')) {
        response.buffer().then(res => data = res).
        catch(err => data = 'Invalid Buffer: ' + err.message)
        .finally(() => Promise.resolve(data));
    } else {
        let json = '';
        let text = '';
        response.json().then(res => json = res).
        catch(err => data = 'Invalid JSON: ' + err.message)
        .finally(() => Promise.resolve(data));
        response.text().then(res => text = res).
        catch(err => data = 'Invalid Text: ' + err.message)
        .finally(() => Promise.resolve(data));
        if (json || text) data = json || text;
        console.log(`${response.url}: Invalid content type: ${contentType}`);
    }
}

function get(url, params) {
    fetch(url, params).then(response => {
        // if (response.ok) {
        //     return Promise.resolve(formData(response))
        // }
        console.log('response', response)
        formData(response).then(json => {
            if (response.ok) {
                console.log(json);
                // return json;
                return Promise.resolve(json);
            } else {
                const error = Object.assign({}, json, {
                    status: response.status,
                    statusText: response.statusText
                });
                return Promise.reject(error);
            }
        })
    }).catch(error => {
        console.log('error', error)
        if (error.status === 404) {
            console.log('url not found...')
        }
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
