import axios from 'axios'
const baseUrl = 'api/users'

const signUp = async (username, email, password, confirmPassword) => {
  const userInfo = { username, email, password, confirmPassword }
  const request = await axios.post(baseUrl, userInfo)
  return request.data
}

const getWatchList = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

export default { signUp, getWatchList }
