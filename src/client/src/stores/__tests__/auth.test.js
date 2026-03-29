import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { authService } from '@/services/api'

vi.mock('@/services/api', () => ({
  authService: {
    login: vi.fn(),
    logout: vi.fn(),
    refreshToken: vi.fn()
  }
}))

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
    delete window.location
    window.location = { href: '' }
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('Initial State', () => {
    it('should initialize with null values', () => {
      const store = useAuthStore()
      
      expect(store.user).toBeNull()
      expect(store.token).toBeNull()
      expect(store.isLoading).toBe(false)
      expect(store.error).toBeNull()
    })

    it('should compute isAuthenticated correctly', () => {
      const store = useAuthStore()
      
      expect(store.isAuthenticated).toBe(false)
      
      store.token = 'test-token'
      expect(store.isAuthenticated).toBe(true)
    })
  })

  describe('initializeAuth', () => {
    it('should initialize auth from localStorage', () => {
      localStorage.setItem('authToken', 'stored-token')
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }))
      
      const store = useAuthStore()
      store.initializeAuth()
      
      expect(store.token).toBe('stored-token')
      expect(store.user).toEqual({ id: 1, name: 'Test User' })
    })

    it('should initialize auth from localStorage with only token', () => {
      localStorage.setItem('authToken', 'stored-token-only')
      
      const store = useAuthStore()
      store.initializeAuth()
      
      expect(store.token).toBe('stored-token-only')
      expect(store.user).toBeNull()
    })

    it('should initialize auth from localStorage with only user', () => {
      localStorage.setItem('user', JSON.stringify({ id: 42, name: 'User Only' }))
      
      const store = useAuthStore()
      store.initializeAuth()
      
      expect(store.token).toBeNull()
      expect(store.user).toEqual({ id: 42, name: 'User Only' })
    })

    it('should handle invalid user JSON in localStorage', () => {
      localStorage.setItem('authToken', 'stored-token')
      localStorage.setItem('user', 'invalid-json')
      
      const store = useAuthStore()
      store.initializeAuth()
      
      expect(store.token).toBe('stored-token')
      expect(store.user).toBeNull()
      expect(localStorage.getItem('user')).toBeNull()
    })

    it('should not initialize when localStorage is empty', () => {
      const store = useAuthStore()
      store.initializeAuth()
      
      expect(store.token).toBeNull()
      expect(store.user).toBeNull()
    })

    it('should not overwrite existing token when localStorage has no token', () => {
      const store = useAuthStore()
      store.token = 'pre-existing-token'
      // localStorage has no authToken
      store.initializeAuth()
      expect(store.token).toBe('pre-existing-token')
    })

    it('should not overwrite existing user when localStorage has no user', () => {
      const store = useAuthStore()
      store.user = { id: 999, name: 'Pre-existing User' }
      // localStorage has no user
      store.initializeAuth()
      expect(store.user).toEqual({ id: 999, name: 'Pre-existing User' })
    })
  })

  describe('login', () => {
    it('should login successfully with response.data.dados format', async () => {
      const mockResponse = {
        data: {
          dados: {
            id: 1,
            nome: 'John Doe',
            email: 'john@example.com',
            token: 'auth-token-123'
          }
        }
      }
      authService.login.mockResolvedValue(mockResponse)

      const store = useAuthStore()
      const result = await store.login('john@example.com', 'password')

      expect(store.token).toBe('auth-token-123')
      expect(store.user).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      })
      expect(store.isLoading).toBe(false)
      expect(store.error).toBeNull()
      expect(localStorage.getItem('authToken')).toBe('auth-token-123')
      expect(result).toEqual(mockResponse.data)
    })

    it('should login successfully with response.data.data format', async () => {
      const mockResponse = {
        data: {
          data: {
            id: 2,
            name: 'Jane Doe',
            email: 'jane@example.com',
            access_token: 'token-456'
          }
        }
      }
      authService.login.mockResolvedValue(mockResponse)

      const store = useAuthStore()
      await store.login('jane@example.com', 'password')

      expect(store.token).toBe('token-456')
      expect(store.user.id).toBe(2)
      expect(store.user.name).toBe('Jane Doe')
    })

    it('should login successfully with response.data format', async () => {
      const mockResponse = {
        data: {
          usuarioId: 3,
          userName: 'User Name',
          email: 'user@example.com',
          jwt: 'jwt-token-789'
        }
      }
      authService.login.mockResolvedValue(mockResponse)

      const store = useAuthStore()
      await store.login('user@example.com', 'password')

      expect(store.token).toBe('jwt-token-789')
      expect(store.user.id).toBe(3)
      expect(store.user.name).toBe('User Name')
    })

    it('should use default name when no name is provided', async () => {
      const mockResponse = {
        data: {
          dados: {
            id: 4,
            email: 'noname@example.com',
            token: 'token-default'
          }
        }
      }
      authService.login.mockResolvedValue(mockResponse)

      const store = useAuthStore()
      await store.login('noname@example.com', 'password')

      expect(store.user.name).toBe('Usuário')
    })

    it('should throw error when token is not found in response', async () => {
      const mockResponse = {
        data: {
          dados: {
            id: 5,
            name: 'No Token User',
            email: 'notoken@example.com'
          }
        }
      }
      authService.login.mockResolvedValue(mockResponse)

      const store = useAuthStore()

      await expect(store.login('notoken@example.com', 'password')).rejects.toThrow(
        'Token não encontrado na resposta do servidor'
      )
      expect(store.error).toBe('Token não encontrado na resposta do servidor')
      expect(store.token).toBeNull()
      expect(store.isLoading).toBe(false)
    })

    it('should handle login service error', async () => {
      const mockError = new Error('Invalid credentials')
      authService.login.mockRejectedValue(mockError)

      const store = useAuthStore()

      await expect(store.login('wrong@example.com', 'wrong')).rejects.toThrow('Invalid credentials')
      expect(store.error).toBe('Invalid credentials')
      expect(store.token).toBeNull()
      expect(store.isLoading).toBe(false)
    })

    it('should set isLoading to true during login', async () => {
      const mockResponse = {
        data: {
          dados: {
            id: 6,
            name: 'Loading Test',
            email: 'loading@example.com',
            token: 'token-load'
          }
        }
      }
      authService.login.mockImplementation(() => {
        const store = useAuthStore()
        expect(store.isLoading).toBe(true)
        return Promise.resolve(mockResponse)
      })

      const store = useAuthStore()
      await store.login('loading@example.com', 'password')

      expect(store.isLoading).toBe(false)
    })

    it('should store user data in localStorage', async () => {
      const mockResponse = {
        data: {
          dados: {
            id: 7,
            name: 'Storage Test',
            email: 'storage@example.com',
            token: 'token-storage'
          }
        }
      }
      authService.login.mockResolvedValue(mockResponse)

      const store = useAuthStore()
      await store.login('storage@example.com', 'password')

      const storedUser = JSON.parse(localStorage.getItem('user'))
      expect(storedUser).toEqual({
        id: 7,
        name: 'Storage Test',
        email: 'storage@example.com'
      })
    })
  })

  describe('logout', () => {
    it('should logout successfully', async () => {
      authService.logout.mockResolvedValue({})
      
      const store = useAuthStore()
      store.token = 'test-token'
      store.user = { id: 1, name: 'Test User' }
      localStorage.setItem('authToken', 'test-token')
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }))

      await store.logout()

      expect(store.token).toBeNull()
      expect(store.user).toBeNull()
      expect(store.error).toBeNull()
      expect(store.isLoading).toBe(false)
      expect(localStorage.getItem('authToken')).toBeNull()
      expect(localStorage.getItem('user')).toBeNull()
      expect(window.location.href).toBe('/login-register')
    })

    it('should set isLoading to true immediately on logout', () => {
      authService.logout.mockImplementation(() => {
        const store = useAuthStore()
        // Verify isLoading was set to true
        expect(store.isLoading).toBe(true)
        return Promise.resolve({})
      })

      const store = useAuthStore()
      store.logout()
    })

    it('should set error to null when logout starts', async () => {
      authService.logout.mockResolvedValue({})
      
      const store = useAuthStore()
      store.error = 'Previous error'
      
      store.logout()
      
      // Check that error is set to null immediately
      expect(store.error).toBeNull()
      
      await new Promise(resolve => setTimeout(resolve, 10))
    })

    it('should handle logout service error gracefully', async () => {
      const logoutError = new Error('Server error')
      authService.logout.mockRejectedValue(logoutError)
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const store = useAuthStore()
      store.token = 'test-token'
      store.user = { id: 1, name: 'Test User' }

      await store.logout()

      expect(warnSpy).toHaveBeenCalledWith('Erro ao fazer logout no servidor:', logoutError)
      expect(store.token).toBeNull()
      expect(store.user).toBeNull()
      expect(window.location.href).toBe('/login-register')
      
      warnSpy.mockRestore()
    })

    it('should clear localStorage on logout', async () => {
      authService.logout.mockResolvedValue({})
      
      const store = useAuthStore()
      localStorage.setItem('authToken', 'test-token')
      localStorage.setItem('user', JSON.stringify({ id: 1 }))

      await store.logout()

      expect(localStorage.getItem('authToken')).toBeNull()
      expect(localStorage.getItem('user')).toBeNull()
    })

    it('should redirect to login after logout', async () => {
      authService.logout.mockResolvedValue({})
      
      const store = useAuthStore()
      await store.logout()

      expect(window.location.href).toBe('/login-register')
    })

    it('should set isLoading to false after logout completes', async () => {
      authService.logout.mockResolvedValue({})
      
      const store = useAuthStore()
      await store.logout()

      expect(store.isLoading).toBe(false)
    })
  })

  describe('clearError', () => {
    it('should clear error message', () => {
      const store = useAuthStore()
      
      store.error = 'Some error'
      expect(store.error).toBe('Some error')
      
      store.clearError()
      expect(store.error).toBeNull()
    })

    it('should do nothing if error is already null', () => {
      const store = useAuthStore()
      
      expect(store.error).toBeNull()
      store.clearError()
      expect(store.error).toBeNull()
    })
  })

  describe('Store Name and Identity', () => {
    it('should have correct store id', () => {
      const store = useAuthStore()
      
      expect(store.$id).toBe('auth')
    })
  })

  describe('localStorage Integration', () => {
    it('should restore token when stored in localStorage', () => {
      const token = 'test-token-12345'
      localStorage.setItem('authToken', token)
      
      const store = useAuthStore()
      store.initializeAuth()
      
      expect(store.token).toBe(token)
      expect(store.token).not.toBeNull()
    })

    it('should restore user when stored in localStorage', () => {
      const userData = { id: 99, name: 'Restored User', email: 'restored@test.com' }
      localStorage.setItem('user', JSON.stringify(userData))
      
      const store = useAuthStore()
      store.initializeAuth()
      
      expect(store.user).toEqual(userData)
      expect(store.user).not.toBeNull()
    })

    it('should not restore anything when localStorage is empty', () => {
      const store = useAuthStore()
      store.initializeAuth()
      
      expect(store.token).toBeNull()
      expect(store.user).toBeNull()
    })

    it('should handle missing token but present user', () => {
      const userData = { id: 100, name: 'Only User' }
      localStorage.setItem('user', JSON.stringify(userData))
      
      const store = useAuthStore()
      store.initializeAuth()
      
      expect(store.user).toEqual(userData)
      expect(store.token).toBeNull()
    })

    it('should handle missing user but present token', () => {
      localStorage.setItem('authToken', 'token-only-12345')
      
      const store = useAuthStore()
      store.initializeAuth()
      
      expect(store.token).toBe('token-only-12345')
      expect(store.user).toBeNull()
    })
  })

  describe('Loading State Management', () => {
    it('should verify isLoading transitions from true to false during logout', async () => {
      authService.logout.mockResolvedValue({})
      
      const store = useAuthStore()
      store.token = 'test-token'
      
      const logoutPromise = store.logout()
      // isLoading should be true immediately
      expect(store.isLoading).toBe(true)
      
      await logoutPromise
      // After logout completes, isLoading should be false
      expect(store.isLoading).toBe(false)
    })

    it('should have isLoading as false in initial state', () => {
      const store = useAuthStore()
      
      expect(store.isLoading).toBe(false)
    })

    it('should verify isLoading transitions from true to false during login', async () => {
      const mockResponse = {
        data: {
          dados: {
            id: 100,
            name: 'Load State Test',
            email: 'loadstate@test.com',
            token: 'token-loadstate'
          }
        }
      }
      authService.login.mockResolvedValue(mockResponse)

      const store = useAuthStore()
      expect(store.isLoading).toBe(false)
      
      const loginPromise = store.login('loadstate@test.com', 'password')
      expect(store.isLoading).toBe(true)
      
      await loginPromise
      expect(store.isLoading).toBe(false)
    })
  })
})
