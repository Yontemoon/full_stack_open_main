import axios from "axios"
const baseUrl = '/api/users'

const users = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getUsersBlogs = async (userId) => {
    const response = await axios.get(`${baseUrl}/${userId}`)
    return response.data
}

export default { users, getUsersBlogs}