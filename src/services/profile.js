import axios from 'axios'
const baseUrl = 'api/profile'

const getProfileInfo = async () => {
    const request = await axios.get(baseUrl)
    return request.data;
}

const updateUsername = async (username, newUsername) => {
    return await axios.patch(`${baseUrl}/updateUsername`, {username, newUsername});
}

const updateEmail = async (email, newEmail) => {
    return await axios.patch(`${baseUrl}/updateEmail`, {email, newEmail});
}

const updatePassword = async (email, newPassword) => {
    return await axios.patch(`${baseUrl}/updatePassword`, {email, newPassword});
}

export default {getProfileInfo, updateUsername, updateEmail, updatePassword}