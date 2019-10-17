import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

/*const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}*/

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async (newObject) => {
  const updatedObject = {
    likes: newObject.likes + 1,
  }
  const response = await axios.put(`${baseUrl}/${newObject.id}`, updatedObject)
  return response.data
}

const deleteBlog = async (blogToBeDeleted) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${blogToBeDeleted.id}`, config)
  return response.data
}

export default { setToken, create, addLike, deleteBlog }