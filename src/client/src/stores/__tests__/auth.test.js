import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

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
  })

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

  it('should initialize auth from localStorage', () => {
    localStorage.setItem('authToken', 'stored-token')
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }))
    
    const store = useAuthStore()
    store.initializeAuth()
    
    expect(store.token).toBe('stored-token')
    expect(store.user).toEqual({ id: 1, name: 'Test User' })
  })

  it('should clear error when expected', () => {
    const store = useAuthStore()
    
    store.error = 'Some error'
    expect(store.error).toBe('Some error')
    
    store.error = null
    expect(store.error).toBeNull()
  })
})
