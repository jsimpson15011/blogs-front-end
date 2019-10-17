import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => setValue('')

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useResource = (url) => {
  const [resources, setResources] = useState([])
  const [token, updateToken] = useState(null)

  const setToken = (newToken) => {
    updateToken(`bearer ${newToken}`)
  }

  const getAll = () => {
    const request = axios.get(url)
    request.then(response => {
      setResources(response.data)
    })
  }

  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.post(url, newObject, config)
    return response.data
  }

  const services = {
    getAll,
    create,
    setToken
  }

  return[resources, services]
}