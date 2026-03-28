import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => token.value !== null)

  const initializeAuth = () => {
    const storedToken = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('user')

    if (storedToken) {
      token.value = storedToken
    }

    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (err) {
        localStorage.removeItem('user')
      }
    }
  }

  const login = async (email, password) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authService.login(email, password)

      const responseData = response.data.dados || response.data.data || response.data
      
      const tokenData = responseData.token || responseData.access_token || responseData.jwt
      if (!tokenData) {
        throw new Error('Token não encontrado na resposta do backend')
      }
      
      token.value = tokenData
      localStorage.setItem('authToken', tokenData)

      const userData = {
        id: responseData.id || responseData.usuarioId,
        name: responseData.nome || responseData.name || responseData.userName || 'Usuário',
        email: responseData.email,
      }
      
      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData))
      
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || err.response?.data?.mensagem || err.message || 'Erro ao fazer login'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    error.value = null
  }

  const clearError = () => {
    error.value = null
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    initializeAuth,
    clearError
  }
})
