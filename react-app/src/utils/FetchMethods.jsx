export const fetchGet = (url, params = null) => {
    return fetch(url, {
        method: 'GET',
    });
}

export const fetchPost = (url, values) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}