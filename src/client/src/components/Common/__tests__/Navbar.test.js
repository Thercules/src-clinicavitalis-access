import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory } from 'vue-router'
import Navbar from '../../Common/Navbar.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  messages: {
    'pt-BR': {
      'navbar.top.blog': 'Blog',
      'navbar.top.about': 'Sobre',
      'navbar.top.help': 'Ajuda',
      'navbar.top.faq': 'FAQ',
      'navbar.top.location': 'Localização',
      'navbar.login': 'Login',
      'navbar.searchPlaceholder': 'Buscar médico...',
      'homeDoctorFilter.noResults': 'Nenhum resultado encontrado'
    }
  }
})

const router = createRouter({
  history: createMemoryHistory(),
  routes: []
})

describe('Navbar Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Navbar, {
      global: {
        plugins: [i18n, router]
      }
    })
  })

  it('should render navbar correctly', () => {
    expect(wrapper.find('.navbar').exists()).toBe(true)
    expect(wrapper.find('.navbar__logo-text').text()).toBe('Clinica Vitallis')
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should toggle mobile menu', async () => {
    const hamburger = wrapper.find('.navbar__hamburger')
    
    expect(wrapper.vm.mobileMenuOpen).toBe(false)
    expect(hamburger.classes()).not.toContain('navbar__hamburger--active')
    
    await hamburger.trigger('click')
    
    expect(wrapper.vm.mobileMenuOpen).toBe(true)
    expect(hamburger.classes()).toContain('navbar__hamburger--active')
  })

  it('should toggle location', async () => {
    const toggle = wrapper.find('.navbar__toggle')
    
    expect(wrapper.vm.locationEnabled).toBe(true)
    
    await toggle.trigger('click')
    
    expect(wrapper.vm.locationEnabled).toBe(false)
  })

  it('should toggle search dropdown', async () => {
    const searchButton = wrapper.find('.navbar__search-icon')
    
    expect(wrapper.vm.searchOpen).toBe(false)
    
    await searchButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.searchOpen).toBe(true)
  })

  it('should filter doctors by name', async () => {
    await wrapper.find('.navbar__search-icon').trigger('click')
    await wrapper.vm.$nextTick()
    
    wrapper.vm.searchQuery = 'João'
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.filteredDoctors).toHaveLength(1)
    expect(wrapper.vm.filteredDoctors[0].name).toBe('Dr. João Silva')
  })

  it('should filter doctors by specialty', async () => {
    await wrapper.find('.navbar__search-icon').trigger('click')
    await wrapper.vm.$nextTick()
    
    wrapper.vm.searchQuery = 'Cardiologia'
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.filteredDoctors).toHaveLength(1)
  })

  it('should select a doctor from the list', async () => {
    const doctor = wrapper.vm.doctors[0]
    wrapper.vm.searchQuery = doctor.name
    wrapper.vm.searchOpen = false
    
    expect(wrapper.vm.searchQuery).toBe('Dr. João Silva')
    expect(wrapper.vm.searchOpen).toBe(false)
  })

  it('should have all required doctors in list', () => {
    expect(wrapper.vm.doctors.length).toBe(6)
    expect(wrapper.vm.doctors[0].name).toBe('Dr. João Silva')
    expect(wrapper.vm.doctors[0].specialty).toBe('Cardiologia')
  })

  it('should select doctor and close search', async () => {
    await wrapper.find('.navbar__search-icon').trigger('click')
    await wrapper.vm.$nextTick()
    
    const doctor = wrapper.vm.doctors[0]
    wrapper.vm.selectDoctor(doctor)
    
    expect(wrapper.vm.searchQuery).toBe(doctor.name)
    expect(wrapper.vm.searchOpen).toBe(false)
  })

  it('should show all doctors when no query', async () => {
    await wrapper.find('.navbar__search-icon').trigger('click')
    await wrapper.vm.$nextTick()
    
    wrapper.vm.searchQuery = ''
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.filteredDoctors).toHaveLength(wrapper.vm.doctors.length)
  })

  it('should have correct component name', () => {
    expect(wrapper.vm.$options.name).toBe('Navbar')
  })

  it('should have empty string as initial searchQuery', () => {
    expect(wrapper.vm.searchQuery).toBe('')
  })

  it('should have correct names and specialties for all doctors', () => {
    const doctors = wrapper.vm.doctors
    expect(doctors[1].name).toBe('Dra. Maria Santos')
    expect(doctors[1].specialty).toBe('Dermatologia')
    expect(doctors[2].name).toBe('Dr. Pedro Oliveira')
    expect(doctors[2].specialty).toBe('Ortopedia')
    expect(doctors[3].name).toBe('Dra. Ana Costa')
    expect(doctors[3].specialty).toBe('Pediatria')
    expect(doctors[4].name).toBe('Dr. Carlos Lima')
    expect(doctors[4].specialty).toBe('Neurologia')
    expect(doctors[5].name).toBe('Dra. Isabel Martins')
    expect(doctors[5].specialty).toBe('Oftalmologia')
  })

  it('should set searchOpen to false when closeSearch is called', () => {
    wrapper.vm.searchOpen = true
    wrapper.vm.closeSearch()
    expect(wrapper.vm.searchOpen).toBe(false)
  })

  it('should not change searchOpen to true when closeSearch is called while already closed', () => {
    wrapper.vm.searchOpen = false
    wrapper.vm.closeSearch()
    expect(wrapper.vm.searchOpen).toBe(false)
  })

  it('should log correct message with doctor object when selectDoctor is called', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const doctor = wrapper.vm.doctors[0]
    wrapper.vm.selectDoctor(doctor)
    expect(consoleSpy).toHaveBeenCalledWith('Doutor selecionado:', doctor)
    consoleSpy.mockRestore()
  })

  it('should focus input when search opens via toggleSearch', async () => {
    const focusMock = vi.spyOn(HTMLInputElement.prototype, 'focus').mockImplementation(() => {})
    wrapper.vm.searchOpen = false

    await wrapper.find('.navbar__search-icon').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('should not focus input when search is closed via toggleSearch', async () => {
    const focusMock = vi.spyOn(HTMLInputElement.prototype, 'focus').mockImplementation(() => {})
    wrapper.vm.searchOpen = true
    await wrapper.vm.$nextTick()

    focusMock.mockClear()
    wrapper.vm.toggleSearch() // closes search
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(focusMock).not.toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('should open search and have searchOpen true after toggle when closed', async () => {
    wrapper.vm.searchOpen = false
    wrapper.vm.toggleSearch()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.searchOpen).toBe(true)
  })

  it('should filter doctors by specialty (Dermatologia)', () => {
    wrapper.vm.searchQuery = 'Dermatologia'
    expect(wrapper.vm.filteredDoctors.length).toBe(1)
    expect(wrapper.vm.filteredDoctors[0].name).toBe('Dra. Maria Santos')
  })

  it('should filter doctors by specialty (Ortopedia)', () => {
    wrapper.vm.searchQuery = 'Ortopedia'
    expect(wrapper.vm.filteredDoctors.length).toBe(1)
    expect(wrapper.vm.filteredDoctors[0].name).toBe('Dr. Pedro Oliveira')
  })

  it('should filter doctors by specialty (Neurologia)', () => {
    wrapper.vm.searchQuery = 'Neurologia'
    expect(wrapper.vm.filteredDoctors.length).toBe(1)
    expect(wrapper.vm.filteredDoctors[0].name).toBe('Dr. Carlos Lima')
  })

  it('should filter doctors by specialty (Oftalmologia)', () => {
    wrapper.vm.searchQuery = 'Oftalmologia'
    expect(wrapper.vm.filteredDoctors.length).toBe(1)
    expect(wrapper.vm.filteredDoctors[0].name).toBe('Dra. Isabel Martins')
  })
})
