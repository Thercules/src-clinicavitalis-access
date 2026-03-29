import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => user.value !== null)

  const initializeAuth = () => {
    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (err) {
        localStorage.removeItem('user')
        user.value = null
      }
    }
  }

  const login = async (email, password) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authService.login(email, password)

      // O token está nos cookies httpOnly, então o BFF retorna apenas o user
      const userData = response.data?.user

      if (!userData) {
        throw new Error('Dados do usuário não encontrados na resposta do servidor')
      }

      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData))

      return response.data
    } catch (err) {
      const errorMessage = err.message || 'Erro ao fazer login'
      error.value = errorMessage
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    error.value = null

    try {
      await authService.logout()
    } catch (err) {
      // Erro ao fazer logout no servidor
    } finally {
      user.value = null
      error.value = null
      localStorage.removeItem('user')
      isLoading.value = false

      window.location.href = '/login-register'
    }
  }

  /**
   * Limpar mensagem de erro
   */
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    user,
    isLoading,
    error,

    // Computed
    isAuthenticated,

    // Actions
    login,
    logout,
    initializeAuth,
    clearError
  }
})
