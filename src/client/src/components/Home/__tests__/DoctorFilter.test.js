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

  it('should have correct data for doctor 1 (Feminino)', () => {
    const d = wrapper.vm.doctors[0]
    expect(d.id).toBe(1)
    expect(d.name).toBe('Adélia Maria Guedes Neta')
    expect(d.specialty).toBe('Clínico Geral')
    expect(d.location).toBe('Olinda')
    expect(d.gender).toBe('Feminino')
    expect(d.image).toMatch(/^https:/)
  })

  it('should have correct genders for all 8 doctors', () => {
    const doctors = wrapper.vm.doctors
    expect(doctors[0].gender).toBe('Feminino')
    expect(doctors[1].gender).toBe('Masculino')
    expect(doctors[2].gender).toBe('Masculino')
    expect(doctors[3].gender).toBe('Masculino')
    expect(doctors[4].gender).toBe('Masculino')
    expect(doctors[5].gender).toBe('Masculino')
    expect(doctors[6].gender).toBe('Masculino')
    expect(doctors[7].gender).toBe('Masculino')
  })

  it('should have correct complete data for doctor 5 (Cardiologista Clínico)', () => {
    const d = wrapper.vm.doctors[4]
    expect(d.id).toBe(5)
    expect(d.name).toBe('Adriano Tomas Pataca')
    expect(d.specialty).toBe('Cardiologista Clínico')
    expect(d.location).toBe('Olinda')
    expect(d.gender).toBe('Masculino')
    expect(d.image).toMatch(/^https:/)
  })

  it('should have correct complete data for doctor 6 (Cardiologista Clínico)', () => {
    const d = wrapper.vm.doctors[5]
    expect(d.id).toBe(6)
    expect(d.name).toBe('Afonso Celso Pereira')
    expect(d.specialty).toBe('Cardiologista Clínico')
    expect(d.location).toBe('Olinda')
    expect(d.gender).toBe('Masculino')
    expect(d.image).toMatch(/^https:/)
  })

  it('should have valid images for all doctors', () => {
    wrapper.vm.doctors.forEach(d => {
      expect(d.image).toBeTruthy()
      expect(d.image).toMatch(/^https:/)
    })
  })

  it('should filter only Feminino doctors when gender is Feminino', () => {
    wrapper.vm.selectedGender = 'Feminino'
    wrapper.vm.selectedSpecialty = ''
    wrapper.vm.selectedLocation = ''
    const filtered = wrapper.vm.filteredDoctors
    expect(filtered.length).toBeGreaterThan(0)
    filtered.forEach(d => expect(d.gender).toBe('Feminino'))
  })

  it('should exclude Feminino doctors when filtering by Masculino', () => {
    wrapper.vm.selectedGender = 'Masculino'
    wrapper.vm.selectedSpecialty = ''
    wrapper.vm.selectedLocation = ''
    const filtered = wrapper.vm.filteredDoctors
    filtered.forEach(d => expect(d.gender).not.toBe('Feminino'))
  })

  it('should return all specialties when searchQuery is empty', () => {
    wrapper.vm.searchQuery = ''
    expect(wrapper.vm.filteredSpecialties).toHaveLength(wrapper.vm.specialties.length)
  })

  it('should filter specialties case-insensitively with uppercase query', () => {
    wrapper.vm.searchQuery = 'CIRURGIÃO'
    const filtered = wrapper.vm.filteredSpecialties
    expect(filtered.length).toBeGreaterThan(0)
    filtered.forEach(s => expect(s.name.toLowerCase()).toContain('cirurgião'))
  })

  it('should filter specialties case-insensitively with lowercase query', () => {
    wrapper.vm.searchQuery = 'clínico'
    const filtered = wrapper.vm.filteredSpecialties
    expect(filtered.length).toBeGreaterThan(0)
    filtered.forEach(s => expect(s.name.toLowerCase()).toContain('clínico'))
  })

  it('should return no specialties for unmatched search query', () => {
    wrapper.vm.searchQuery = 'XXXNONEXISTENT999'
    expect(wrapper.vm.filteredSpecialties).toHaveLength(0)
  })

  it('should clear searchQuery after selectSpecialty', () => {
    wrapper.vm.searchQuery = 'Clínico'
    wrapper.vm.selectSpecialty(wrapper.vm.specialties[0])
    expect(wrapper.vm.searchQuery).toBe('')
  })

  it('should set showSpecialtyDropdown to false after selectSpecialty', () => {
    wrapper.vm.showSpecialtyDropdown = true
    wrapper.vm.selectSpecialty(wrapper.vm.specialties[0])
    expect(wrapper.vm.showSpecialtyDropdown).toBe(false)
  })

  it('should alert with exact message when no doctor is selected', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    wrapper.vm.selectedDoctor = null
    wrapper.vm.scheduleConsultation()
    expect(alertSpy).toHaveBeenCalledWith('Por favor, selecione um médico primeiro')
    alertSpy.mockRestore()
  })

  it('should save to localStorage with key selectedDoctor', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
    const doctor = wrapper.vm.doctors[0]
    wrapper.vm.selectedDoctor = doctor
    wrapper.vm.scheduleConsultation()
    expect(setItemSpy).toHaveBeenCalledWith('selectedDoctor', JSON.stringify(doctor))
    setItemSpy.mockRestore()
  })

  it('should log correct message with correct properties in search', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    wrapper.vm.selectedSpecialty = 'Cardiologista Clínico'
    wrapper.vm.selectedLocation = 'Olinda'
    wrapper.vm.selectedGender = 'Feminino'
    wrapper.vm.search()
    expect(consoleSpy).toHaveBeenCalledWith('Buscando doutores:', {
      especialidade: 'Cardiologista Clínico',
      localizacao: 'Olinda',
      genero: 'Feminino'
    })
    consoleSpy.mockRestore()
  })
})
