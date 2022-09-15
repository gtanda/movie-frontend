import axios from 'axios'
const baseUrl = 'api/profile'

const getProfileInfo = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const updateUsername = async (username, newUsername) => {
  const request = await axios.patch(`${baseUrl}/updateUsername`, {
    username,
    newUsername
  })
  return request.data
}

const updateEmail = async (email, newEmail) => {
  const request = await axios.patch(`${baseUrl}/updateEmail`, {
    email,
    newEmail
  })
  return request.data
}

const updatePassword = async (email, newPassword) => {
  const request = await axios.patch(`${baseUrl}/updatePassword`, {
    email,
    newPassword
  })
  return request.data
}

export default { getProfileInfo, updateUsername, updateEmail, updatePassword }
