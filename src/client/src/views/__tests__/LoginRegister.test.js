import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { setActivePinia, createPinia } from 'pinia'
import LoginRegister from '../LoginRegister.vue'
import { useAuthStore } from '@/stores/auth'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key) => key
  })
}))

const createTestRouter = () => {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/login-register', name: 'login-register' },
      { path: '/user-dashboard', name: 'user-dashboard' }
    ]
  })
}

describe('LoginRegister Component', () => {
  let wrapper
  let router
  let pinia
  let authStore

  beforeEach(() => {
    pinia = createPinia()
    router = createTestRouter()
    setActivePinia(pinia)

    wrapper = mount(LoginRegister, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    authStore = useAuthStore()
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.resetAllMocks()
    vi.restoreAllMocks()
  })

  describe('Initial State', () => {
    it('should initialize with login form', () => {
      expect(wrapper.vm.isLogin).toBe(true)
      expect(wrapper.vm.email).toBe('')
      expect(wrapper.vm.password).toBe('')
      expect(wrapper.vm.confirmPassword).toBe('')
      expect(wrapper.vm.nomeCompleto).toBe('')
      expect(wrapper.vm.telefone).toBe('')
      expect(wrapper.vm.cpf).toBe('')
      expect(wrapper.vm.nivelDeAcesso).toBe('PACIENTE')
      expect(wrapper.vm.error).toBe('')
      expect(wrapper.vm.loading).toBe(false)
    })

    it('should render login form title when isLogin is true', () => {
      expect(wrapper.find('.form-title').text()).toBe('Faça seu Login')
    })

    it('should render registration form title when isLogin is false', async () => {
      wrapper.vm.isLogin = false
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.form-title').text()).toBe('Crie sua Conta')
    })
  })

  describe('toggleForm', () => {
    it('should toggle between login and register forms', async () => {
      expect(wrapper.vm.isLogin).toBe(true)
      wrapper.vm.toggleForm()
      expect(wrapper.vm.isLogin).toBe(false)
      wrapper.vm.toggleForm()
      expect(wrapper.vm.isLogin).toBe(true)
    })

    it('should clear error message when toggling form', async () => {
      wrapper.vm.error = 'Some error'
      wrapper.vm.toggleForm()
      expect(wrapper.vm.error).toBe('')
    })

    it('should reset all form fields when toggling form', async () => {
      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'password123'
      wrapper.vm.confirmPassword = 'password123'
      wrapper.vm.nomeCompleto = 'Test User'
      wrapper.vm.telefone = '(11) 98765-4321'
      wrapper.vm.cpf = '123.456.789-09'
      wrapper.vm.nivelDeAcesso = 'MEDICO'

      wrapper.vm.toggleForm()

      expect(wrapper.vm.email).toBe('')
      expect(wrapper.vm.password).toBe('')
      expect(wrapper.vm.confirmPassword).toBe('')
      expect(wrapper.vm.nomeCompleto).toBe('')
      expect(wrapper.vm.telefone).toBe('')
      expect(wrapper.vm.cpf).toBe('')
      expect(wrapper.vm.nivelDeAcesso).toBe('PACIENTE')
    })
  })

  describe('Login Form Submission', () => {
    beforeEach(() => {
      wrapper.vm.isLogin = true
    })

    it('should show error when email is empty', async () => {
      wrapper.vm.email = ''
      wrapper.vm.password = 'password123'
      await wrapper.vm.handleSubmit()

      expect(wrapper.vm.error).toBe('Preencha todos os campos obrigatórios')
    })

    it('should show error when password is empty', async () => {
      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = ''
      await wrapper.vm.handleSubmit()

      expect(wrapper.vm.error).toBe('Preencha todos os campos obrigatórios')
    })

    it('should call authStore.login with correct credentials', async () => {
      const loginSpy = vi.spyOn(authStore, 'login').mockResolvedValue({})
      const pushSpy = vi.spyOn(router, 'push').mockResolvedValue(undefined)

      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'password123'
      await wrapper.vm.handleSubmit()

      expect(loginSpy).toHaveBeenCalledWith('test@example.com', 'password123')
    })

    it('should redirect to user-dashboard on successful login', async () => {
      vi.spyOn(authStore, 'login').mockResolvedValue({})
      const pushSpy = vi.spyOn(router, 'push').mockResolvedValue(undefined)

      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'password123'
      await wrapper.vm.handleSubmit()
      await flushPromises()

      expect(pushSpy).toHaveBeenCalledWith('/user-dashboard')
    })

    it('should set loading to true and then false during login', async () => {
      vi.spyOn(authStore, 'login').mockImplementation(() => {
        expect(wrapper.vm.loading).toBe(true)
        return Promise.resolve({})
      })

      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'password123'
      await wrapper.vm.handleSubmit()
      await flushPromises()

      expect(wrapper.vm.loading).toBe(false)
    })

    it('should display error message from response', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Credenciais inválidas'
          }
        }
      }
      vi.spyOn(authStore, 'login').mockRejectedValue(mockError)

      wrapper.vm.email = 'wrong@example.com'
      wrapper.vm.password = 'wrongpassword'
      await wrapper.vm.handleSubmit()
      await flushPromises()

      expect(wrapper.vm.error).toBe('Credenciais inválidas')
    })

    it('should display default error message when response error is missing', async () => {
      const mockError = new Error('Network error')
      vi.spyOn(authStore, 'login').mockRejectedValue(mockError)

      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'password123'
      await wrapper.vm.handleSubmit()
      await flushPromises()

      expect(wrapper.vm.error).toBe('Erro ao fazer login. Verifique suas credenciais.')
    })

    it('should clear error message when attempting new login', async () => {
      wrapper.vm.error = 'Previous error'
      vi.spyOn(authStore, 'login').mockResolvedValue({})

      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'password123'
      await wrapper.vm.handleSubmit()

      expect(wrapper.vm.error).toBe('')
    })
  })

  describe('Register Form Submission', () => {
    beforeEach(() => {
      wrapper.vm.isLogin = false
    })

    it('should show error when email is empty', async () => {
      wrapper.vm.email = ''
      wrapper.vm.password = 'password123'
      wrapper.vm.confirmPassword = 'password123'
      wrapper.vm.nomeCompleto = 'Test User'
      wrapper.vm.telefone = '(11) 98765-4321'
      wrapper.vm.cpf = '123.456.789-09'

      await wrapper.vm.handleSubmit()

      expect(wrapper.vm.error).toBe('Preencha todos os campos obrigatórios')
    })

    it('should show error when password is empty', async () => {
      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = ''
      wrapper.vm.confirmPassword = 'password123'
      wrapper.vm.nomeCompleto = 'Test User'
      wrapper.vm.telefone = '(11) 98765-4321'
      wrapper.vm.cpf = '123.456.789-09'

      await wrapper.vm.handleSubmit()

      expect(wrapper.vm.error).toBe('Preencha todos os campos obrigatórios')
    })

    it('should show error when passwords do not match', async () => {
      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'password123'
      wrapper.vm.confirmPassword = 'password456'
      wrapper.vm.nomeCompleto = 'Test User'
      wrapper.vm.telefone = '(11) 98765-4321'
      wrapper.vm.cpf = '123.456.789-09'

      await wrapper.vm.handleSubmit()

      expect(wrapper.vm.error).toBe('As senhas não correspondem')
    })

    it('should call fetch with correct registration data', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({})
      })
      vi.spyOn(authStore, 'login').mockResolvedValue({})

      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'password123'
      wrapper.vm.confirmPassword = 'password123'
      wrapper.vm.nomeCompleto = 'Test User'
      wrapper.vm.telefone = '(11) 98765-4321'
      wrapper.vm.cpf = '123.456.789-09'
      wrapper.vm.nivelDeAcesso = 'MEDICO'

      await wrapper.vm.handleSubmit()
      await flushPromises()

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/auth/register',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      )
    })

    it('should display error when registration fetch fails', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: 'Email já registrado' })
      })

      wrapper.vm.email = 'existing@example.com'
      wrapper.vm.password = 'password123'
      wrapper.vm.confirmPassword = 'password123'
      wrapper.vm.nomeCompleto = 'Test User'
      wrapper.vm.telefone = '(11) 98765-4321'
      wrapper.vm.cpf = '123.456.789-09'

      await wrapper.vm.handleSubmit()
      await flushPromises()

      expect(wrapper.vm.error).toBe('Email já registrado')
    })

    it('should handle fetch error during registration', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'))

      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'password123'
      wrapper.vm.confirmPassword = 'password123'
      wrapper.vm.nomeCompleto = 'Test User'
      wrapper.vm.telefone = '(11) 98765-4321'
      wrapper.vm.cpf = '123.456.789-09'

      await wrapper.vm.handleSubmit()
      await flushPromises()

      expect(wrapper.vm.error).toBe('Network error')
    })

    it('should login automatically after successful registration', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({})
      })
      const loginSpy = vi.spyOn(authStore, 'login').mockResolvedValue({})
      const pushSpy = vi.spyOn(router, 'push').mockResolvedValue(undefined)

      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'password123'
      wrapper.vm.confirmPassword = 'password123'
      wrapper.vm.nomeCompleto = 'Test User'
      wrapper.vm.telefone = '(11) 98765-4321'
      wrapper.vm.cpf = '123.456.789-09'

      await wrapper.vm.handleSubmit()
      await flushPromises()

      expect(loginSpy).toHaveBeenCalledWith('test@example.com', 'password123')
      expect(pushSpy).toHaveBeenCalledWith('/user-dashboard')
    })

    it('should display error when auto-login fails after registration', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({})
      })
      const loginError = new Error()
      loginError.message = ''
      vi.spyOn(authStore, 'login').mockRejectedValue(loginError)

      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'password123'
      wrapper.vm.confirmPassword = 'password123'
      wrapper.vm.nomeCompleto = 'Test User'
      wrapper.vm.telefone = '(11) 98765-4321'
      wrapper.vm.cpf = '123.456.789-09'

      await wrapper.vm.handleSubmit()
      await flushPromises()

      expect(wrapper.vm.error).toBe('Cadastro realizado, mas erro ao fazer login automático. Faça login manualmente.')
    })

    it('should set loading to true and then false during registration', async () => {
      let loadingDuringFetch = false
      global.fetch.mockImplementation(() => {
        loadingDuringFetch = wrapper.vm.loading
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({})
        })
      })
      vi.spyOn(authStore, 'login').mockResolvedValue({})

      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'password123'
      wrapper.vm.confirmPassword = 'password123'
      wrapper.vm.nomeCompleto = 'Test User'
      wrapper.vm.telefone = '(11) 98765-4321'
      wrapper.vm.cpf = '123.456.789-09'

      await wrapper.vm.handleSubmit()
      await flushPromises()

      expect(loadingDuringFetch).toBe(true)
      expect(wrapper.vm.loading).toBe(false)
    })
  })

  describe('Computed Properties', () => {
    it('isAuthenticated should return true when user is authenticated', () => {
      authStore.user = { id: 1, name: 'Test User' }
      expect(wrapper.vm.isAuthenticated).toBe(true)
    })

    it('isAuthenticated should return false when user is not authenticated', () => {
      authStore.user = null
      expect(wrapper.vm.isAuthenticated).toBe(false)
    })
  })

  describe('Mounted Hook', () => {
    it('should redirect to user-dashboard when already authenticated', async () => {
      const pushSpy = vi.spyOn(router, 'push').mockResolvedValue(undefined)
      "Use new pinia for isolated store"
      const newPinia = createPinia()
      setActivePinia(newPinia)
      const newAuthStore = useAuthStore()
      newAuthStore.user = { id: 1, name: 'Test User', email: 'test@example.com' }

      const newWrapper = mount(LoginRegister, {
        global: {
          plugins: [router, newPinia],
          stubs: { teleport: true }
        }
      })

      await newWrapper.vm.$nextTick()
      expect(pushSpy).toHaveBeenCalledWith('/user-dashboard')
    })

    it('should not redirect when user is not authenticated', async () => {
      const pushSpy = vi.spyOn(router, 'push').mockResolvedValue(undefined)
      const newPinia = createPinia()
      setActivePinia(newPinia)

      const newWrapper = mount(LoginRegister, {
        global: {
          plugins: [router, newPinia],
          stubs: { teleport: true }
        }
      })

      await newWrapper.vm.$nextTick()
      expect(pushSpy).not.toHaveBeenCalledWith('/user-dashboard')
    })
  })
})
