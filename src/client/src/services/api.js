import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user')
      window.location.href = '/login-register'
    }

    const errorMessage = 
      error.response?.data?.message ||
      error.response?.data?.mensagem ||
      error.response?.data?.error ||
      error.message ||
      'Erro ao processar requisição'

    const enhancedError = new Error(errorMessage)
    enhancedError.status = error.response?.status
    enhancedError.data = error.response?.data

    return Promise.reject(enhancedError)
  }
)

export const authService = {
  login: (email, password) => {
    return api.post('/auth/login', { email, password })
  },
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
  registerWithAccessLevel: (registerData) => {
    return api.post('/auth/register-with-access-level', registerData)
  }
}

export const userService = {}

export const medicosService = {
  listarMedicos: () => api.get('/medicos')
}

export default api
