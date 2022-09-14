import axios from 'axios'
import { useState } from 'react'

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false)

  const post = async (path: string, body: unknown) => {
    setIsLoading(true)
    await axios.post(`/api/${path}`, body)
    setIsLoading(false)
  }

  const get = async (path: string) => {
    setIsLoading(true)
    const { data } = await axios.get(`/api/${path}`)
    setIsLoading(false)
    return data
  }

  return { post, get, isLoading }
}

export default useApi
