Object.defineProperty(Promise, 'allKeys', {
    configurable: true,
    writable: true,
    value: async function allKeys(object) {
        const resolved = {}
        const promises = Object
            .entries(object)
            .map(async ([key, promise]) =>
                resolved[key] = await promise
            )
        await Promise.all(promises)
        return resolved
    }
});

function get(url, options = {}) {
    const requestOptions = {
        method: 'GET',
        ...options
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body, options = {}) {
    const requestOptions = {
        method: 'POST',
        origin:null,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        cache:  'no-store',
        ...options
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body, options = {}) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        cache:  'no-store',
        ...options
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url, options = {}) {
    const requestOptions = {
        method: 'DELETE',
        ...options
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


export {
    get,
    post,
    put,
    _delete
};
