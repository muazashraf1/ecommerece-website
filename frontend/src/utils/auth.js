export const saveToken = (token) => {
    if (!token.access || !token.refresh) {
        console.error('Invalid token structure:', token);
        return false;
    }
    localStorage.setItem('access_token', token.access);
    localStorage.setItem('refresh_token', token.refresh);
    return true;
}

export const clearTokens = () => {
    localStorage.removeItem("access_token"),
    localStorage.removeItem("refresh_token")
}

export const getAccessToken = () => {
    return localStorage.getItem("access_token")
}

export const authFetch = (url, options = {}) => {
    const token =   getAccessToken();
    const headers = options.headers ? {...options.headers} : {};

    if (token) headers["Authorization"] = `Bearer ${token}`;
    headers['Content-Type'] = "application/json";

    return fetch(url, {
        ...options,
        headers,
    })

}