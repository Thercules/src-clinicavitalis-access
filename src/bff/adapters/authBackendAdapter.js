/** @implements {import('../ports/IAuthBackend').IAuthBackend} */

const backendClient = require('../infrastructure/backendClient')

const authBackendAdapter = {
  login: async (email, password) => {
    const response = await backendClient.post('/api/auth/login', { email, password })
    return response.data
  },

  register: async (registerData) => {
    const response = await backendClient.post('/api/auth/register', registerData)
    return response.data
  },

  registerWithAccessLevel: async (registerData, token) => {
    const response = await backendClient.post(
      '/api/auth/register-with-access-level',
      registerData,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return response.data
  },

  // Logout is handled exclusively by the BFF (cookie clear).
  // The Quarkus backend does not expose a logout endpoint.

  refreshToken: async (token) => {
    const response = await backendClient.post(
      '/api/auth/refresh-token',
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return response.data
  }
}

module.exports = authBackendAdapter
