const backendClient = require('./backendClient')

const authService = {
  login: async (email, password) => {
    try {
      const response = await backendClient.post('/api/auth/login', { email, password })
      return response.data
    } catch (error) {
      throw error
    }
  },

  register: async (registerData) => {
    try {
      const response = await backendClient.post('/api/auth/register', registerData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  logout: async (token) => {
    try {
      await backendClient.post('/api/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (error) {
      console.warn('Logout warning:', error.message)
    }
  },

  refreshToken: async (token) => {
    try {
      const response = await backendClient.post('/api/auth/refresh', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  registerWithAccessLevel: async (registerData, token) => {
    try {
      const response = await backendClient.post('/api/auth/register-with-access-level', registerData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }
}

module.exports = authService
