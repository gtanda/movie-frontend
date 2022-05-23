import axios from 'axios'
const baseUrl = 'api/session';

const login = async (credentials) => {
    const request = await axios.post(baseUrl, credentials);
    return request.data;
}

const logout = async () => {
    const request = await axios.post(baseUrl);
    return request.data;
}

const isUserLoggedIn = async () => {
    const request = await axios.get(baseUrl);
    return request.data;
}

export default {login, logout, isUserLoggedIn}