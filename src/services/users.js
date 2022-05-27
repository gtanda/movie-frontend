import axios from 'axios'
const baseUrl = 'api/users'

const signUp = async (username, email, password, confirmPassword) => {
    const userInfo = {username, email, password, confirmPassword}
    const request = await axios.post(baseUrl, userInfo)
    return request.data;
}

const getWatchList = async (username) => {
    const request = await axios.get(baseUrl, {params: {username}})
    return request.data;
}

export default {signUp, getWatchList}

// TODO

// Create watchlist component
// Refactor trending data to be a component
// Add carousel to replace current display on video pages
