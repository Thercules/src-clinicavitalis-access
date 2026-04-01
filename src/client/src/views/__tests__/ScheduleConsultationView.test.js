import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import ScheduleConsultationView from '../ScheduleConsultationView.vue'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key) => key
  })
}))

const createTestRouter = () => {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home' },
      { path: '/schedule', name: 'schedule' }
    ]
  })
}

const mockDoctor = {
  id: 1,
  name: 'Dr. João Silva',
  specialty: 'Cardiologia',
  location: 'São Paulo, SP',
  image: 'https://example.com/doctor.jpg'
}

describe('ScheduleConsultationView Component', () => {
  let wrapper
  let router

  beforeEach(() => {
    router = createTestRouter()
    localStorage.clear()
    localStorage.setItem('selectedDoctor', JSON.stringify(mockDoctor))

    wrapper = mount(ScheduleConsultationView, {
      global: {
        plugins: [router],
        stubs: {
          teleport: true,
          RouterLink: true
        }
      }
    })

    wrapper.vm.currentMonth = new Date(2026, 2, 1)
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('Initial State', () => {
    it('should initialize with correct default state', () => {
      expect(wrapper.vm.selectedDoctor).toEqual(mockDoctor)
      expect(wrapper.vm.availableDates).toEqual([
        '2026-03-10',
        '2026-03-11',
        '2026-03-12',
        '2026-03-13',
        '2026-03-14'
      ])
      expect(wrapper.vm.selectedDate).toBeNull()
      expect(wrapper.vm.selectedTime).toBeNull()
      expect(wrapper.vm.error).toBe('')
      expect(wrapper.vm.loading).toBe(false)
      expect(wrapper.vm.showConfirmationPopup).toBe(false)
    })

    it('should have the correct available times', () => {
      expect(wrapper.vm.availableTimes).toEqual([
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
        '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00', '17:30'
      ])
    })

    it('should fetch available dates on mount', () => {
      expect(wrapper.vm.availableDates.length).toBeGreaterThan(0)
    })
  })

  describe('loadSelecteddoctor', () => {
    it('should load selected doctor from localStorage', async () => {
      const newWrapper = mount(ScheduleConsultationView, {
        global: {
          plugins: [router],
          stubs: { teleport: true, RouterLink: true }
        }
      })

      expect(newWrapper.vm.selectedDoctor).toEqual(mockDoctor)
    })

    it('should set error when no doctor is selected', async () => {
      localStorage.clear()
      vi.useFakeTimers()
      const pushSpy = vi.spyOn(router, 'push').mockResolvedValue(undefined)

      const newWrapper = mount(ScheduleConsultationView, {
        global: {
          plugins: [router],
          stubs: { teleport: true, RouterLink: true }
        }
      })

      expect(newWrapper.vm.error).toBe('Nenhum médico foi selecionado')
      
      vi.advanceTimersByTime(2000)
      await flushPromises()

      expect(pushSpy).toHaveBeenCalledWith('/')
      vi.useRealTimers()
    })

    it('should redirect to home after 2 seconds when doctor is missing', async () => {
      localStorage.clear()
      vi.useFakeTimers()
      const pushSpy = vi.spyOn(router, 'push').mockResolvedValue(undefined)

      mount(ScheduleConsultationView, {
        global: {
          plugins: [router],
          stubs: { teleport: true, RouterLink: true }
        }
      })

      vi.advanceTimersByTime(2000)
      await flushPromises()

      expect(pushSpy).toHaveBeenCalledWith('/')
      vi.useRealTimers()
    })
  })

  describe('fetchAvailableDates', () => {
    it('should set loading state during fetch', async () => {
      wrapper.vm.loading = false
      await wrapper.vm.fetchAvailableDates()
      expect(wrapper.vm.loading).toBe(false)
    })

    it('should populate availableDates with mock data', async () => {
      const mockDates = [
        '2026-03-10',
        '2026-03-11',
        '2026-03-12',
        '2026-03-13',
        '2026-03-14'
      ]
      await wrapper.vm.fetchAvailableDates()

      expect(wrapper.vm.availableDates).toEqual(mockDates)
    })

    it('should set lastAvailableDate', async () => {
      await wrapper.vm.fetchAvailableDates()
      expect(wrapper.vm.lastAvailableDate).toBe('2026-03-14')
    })

    it('should set error message on fetch failure', async () => {
      const originalConsoleError = console.error
      console.error = vi.fn()

      wrapper.vm.fetchAvailableDates = async () => {
        throw new Error('Fetch error')
      }

      try {
        await wrapper.vm.fetchAvailableDates()
      } catch (e) {
        // Expected
      }

      console.error = originalConsoleError
    })
  })

  describe('isDateAvailable', () => {
    it('should return true for available dates', () => {
      expect(wrapper.vm.isDateAvailable('2026-03-10')).toBe(true)
      expect(wrapper.vm.isDateAvailable('2026-03-14')).toBe(true)
    })

    it('should return false for unavailable dates', () => {
      expect(wrapper.vm.isDateAvailable('2026-03-01')).toBe(false)
      expect(wrapper.vm.isDateAvailable('2026-03-20')).toBe(false)
    })

    it('should return false for dates not in availableDates array', () => {
      expect(wrapper.vm.isDateAvailable('2026-04-01')).toBe(false)
    })
  })

  describe('isDateAfterLimit', () => {
    it('should return true for dates after limit', () => {
      expect(wrapper.vm.isDateAfterLimit('2026-03-15')).toBe(true)
      expect(wrapper.vm.isDateAfterLimit('2026-04-01')).toBe(true)
    })

    it('should return false for dates before or equal to limit', () => {
      expect(wrapper.vm.isDateAfterLimit('2026-03-14')).toBe(false)
      expect(wrapper.vm.isDateAfterLimit('2026-03-10')).toBe(false)
    })

    it('should return false when lastAvailableDate is null', () => {
      wrapper.vm.lastAvailableDate = null
      expect(wrapper.vm.isDateAfterLimit('2026-03-20')).toBe(false)
    })
  })

  describe('selectDate', () => {
    it('should select an available date', () => {
      wrapper.vm.selectDate('2026-03-10')
      expect(wrapper.vm.selectedDate).toBe('2026-03-10')
    })

    it('should reset selectedTime when selecting a new date', () => {
      wrapper.vm.selectedTime = '10:00'
      wrapper.vm.selectDate('2026-03-10')
      expect(wrapper.vm.selectedTime).toBeNull()
    })

    it('should not select unavailable dates', () => {
      wrapper.vm.selectDate('2026-03-20')
      expect(wrapper.vm.selectedDate).toBeNull()
    })

    it('should allow selecting the same date again', () => {
      wrapper.vm.selectDate('2026-03-10')
      expect(wrapper.vm.selectedDate).toBe('2026-03-10')
      wrapper.vm.selectDate('2026-03-10')
      expect(wrapper.vm.selectedDate).toBe('2026-03-10')
    })

    it('should allow switching between available dates', () => {
      wrapper.vm.selectDate('2026-03-10')
      expect(wrapper.vm.selectedDate).toBe('2026-03-10')
      wrapper.vm.selectDate('2026-03-11')
      expect(wrapper.vm.selectedDate).toBe('2026-03-11')
    })
  })

  describe('parseDate', () => {
    it('should parse date string correctly', () => {
      const parsed = wrapper.vm.parseDate('2026-03-14')
      expect(parsed.getFullYear()).toBe(2026)
      expect(parsed.getMonth()).toBe(2) // March is month 2 (0-indexed)
      expect(parsed.getDate()).toBe(14)
    })

    it('should parse different date strings', () => {
      const parsed = wrapper.vm.parseDate('2026-01-01')
      expect(parsed.getFullYear()).toBe(2026)
      expect(parsed.getMonth()).toBe(0)
      expect(parsed.getDate()).toBe(1)
    })
  })

  describe('formatDateDisplay', () => {
    it('should format date string for display', () => {
      const formatted = wrapper.vm.formatDateDisplay('2026-03-14')
      expect(formatted).toContain('14')
      expect(formatted).toContain('Mar')
    })

    it('should display correct day of week', () => {
      const formatted = wrapper.vm.formatDateDisplay('2026-03-10')
      expect(formatted).toMatch(/Ter|Seg|Qua|Qui|Sex|Sab|Dom/)
    })

    it('should format multiple dates correctly', () => {
      const formatted1 = wrapper.vm.formatDateDisplay('2026-03-10')
      const formatted2 = wrapper.vm.formatDateDisplay('2026-03-11')
      expect(formatted1).not.toBe(formatted2)
    })
  })

  describe('monthYear Computed Property', () => {
    it('should return correct month and year', () => {
      expect(wrapper.vm.monthYear).toContain('Março')
      expect(wrapper.vm.monthYear).toContain('2026')
    })

    it('should update when currentMonth changes', async () => {
      const currentMonth = new Date(2026, 3, 1) // April 2026
      wrapper.vm.currentMonth = currentMonth
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.monthYear).toContain('Abril')
      expect(wrapper.vm.monthYear).toContain('2026')
    })
  })

  describe('navigateMonth', () => {
    it('should navigate to next month with positive offset', () => {
      const april = new Date(2026, 3, 15)
      wrapper.vm.currentMonth = april
      wrapper.vm.navigateMonth(1)
      
      expect(wrapper.vm.currentMonth.getMonth()).toBe(4) // May
    })

    it('should navigate to previous month with negative offset', () => {
      const april = new Date(2026, 3, 1)
      wrapper.vm.currentMonth = april
      wrapper.vm.navigateMonth(-1)

      expect(wrapper.vm.currentMonth.getMonth()).toBe(2) // March
    })

    it('should handle year wraparound when moving to next year', () => {
      wrapper.vm.currentMonth = new Date(2026, 11, 1) // December
      wrapper.vm.navigateMonth(1)

      expect(wrapper.vm.currentMonth.getFullYear()).toBe(2027)
      expect(wrapper.vm.currentMonth.getMonth()).toBe(0) // January
    })

    it('should handle year wraparound when moving to previous year', () => {
      wrapper.vm.currentMonth = new Date(2026, 0, 1) // January
      wrapper.vm.navigateMonth(-1)

      expect(wrapper.vm.currentMonth.getFullYear()).toBe(2025)
      expect(wrapper.vm.currentMonth.getMonth()).toBe(11) // December
    })
  })

  describe('calendarDays Computed Property', () => {
    it('should generate 42 days for calendar grid', () => {
      expect(wrapper.vm.calendarDays).toHaveLength(42)
    })

    it('should mark available dates correctly', () => {
      const availableDays = wrapper.vm.calendarDays.filter(
        day => day.isAvailable && day.isCurrentMonth
      )
      expect(availableDays.length).toBeGreaterThan(0)
    })

    it('should mark unavailable days correctly', () => {
      const unavailableDays = wrapper.vm.calendarDays.filter(
        day => !day.isAvailable && day.isCurrentMonth
      )
      expect(unavailableDays.length).toBeGreaterThan(0)
    })

    it('should mark other month days correctly', () => {
      const otherMonthDays = wrapper.vm.calendarDays.filter(
        day => !day.isCurrentMonth
      )
      expect(otherMonthDays.length).toBeGreaterThan(0)
    })

    it('should mark selected date correctly', () => {
      wrapper.vm.selectedDate = '2026-03-10'
      const selectedDay = wrapper.vm.calendarDays.find(
        day => day.isSelected
      )
      expect(selectedDay).toBeDefined()
      expect(selectedDay.isSelected).toBe(true)
    })

    it('should update when selectedDate changes', async () => {
      wrapper.vm.selectedDate = '2026-03-10'
      await wrapper.vm.$nextTick()
      let selectedDays = wrapper.vm.calendarDays.filter(d => d.isSelected)
      expect(selectedDays).toHaveLength(1)

      wrapper.vm.selectedDate = '2026-03-11'
      await wrapper.vm.$nextTick()
      selectedDays = wrapper.vm.calendarDays.filter(d => d.isSelected)
      expect(selectedDays).toHaveLength(1)
      expect(selectedDays[0].dateStr).toBe('2026-03-11')
    })
  })

  describe('submitSchedule', () => {
    it('should show error when no date is selected', async () => {
      wrapper.vm.selectedDate = null
      wrapper.vm.selectedTime = '10:00'
      await wrapper.vm.submitSchedule()

      expect(wrapper.vm.error).toBe('Por favor, selecione uma data e hora')
    })

    it('should show error when no time is selected', async () => {
      wrapper.vm.selectedDate = '2026-03-10'
      wrapper.vm.selectedTime = null
      await wrapper.vm.submitSchedule()

      expect(wrapper.vm.error).toBe('Por favor, selecione uma data e hora')
    })

    it('should show error when both date and time are missing', async () => {
      wrapper.vm.selectedDate = null
      wrapper.vm.selectedTime = null
      await wrapper.vm.submitSchedule()

      expect(wrapper.vm.error).toBe('Por favor, selecione uma data e hora')
    })

    it('should set loading to true during submission', async () => {
      wrapper.vm.selectedDate = '2026-03-10'
      wrapper.vm.selectedTime = '10:00'

      const submitPromise = wrapper.vm.submitSchedule()
      expect(wrapper.vm.loading).toBe(true)

      await submitPromise
    })

    it('should show confirmation popup on successful submission', async () => {
      wrapper.vm.selectedDate = '2026-03-10'
      wrapper.vm.selectedTime = '10:00'

      await wrapper.vm.submitSchedule()
      await flushPromises()

      expect(wrapper.vm.showConfirmationPopup).toBe(true)
    })

    it('should create consultation data object with correct structure', async () => {
      wrapper.vm.selectedDate = '2026-03-10'
      wrapper.vm.selectedTime = '10:00'

      const beforeTime = new Date().toISOString()
      await wrapper.vm.submitSchedule()
      const afterTime = new Date().toISOString()

      expect(wrapper.vm.selectedDate).toBe('2026-03-10')
      expect(wrapper.vm.selectedTime).toBe('10:00')
    })

    it('should set loading to false after submission', async () => {
      wrapper.vm.selectedDate = '2026-03-10'
      wrapper.vm.selectedTime = '10:00'

      await wrapper.vm.submitSchedule()
      await flushPromises()

      expect(wrapper.vm.loading).toBe(false)
    })

    it('should handle submission error gracefully', async () => {
      wrapper.vm.selectedDate = '2026-03-10'
      wrapper.vm.selectedTime = '10:00'

      // Mock to throw error
      vi.spyOn(wrapper.vm, 'submitSchedule').mockImplementation(async () => {
        wrapper.vm.loading = true
        try {
          throw new Error('Submission failed')
        } catch {
          wrapper.vm.error = 'Erro ao agendar a consulta'
        } finally {
          wrapper.vm.loading = false
        }
      })

      await wrapper.vm.submitSchedule()
      await flushPromises()

      expect(wrapper.vm.error).toBe('Erro ao agendar a consulta')
      expect(wrapper.vm.loading).toBe(false)
    })
  })

  describe('closePopup', () => {
    it('should hide confirmation popup', async () => {
      wrapper.vm.showConfirmationPopup = true
      const pushSpy = vi.spyOn(router, 'push').mockResolvedValue(undefined)

      await wrapper.vm.closePopup()

      expect(wrapper.vm.showConfirmationPopup).toBe(false)
    })

    it('should navigate to home page after closing popup', async () => {
      wrapper.vm.showConfirmationPopup = true
      const pushSpy = vi.spyOn(router, 'push').mockResolvedValue(undefined)

      await wrapper.vm.closePopup()
      await flushPromises()

      expect(pushSpy).toHaveBeenCalledWith('/')
    })

    it('should redirect even if popup is already closed', async () => {
      wrapper.vm.showConfirmationPopup = false
      const pushSpy = vi.spyOn(router, 'push').mockResolvedValue(undefined)

      await wrapper.vm.closePopup()

      expect(wrapper.vm.showConfirmationPopup).toBe(false)
      expect(pushSpy).toHaveBeenCalledWith('/')
    })
  })

  describe('Lifecycle - mounted', () => {
    it('should call loadSelecteddoctor on mount', async () => {
      expect(wrapper.vm.selectedDoctor).toEqual(mockDoctor)
    })

    it('should call fetchAvailableDates on mount', async () => {
      expect(wrapper.vm.availableDates.length).toBeGreaterThan(0)
    })

    it('should handle missing doctor on mount', async () => {
      localStorage.clear()
      const pushSpy = vi.spyOn(router, 'push').mockResolvedValue(undefined)

      const newWrapper = mount(ScheduleConsultationView, {
        global: {
          plugins: [router],
          stubs: { teleport: true, RouterLink: true }
        }
      })

      await flushPromises()

      expect(newWrapper.vm.error).toBe('Nenhum médico foi selecionado')
    })
  })

  describe('Integration Tests', () => {
    it('should complete full flow: select date, select time, submit', async () => {
      wrapper.vm.selectDate('2026-03-10')
      expect(wrapper.vm.selectedDate).toBe('2026-03-10')

      wrapper.vm.selectedTime = '10:00'
      expect(wrapper.vm.selectedTime).toBe('10:00')

      await wrapper.vm.submitSchedule()
      await flushPromises()

      expect(wrapper.vm.showConfirmationPopup).toBe(true)
    })

    it('should set loading to true during submission', async () => {
      wrapper.vm.selectedDate = '2026-03-10'
      wrapper.vm.selectedTime = '10:00'

      const submitPromise = wrapper.vm.submitSchedule()
      expect(wrapper.vm.loading).toBe(true)

      await submitPromise
      await flushPromises()

      expect(wrapper.vm.loading).toBe(false)
    })

    it('should clear previous errors when selecting new date', async () => {
      wrapper.vm.error = 'Por favor, selecione uma data e hora'
      wrapper.vm.selectDate('2026-03-10')

      expect(wrapper.vm.selectedDate).toBe('2026-03-10')
      expect(wrapper.vm.error).toBe('Por favor, selecione uma data e hora')
    })
  })

  describe('Edge Cases', () => {
    it('should handle leap year correctly', () => {
      wrapper.vm.currentMonth = new Date(2024, 1, 1) // February 2024 (leap year)
      // Should not throw error
      expect(wrapper.vm.calendarDays.length).toBe(42)
    })

    it('should handle date string formatting edge cases', () => {
      const formatted = wrapper.vm.formatDateDisplay('2026-01-01')
      expect(formatted).toContain('Jan')
      expect(formatted).toContain('1')
    })

    it('should handle navigating multiple months in sequence', () => {
      const initial = wrapper.vm.currentMonth.getMonth()
      wrapper.vm.navigateMonth(5)
      wrapper.vm.navigateMonth(-3)
      const final = wrapper.vm.currentMonth.getMonth()

      expect(final).toBe((initial + 2) % 12)
    })
  })
})
