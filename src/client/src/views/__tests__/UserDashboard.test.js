import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { setActivePinia, createPinia } from 'pinia'
import { flushPromises } from '@vue/test-utils'
import UserDashboard from '../UserDashboard.vue'
import { useAuthStore } from '@/stores/auth'

vi.mock('@/services/api', () => ({
  userService: {
    getConsultations: vi.fn(),
    getExams: vi.fn(),
    downloadExam: vi.fn()
  }
}))

describe('UserDashboard Component', () => {
  let wrapper
  let authStore
  let pinia
  let router

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)

    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/login-register', name: 'login-register' },
        { path: '/user-dashboard', name: 'user-dashboard' },
        { path: '/user-level-register', name: 'user-level-register' }
      ]
    })

    authStore = useAuthStore()
    authStore.user = {
      name: 'João Silva',
      email: 'joao@example.com',
      accessLevel: 'PACIENTE'
    }

    vi.clearAllMocks()
  })

  afterEach(() => {
    if (wrapper) wrapper.unmount()
  })

  it('should render dashboard for authenticated user', () => {
    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    expect(wrapper.find('.dashboard-container').exists()).toBe(true)
    expect(wrapper.find('.dashboard-navbar').exists()).toBe(true)
  })

  it('should display user name in navbar', () => {
    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    expect(wrapper.find('.user-name').text()).toContain('João Silva')
  })

  it('should show access level badge', () => {
    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    const badge = wrapper.find('.badge')
    expect(badge.text()).toBe('Paciente')
  })

  it('should not show GM panel for non-GM users', () => {
    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    expect(wrapper.find('.gm-panel').exists()).toBe(false)
  })

  it('should show GM panel for GM users', () => {
    authStore.user.accessLevel = 'GM'

    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    expect(wrapper.find('.gm-panel').exists()).toBe(true)
    expect(wrapper.find('.gm-register-btn').exists()).toBe(true)
  })

  it('should navigate to user-level-register when GM button is clicked', async () => {
    authStore.user.accessLevel = 'GM'
    const mockPush = vi.spyOn(router, 'push')

    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    await wrapper.find('.gm-register-btn').trigger('click')

    expect(mockPush).toHaveBeenCalledWith('/user-level-register')
  })

  it('should have three tabs available', () => {
    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    const tabButtons = wrapper.findAll('.tab-btn')
    expect(tabButtons).toHaveLength(3)
    expect(tabButtons[0].text()).toBe('Minhas Consultas')
    expect(tabButtons[1].text()).toBe('Meus Exames')
    expect(tabButtons[2].text()).toBe('Dados Pessoais')
  })

  it('should start with consultations tab active', () => {
    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    expect(wrapper.vm.activeTab).toBe('consultations')
    expect(wrapper.findAll('.tab-btn')[0].classes()).toContain('active')
  })

  it('should switch tabs when tab button is clicked', async () => {
    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    const examsTab = wrapper.findAll('.tab-btn')[1]
    await examsTab.trigger('click')

    expect(wrapper.vm.activeTab).toBe('exams')
    expect(examsTab.classes()).toContain('active')
  })

  it('should display welcome message with user first name', () => {
    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    expect(wrapper.find('.welcome-section h2').text()).toContain('João')
  })

  it('should show loading when fetching consultations', async () => {
    const { userService } = await import('@/services/api')
    userService.getConsultations.mockResolvedValue({
      data: { consultations: [] }
    })

    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    wrapper.vm.loadingConsultations = true
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.loading').exists()).toBe(true)
    expect(wrapper.find('.loading p').text()).toContain('Carregando consultas')
  })

  it('should display empty state when no consultations', async () => {
    const { userService } = await import('@/services/api')
    userService.getConsultations.mockResolvedValue({
      data: { consultations: [] }
    })

    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    wrapper.vm.consultations = []
    wrapper.vm.loadingConsultations = false
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.empty-state').exists()).toBe(true)
    expect(wrapper.find('.empty-state p').text()).toBe('Nenhuma consulta agendada')
  })

  it('should display consultations list', async () => {
    const mockConsultations = [
      {
        id: 1,
        doctor: 'Dr. João Silva',
        specialty: 'Cardiologia',
        date: new Date('2026-04-15'),
        location: 'Clínica Centro',
        status: 'agendada'
      }
    ]

    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    wrapper.vm.consultations = mockConsultations
    wrapper.vm.loadingConsultations = false
    await wrapper.vm.$nextTick()

    const consultationCard = wrapper.find('.consultation-card')
    expect(consultationCard.exists()).toBe(true)
    expect(consultationCard.text()).toContain('Dr. João Silva')
    expect(consultationCard.text()).toContain('Cardiologia')
  })

  it('should call formatDate on consultation dates', () => {
    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    const date = new Date('2026-04-15')
    const formatted = wrapper.vm.formatDate(date)
    
    expect(formatted).toContain('2026')
    expect(formatted).toContain('abril')  // month name
  })

  it('should display exams list', async () => {
    const mockExams = [
      {
        id: 1,
        name: 'Eletrocardiograma',
        type: 'Cardiologia',
        date: new Date('2026-03-15'),
        status: 'disponível',
        result: 'Normal'
      }
    ]

    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    wrapper.vm.activeTab = 'exams'
    wrapper.vm.exams = mockExams
    wrapper.vm.loadingExams = false
    await wrapper.vm.$nextTick()

    const examCard = wrapper.find('.exam-card')
    expect(examCard.exists()).toBe(true)
    expect(examCard.text()).toContain('Eletrocardiograma')
  })

  it('should show profile information in profile tab', async () => {
    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    wrapper.vm.activeTab = 'profile'
    await wrapper.vm.$nextTick()

    const profileCard = wrapper.find('.profile-card')
    expect(profileCard.exists()).toBe(true)
    expect(profileCard.text()).toContain('João Silva')
    expect(profileCard.text()).toContain('joao@example.com')
  })

  it('should get correct label for access levels', () => {
    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    expect(wrapper.vm.getAccessLevelLabel('MEDICO')).toBe('Médico')
    expect(wrapper.vm.getAccessLevelLabel('PACIENTE')).toBe('Paciente')
    expect(wrapper.vm.getAccessLevelLabel('ADM')).toBe('ADM')
    expect(wrapper.vm.getAccessLevelLabel('GM')).toBe('GM')
  })

  it('should redirect to login if not authenticated on mount', () => {
    authStore.user = null
    const mockPush = vi.spyOn(router, 'push')

    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    expect(mockPush).toHaveBeenCalledWith('/login-register')
  })

  it('should show logout button', () => {
    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    expect(wrapper.find('.logout-btn').exists()).toBe(true)
    expect(wrapper.find('.logout-btn').text()).toBe('Sair')
  })

  it('should handle logout with confirmation', async () => {
    const mockPush = vi.spyOn(router, 'push')
    const mockLogout = vi.spyOn(authStore, 'logout')
    global.confirm = vi.fn(() => true)

    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    await wrapper.find('.logout-btn').trigger('click')

    expect(global.confirm).toHaveBeenCalled()
    expect(mockLogout).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalledWith('/login-register')
  })

  it('should not logout when user cancels confirmation', async () => {
    const mockLogout = vi.spyOn(authStore, 'logout')
    global.confirm = vi.fn(() => false)

    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    await wrapper.find('.logout-btn').trigger('click')

    expect(mockLogout).not.toHaveBeenCalled()
  })

  it('should show badge with correct color class for access level', () => {
    authStore.user.accessLevel = 'MEDICO'

    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    const badge = wrapper.find('.badge')
    expect(badge.classes()).toContain('badge-medico')
  })

  it('should display consultations from API response', async () => {
    const { userService } = await import('@/services/api')
    const mockConsultations = [
      {
        id: 1,
        doctor: 'Dr. API',
        specialty: 'Test',
        date: new Date(),
        location: 'Clinic',
        status: 'agendada'
      }
    ]
    userService.getConsultations.mockResolvedValue({
      data: { consultations: mockConsultations }
    })

    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    await wrapper.vm.fetchConsultations()
    await flushPromises()

    expect(wrapper.vm.consultations).toEqual(mockConsultations)
    expect(userService.getConsultations).toHaveBeenCalled()
  })

  it('should use fallback data when API fails', async () => {
    const { userService } = await import('@/services/api')
    userService.getConsultations.mockRejectedValue(new Error('API Error'))

    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    await wrapper.vm.fetchConsultations()
    await flushPromises()

    expect(wrapper.vm.consultations.length).toBeGreaterThan(0)
    expect(wrapper.vm.consultations[0].doctor).toBe('Dr. João Silva')
  })

  it('should set loading to false after fetch', async () => {
    const { userService } = await import('@/services/api')
    userService.getConsultations.mockResolvedValue({
      data: { consultations: [] }
    })

    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    expect(wrapper.vm.loadingConsultations).toBe(false)

    await wrapper.vm.fetchConsultations()
    await flushPromises()

    expect(wrapper.vm.loadingConsultations).toBe(false)
  })

  it('should fetch exams when exams tab is clicked', async () => {
    const { userService } = await import('@/services/api')
    userService.getExams.mockResolvedValue({
      data: { exams: [] }
    })

    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    wrapper.vm.exams = []
    wrapper.vm.activeTab = 'exams'
    await wrapper.vm.$nextTick()
    await flushPromises()

    expect(userService.getExams).toHaveBeenCalled()
  })

  it('should have reagendar button for agendada consultations', async () => {
    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    wrapper.vm.consultations = [
      {
        id: 1,
        doctor: 'Dr. Test',
        specialty: 'Test',
        date: new Date(),
        location: 'Test',
        status: 'agendada'
      }
    ]
    await wrapper.vm.$nextTick()

    const button = wrapper.find('.consultation-card .btn')
    expect(button.text()).toContain('Reagendar')
  })

  it('should have download button for available exams', async () => {
    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    wrapper.vm.activeTab = 'exams'
    wrapper.vm.exams = [
      {
        id: 1,
        name: 'Test Exam',
        type: 'Test',
        date: new Date(),
        status: 'disponível',
        result: 'Normal'
      }
    ]
    await wrapper.vm.$nextTick()

    const button = wrapper.find('.exam-card .btn-primary')
    expect(button.text()).toContain('Baixar Resultado')
  })

  it('should handle empty exams state', async () => {
    const { userService } = await import('@/services/api')
    userService.getExams.mockResolvedValue({ data: { exams: [] } })

    wrapper = mount(UserDashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          teleport: true
        }
      }
    })

    wrapper.vm.activeTab = 'exams'
    await wrapper.vm.$nextTick()
    await flushPromises()

    const tabContents = wrapper.findAll('.tab-content')
    const examsTabContent = tabContents[1]  // Second tab is exams
    const emptyState = examsTabContent.find('.empty-state')
    expect(emptyState.exists()).toBe(true)
    expect(emptyState.text()).toBe('Nenhum exame encontrado')
  })
})
