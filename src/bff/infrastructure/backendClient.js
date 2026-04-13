const axios = require('axios')
const config = require('../config/env')

const backendClient = axios.create({
  baseURL: config.BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

backendClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = new Error(
      error.response?.data?.message ||
      error.response?.data?.mensagem ||
      error.message
    )
    normalizedError.status = error.response?.status || 500
    normalizedError.response = error.response
    return Promise.reject(normalizedError)
  }
)

module.exports = backendClient
