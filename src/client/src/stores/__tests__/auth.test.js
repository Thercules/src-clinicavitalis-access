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
      expect(store.isLoading).toBe(false)
      expect(store.error).toBeNull()
    })

    it('should compute isAuthenticated correctly', () => {
      const store = useAuthStore()

      expect(store.isAuthenticated).toBe(false)

      store.user = { id: 1, name: 'Test User' }
      expect(store.isAuthenticated).toBe(true)
    })
  })

  describe('initializeAuth', () => {
    it('should restore user from localStorage', () => {
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }))

      const store = useAuthStore()
      store.initializeAuth()

      expect(store.user).toEqual({ id: 1, name: 'Test User' })
    })

    it('should leave user null when localStorage is empty', () => {
      const store = useAuthStore()
      store.initializeAuth()

      expect(store.user).toBeNull()
    })

    it('should handle invalid user JSON in localStorage', () => {
      localStorage.setItem('user', 'invalid-json')

      const store = useAuthStore()
      store.initializeAuth()

      expect(store.user).toBeNull()
      expect(localStorage.getItem('user')).toBeNull()
    })

    it('should not overwrite existing user when localStorage has no user', () => {
      const store = useAuthStore()
      store.user = { id: 999, name: 'Pre-existing User' }
      store.initializeAuth()

      expect(store.user).toEqual({ id: 999, name: 'Pre-existing User' })
    })
  })

  describe('login', () => {
    it('should login successfully and set user state', async () => {
      const mockResponse = {
        data: {
          user: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com'
          }
        }
      }
      authService.login.mockResolvedValue(mockResponse)

      const store = useAuthStore()
      const result = await store.login('john@example.com', 'password')

      expect(store.user).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' })
      expect(store.isLoading).toBe(false)
      expect(store.error).toBeNull()
      expect(result).toEqual(mockResponse.data)
    })

    it('should not expose token in client state', async () => {
      const mockResponse = {
        data: { user: { id: 1, name: 'John Doe', email: 'john@example.com' } }
      }
      authService.login.mockResolvedValue(mockResponse)

      const store = useAuthStore()
      await store.login('john@example.com', 'password')

      expect(store.token).toBeUndefined()
      expect(localStorage.getItem('authToken')).toBeNull()
    })

    it('should throw error when user data is not found in response', async () => {
      const mockResponse = {
        data: {}
      }
      authService.login.mockResolvedValue(mockResponse)

      const store = useAuthStore()

      await expect(store.login('test@example.com', 'password')).rejects.toThrow(
        'Dados do usuário não encontrados na resposta do servidor'
      )
      expect(store.error).toBe('Dados do usuário não encontrados na resposta do servidor')
      expect(store.user).toBeNull()
      expect(store.isLoading).toBe(false)
    })

    it('should handle login service error', async () => {
      const mockError = new Error('Invalid credentials')
      authService.login.mockRejectedValue(mockError)

      const store = useAuthStore()

      await expect(store.login('wrong@example.com', 'wrong')).rejects.toThrow('Invalid credentials')
      expect(store.error).toBe('Invalid credentials')
      expect(store.user).toBeNull()
      expect(store.isLoading).toBe(false)
    })

    it('should set isLoading to true during login', async () => {
      const mockResponse = {
        data: { user: { id: 6, name: 'Loading Test', email: 'loading@example.com' } }
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

    it('should store user data in localStorage on login', async () => {
      const mockResponse = {
        data: {
          user: { id: 7, name: 'Storage Test', email: 'storage@example.com' }
        }
      }
      authService.login.mockResolvedValue(mockResponse)

      const store = useAuthStore()
      await store.login('storage@example.com', 'password')

      const storedUser = JSON.parse(localStorage.getItem('user'))
      expect(storedUser).toEqual({ id: 7, name: 'Storage Test', email: 'storage@example.com' })
    })
  })

  describe('logout', () => {
    it('should logout successfully', async () => {
      authService.logout.mockResolvedValue({})

      const store = useAuthStore()
      store.user = { id: 1, name: 'Test User' }
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }))

      await store.logout()

      expect(store.user).toBeNull()
      expect(store.error).toBeNull()
      expect(store.isLoading).toBe(false)
      expect(localStorage.getItem('user')).toBeNull()
      expect(window.location.href).toBe('/login-register')
    })

    it('should set isLoading to true immediately on logout', () => {
      authService.logout.mockImplementation(() => {
        const store = useAuthStore()
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

      expect(store.error).toBeNull()

      await new Promise(resolve => setTimeout(resolve, 10))
    })

    it('should handle logout service error gracefully', async () => {
      const logoutError = new Error('Server error')
      authService.logout.mockRejectedValue(logoutError)

      const store = useAuthStore()
      store.user = { id: 1, name: 'Test User' }

      await store.logout()

      expect(store.user).toBeNull()
      expect(window.location.href).toBe('/login-register')
    })

    it('should clear user from localStorage on logout', async () => {
      authService.logout.mockResolvedValue({})

      const store = useAuthStore()
      localStorage.setItem('user', JSON.stringify({ id: 1 }))

      await store.logout()

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

      expect(store.user).toBeNull()
    })

    it('should handle missing user in localStorage gracefully', () => {
      const store = useAuthStore()
      store.initializeAuth()

      expect(store.user).toBeNull()
    })

    it('should ignore authToken in localStorage (token managed by HttpOnly cookie)', () => {
      localStorage.setItem('authToken', 'some-token')

      const store = useAuthStore()
      store.initializeAuth()

      expect(store.token).toBeUndefined()
    })
  })

  describe('Loading State Management', () => {
    it('should verify isLoading transitions from true to false during logout', async () => {
      authService.logout.mockResolvedValue({})

      const store = useAuthStore()
      store.user = { id: 1, name: 'Test' }

      const logoutPromise = store.logout()
      expect(store.isLoading).toBe(true)

      await logoutPromise
      expect(store.isLoading).toBe(false)
    })

    it('should have isLoading as false in initial state', () => {
      const store = useAuthStore()

      expect(store.isLoading).toBe(false)
    })

    it('should verify isLoading transitions from true to false during login', async () => {
      const mockResponse = {
        data: {
          user: { id: 100, name: 'Load State Test', email: 'loadstate@test.com' }
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
