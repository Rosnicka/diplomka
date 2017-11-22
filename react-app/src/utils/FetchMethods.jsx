export const fetchGet = (url, params = null) => {
    return fetch(url, {
        method: 'GET',
        credentials: 'include'
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