import { describe, it, expect, beforeEach } from 'vitest'
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
    expect(wrapper.vm.filteredDoctors[0].specialty).toBe('Cardiologia')
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
})
