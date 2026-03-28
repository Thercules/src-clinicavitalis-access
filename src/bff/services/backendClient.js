const axios = require('axios')
const config = require('../config/env')

const backendClient = axios.create({
  baseURL: config.BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

backendClient.interceptors.request.use((axiosConfig) => {
  return axiosConfig
}, (error) => Promise.reject(error))

backendClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const axiosError = new Error(
      error.response?.data?.message || 
      error.response?.data?.mensagem || 
      error.message
    )
    axiosError.status = error.response?.status || 500
    axiosError.response = error.response
    return Promise.reject(axiosError)
  }
)

module.exports = backendClient
