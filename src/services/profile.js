import axios from 'axios'
const baseUrl = 'api/profile'

const getProfileInfo = async (id) => {
    const request = await axios.get(`${baseUrl}/${id}`)
    return request.data;
}

export default {getProfileInfo}