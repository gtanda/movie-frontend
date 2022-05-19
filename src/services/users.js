import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const signUp = async (username, email, password, confirmPassword) => {
    const userInfo = {username, email, password, confirmPassword}
    const request = await axios.post(baseUrl, userInfo)
    return request.data;
}

export default {signUp}