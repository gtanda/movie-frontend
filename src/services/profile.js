import axios from 'axios'
const baseUrl = 'api/profile'

const getProfileInfo = async () => {
    const request = await axios.get(`${baseUrl}`)
    return request.data;
}

export default {getProfileInfo}