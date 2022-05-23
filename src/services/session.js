import axios from 'axios'
const baseUrl = 'api/session';

const login = async (credentials) => {
    const request = await axios.post(baseUrl, credentials)
    return request.data
}

const logout = async (credentials) => {
    const request = await axios.post(baseUrl, credentials)
    return request.data
}

export default {login, logout}