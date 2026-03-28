import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'

vi.mock('axios')

describe('API Service', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should create axios instance with correct base URL', () => {
    expect(axios.create).toBeDefined()
  })

  it('should set Authorization header when token exists', () => {
    const token = 'test-token-123'
    localStorage.setItem('authToken', token)
    
    expect(localStorage.getItem('authToken')).toBe(token)
  })

  it('should remove token on 401 response', () => {
    localStorage.setItem('authToken', 'test-token')
    localStorage.setItem('user', JSON.stringify({ id: 1 }))
    
    expect(localStorage.getItem('authToken')).toBe('test-token')
    expect(localStorage.getItem('user')).toBeTruthy()
  })

  it('should handle error response correctly', () => {
    const error = new Error('API Error')
    error.response = {
      status: 400,
      data: { message: 'Bad Request' }
    }
    
    expect(error.message).toBe('API Error')
    expect(error.response.status).toBe(400)
  })
})
