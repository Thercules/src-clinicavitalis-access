import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DoctorFilter from '../DoctorFilter.vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory } from 'vue-router'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {}
  }
})

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/schedule-consultation',
      component: { template: '<div>Schedule</div>' }
    }
  ]
})

describe('DoctorFilter Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(DoctorFilter, {
      global: {
        plugins: [i18n, router],
        mocks: {
          localStorage: {
            setItem: vi.fn(),
            getItem: vi.fn()
          }
        }
      }
    })
  })

  it('should render doctor filter component', () => {
    expect(wrapper.find('.doctor_filter').exists()).toBe(true)
  })

  it('should have initial default values', () => {
    expect(wrapper.vm.selectedSpecialty).toBe('Clínico Geral')
    expect(wrapper.vm.selectedLocation).toBe('Olinda')
    expect(wrapper.vm.selectedGender).toBe('Todos')
    expect(wrapper.vm.searchQuery).toBe('')
    expect(wrapper.vm.showSpecialtyDropdown).toBe(false)
    expect(wrapper.vm.selectedDoctor).toBeNull()
  })

  it('should have specialties data', () => {
    expect(wrapper.vm.specialties.length).toBeGreaterThan(0)
    expect(wrapper.vm.specialties[0].name).toBe('Clínico Geral')
  })

  it('should have doctors data', () => {
    expect(wrapper.vm.doctors.length).toBeGreaterThan(0)
    expect(wrapper.vm.doctors[0].name).toBeDefined()
    expect(wrapper.vm.doctors[0].specialty).toBeDefined()
  })

  it('should filter doctors by specialty', () => {
    wrapper.vm.selectedSpecialty = 'Clínico Geral'
    const filtered = wrapper.vm.filteredDoctors
    
    expect(filtered.length).toBeGreaterThan(0)
    filtered.forEach(doctor => {
      expect(doctor.specialty).toContain('Clínico Geral')
    })
  })

  it('should filter doctors by location', () => {
    wrapper.vm.selectedLocation = 'Olinda'
    const filtered = wrapper.vm.filteredDoctors
    
    expect(filtered.length).toBeGreaterThan(0)
    filtered.forEach(doctor => {
      expect(doctor.location).toBe('Olinda')
    })
  })

  it('should filter doctors by gender', () => {
    wrapper.vm.selectedGender = 'Masculino'
    const filtered = wrapper.vm.filteredDoctors
    
    filtered.forEach(doctor => {
      expect(doctor.gender).toBe('Masculino')
    })
  })

  it('should filter specialties by search query', () => {
    wrapper.vm.searchQuery = 'Cirurgião'
    const filtered = wrapper.vm.filteredSpecialties
    
    filtered.forEach(specialty => {
      expect(specialty.name.toLowerCase()).toContain('cirurgião')
    })
  })

  it('should select specialty correctly', () => {
    const specialty = wrapper.vm.specialties[0]
    wrapper.vm.selectSpecialty(specialty)
    
    expect(wrapper.vm.selectedSpecialty).toBe(specialty.name)
    expect(wrapper.vm.showSpecialtyDropdown).toBe(false)
    expect(wrapper.vm.searchQuery).toBe('')
  })

  it('should clear specialty correctly', () => {
    wrapper.vm.selectedSpecialty = 'Cardiologista Clínico'
    wrapper.vm.clearSpecialty()
    
    expect(wrapper.vm.selectedSpecialty).toBe('')
  })

  it('should select doctor correctly', () => {
    const doctor = wrapper.vm.doctors[0]
    wrapper.vm.selectDoctor(doctor)
    
    expect(wrapper.vm.selectedDoctor).toEqual(doctor)
  })

  it('should call search method', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    
    wrapper.vm.search()
    
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('should validate doctor selection before scheduling', async () => {
    wrapper.vm.selectedDoctor = null
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    wrapper.vm.scheduleConsultation()
    
    expect(alertSpy).toHaveBeenCalled()
    alertSpy.mockRestore()
  })

  it('should navigate when doctor is selected and schedule is called', async () => {
    const doctor = wrapper.vm.doctors[0]
    wrapper.vm.selectedDoctor = doctor
    
    const routerPushSpy = vi.spyOn(wrapper.vm.router, 'push')
    
    wrapper.vm.scheduleConsultation()
    
    expect(routerPushSpy).toHaveBeenCalledWith('/schedule-consultation')
    routerPushSpy.mockRestore()
  })

  it('should have component name', () => {
    expect(wrapper.vm.$options.name).toBe('DoctorFilter')
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
