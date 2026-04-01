import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { setActivePinia, createPinia } from 'pinia'
import UserLevelRegister from '../UserLevelRegister.vue'
import * as apiModule from '@/services/api'

vi.mock('@/services/api', () => ({
  authService: {
    registerWithAccessLevel: vi.fn()
  }
}))

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/login-register', name: 'login-register' },
    { path: '/user-dashboard', name: 'user-dashboard' }
  ]
})

describe('UserLevelRegister Component', () => {
  let wrapper
  const pinia = createPinia()

  beforeEach(() => {
    setActivePinia(pinia)
    vi.clearAllMocks()
    
    wrapper = mount(UserLevelRegister, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })
  })

  it('should render the form correctly', () => {
    expect(wrapper.find('.ulr-container').exists()).toBe(true)
    expect(wrapper.find('.form-card').exists()).toBe(true)
    expect(wrapper.find('h2').text()).toBe('Registrar Novo Usuário')
  })

  it('should have all form fields', () => {
    const inputs = wrapper.findAll('input')
    const select = wrapper.find('select')
    
    expect(inputs).toHaveLength(6)
    expect(select.exists()).toBe(true)
  })

  it('should display error when required fields are empty', async () => {
    const submitBtn = wrapper.find('.btn-submit')
    await submitBtn.trigger('submit')

    expect(wrapper.vm.error).toBe('Preencha todos os campos obrigatórios')
    expect(wrapper.find('.error-message').text()).toContain('Preencha todos os campos obrigatórios')
  })

  it('should display error when passwords do not match', async () => {
    wrapper.vm.email = 'test@example.com'
    wrapper.vm.password = 'Password123'
    wrapper.vm.confirmPassword = 'Password456'
    wrapper.vm.nomeCompleto = 'Test User'
    wrapper.vm.telefone = '(11) 98765-4321'
    wrapper.vm.cpf = '123.456.789-09'
    wrapper.vm.nivelDeAcesso = 'PACIENTE'

    await wrapper.vm.$nextTick()
    const form = wrapper.find('form')
    await form.trigger('submit')

    expect(wrapper.vm.error).toBe('As senhas não correspondem')
  })

  it('should reset form when clear button is clicked', async () => {
    wrapper.vm.email = 'test@example.com'
    wrapper.vm.nomeCompleto = 'Test User'
    wrapper.vm.error = 'Some error'

    const clearBtn = wrapper.find('.btn-cancel')
    await clearBtn.trigger('click')

    expect(wrapper.vm.email).toBe('')
    expect(wrapper.vm.nomeCompleto).toBe('')
    expect(wrapper.vm.error).toBe('')
  })

  it('should navigate back to dashboard when back button is clicked', async () => {
    const mockPush = vi.spyOn(router, 'push')
    
    const backBtn = wrapper.find('.back-btn')
    await backBtn.trigger('click')

    expect(mockPush).toHaveBeenCalledWith('/user-dashboard')
  })

  it('should have correct initial state', () => {
    expect(wrapper.vm.nivelDeAcesso).toBe('PACIENTE')
    expect(wrapper.vm.loading).toBe(false)
    expect(wrapper.vm.error).toBe('')
    expect(wrapper.vm.success).toBe('')
  })

  it('should have all access levels in dropdown', () => {
    const options = wrapper.findAll('option')
    const expectedLevels = ['PACIENTE', 'MEDICO', 'ENFERMEIRA', 'GESTOR', 'ADM', 'GM']
    
    expect(options).toHaveLength(6)
    options.forEach((option, index) => {
      expect(option.element.value).toBe(expectedLevels[index])
    })
  })

  it('should get correct label for access level', () => {
    expect(wrapper.vm.getLevelLabel('MEDICO')).toBe('Médico')
    expect(wrapper.vm.getLevelLabel('PACIENTE')).toBe('Paciente')
    expect(wrapper.vm.getLevelLabel('GM')).toBe('Game Master (GM)')
  })

  it('should have the correct structure and classes', () => {
    expect(wrapper.find('.ulr-container').exists()).toBe(true)
    expect(wrapper.find('.form-card').exists()).toBe(true)
    expect(wrapper.find('h2').text()).toBe('Registrar Novo Usuário')
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.findAll('.form-group')).toBeDefined()
  })

  it('should display loading state during submission', async () => {
    const mockRegister = vi.spyOn(apiModule.authService, 'registerWithAccessLevel')
      .mockImplementation(() => new Promise(() => {}))

    wrapper.vm.email = 'test@clinicavitalis.com'
    wrapper.vm.password = 'Vitalis@2026'
    wrapper.vm.confirmPassword = 'Vitalis@2026'
    wrapper.vm.nomeCompleto = 'Test User'
    wrapper.vm.telefone = '(11) 98765-4321'
    wrapper.vm.cpf = '123.456.789-09'
    wrapper.vm.nivelDeAcesso = 'MEDICO'

    await wrapper.vm.$nextTick()

    wrapper.vm.handleSubmit()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.loading).toBe(true)
    expect(wrapper.find('.btn-submit').element.disabled).toBe(true)
  })

  it('should handle successful registration', async () => {
    const mockResponse = {
      data: {
        dados: {
          nome_completo: 'Ana Carolina Ferreira',
          email: 'ana@clinicavitalis.com',
          nivel_de_acesso: 'medico'
        }
      }
    }

    vi.spyOn(apiModule.authService, 'registerWithAccessLevel')
      .mockResolvedValue(mockResponse)

    wrapper.vm.email = 'ana@clinicavitalis.com'
    wrapper.vm.password = 'Vitalis@2026'
    wrapper.vm.confirmPassword = 'Vitalis@2026'
    wrapper.vm.nomeCompleto = 'Ana Carolina Ferreira'
    wrapper.vm.telefone = '(11) 91234-5678'
    wrapper.vm.cpf = '312.456.789-10'
    wrapper.vm.nivelDeAcesso = 'MEDICO'

    await wrapper.vm.handleSubmit()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.success).toContain('Ana Carolina Ferreira')
    expect(wrapper.vm.success).toContain('Médico')
    expect(wrapper.vm.email).toBe('')
    expect(wrapper.vm.loading).toBe(false)
  })

  it('should handle registration error', async () => {
    const errorMessage = 'Email já cadastrado'
    
    vi.spyOn(apiModule.authService, 'registerWithAccessLevel')
      .mockRejectedValue(new Error(errorMessage))

    wrapper.vm.email = 'duplicate@clinicavitalis.com'
    wrapper.vm.password = 'Vitalis@2026'
    wrapper.vm.confirmPassword = 'Vitalis@2026'
    wrapper.vm.nomeCompleto = 'Duplicate User'
    wrapper.vm.telefone = '(11) 98765-4321'
    wrapper.vm.cpf = '123.456.789-09'
    wrapper.vm.nivelDeAcesso = 'PACIENTE'

    await wrapper.vm.handleSubmit()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.error).toBe(errorMessage)
    expect(wrapper.vm.loading).toBe(false)
  })

  it('should clear messages when starting new submission', async () => {
    wrapper.vm.error = 'Previous error'
    wrapper.vm.success = 'Previous success'

    wrapper.vm.email = 'test@clinicavitalis.com'
    wrapper.vm.password = 'Vitalis@2026'
    wrapper.vm.confirmPassword = 'Vitalis@2026'
    wrapper.vm.nomeCompleto = 'Test User'
    wrapper.vm.telefone = '(11) 98765-4321'
    wrapper.vm.cpf = '123.456.789-09'

    vi.spyOn(apiModule.authService, 'registerWithAccessLevel')
      .mockResolvedValue({ data: { dados: { nome_completo: 'Test' } } })

    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.error).toBe('')
    expect(wrapper.vm.success).toBeTruthy()
  })

  it('should send correct data to API on registration', async () => {
    const registerSpy = vi.spyOn(apiModule.authService, 'registerWithAccessLevel')
      .mockResolvedValue({ data: { dados: { nome_completo: 'Test User' } } })

    wrapper.vm.email = 'test@clinicavitalis.com'
    wrapper.vm.password = 'Vitalis@2026'
    wrapper.vm.confirmPassword = 'Vitalis@2026'
    wrapper.vm.nomeCompleto = 'Test User'
    wrapper.vm.telefone = '(11) 98765-4321'
    wrapper.vm.cpf = '123.456.789-09'
    wrapper.vm.nivelDeAcesso = 'MEDICO'

    await wrapper.vm.handleSubmit()

    expect(registerSpy).toHaveBeenCalledWith(expect.objectContaining({
      email: 'test@clinicavitalis.com',
      password: 'Vitalis@2026',
      nome_completo: 'Test User',
      telefone: '(11) 98765-4321',
      cpf: '123.456.789-09',
      nivel_de_acesso: 'medico'
    }))
  })

  it('should show all validation errors', async () => {
    wrapper.vm.email = ''
    await wrapper.vm.handleSubmit()
    expect(wrapper.vm.error).toBe('Preencha todos os campos obrigatórios')

    wrapper.vm.email = 'test@example.com'
    wrapper.vm.nomeCompleto = 'Test'
    wrapper.vm.telefone = '(11) 98765-4321'
    wrapper.vm.cpf = '123.456.789-09'
    wrapper.vm.password = ''
    await wrapper.vm.handleSubmit()
    expect(wrapper.vm.error).toBe('Preencha todos os campos obrigatórios')

    wrapper.vm.password = 'Password123'
    wrapper.vm.confirmPassword = 'Password456'
    await wrapper.vm.handleSubmit()
    expect(wrapper.vm.error).toBe('As senhas não correspondem')
  })
})
