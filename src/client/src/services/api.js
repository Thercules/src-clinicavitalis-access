import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/login-register'
    }
    return Promise.reject(error)
  }
)

export const authService = {
  login: (email, password) => {
    return api.post('/auth/login', { email, password })
  },
  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  }
}

export const userService = {
  getProfile: () => api.get('/user/profile'),
  getExams: () => api.get('/user/exams'),
  getConsultations: () => api.get('/user/consultations'),
  downloadExam: (examId) => api.get(`/user/exams/${examId}/download`, { responseType: 'blob' })
}

export default api
