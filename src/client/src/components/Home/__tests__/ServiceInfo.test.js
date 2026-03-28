import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ServiceInfo from '../ServiceInfo.vue'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      serviceInfo: {
        scheduleButton: 'Schedule',
        whatsappButton: 'WhatsApp'
      }
    }
  }
})

const mockService = {
  title: 'Test Service',
  subtitle: 'Test Subtitle',
  description: 'Test Description',
  image: 'https://i.ibb.co/test.jpg'
}

describe('ServiceInfo Component', () => {
  it('should render service info modal when visible', async () => {
    const wrapper = mount(ServiceInfo, {
      props: {
        service: mockService
      },
      global: {
        plugins: [i18n]
      }
    })
    
    wrapper.vm.isVisible = true
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('.service-info-overlay').exists()).toBe(true)
  })

  it('should not render service info modal when not visible', () => {
    const wrapper = mount(ServiceInfo, {
      props: {
        service: mockService
      },
      global: {
        plugins: [i18n]
      }
    })
    
    expect(wrapper.find('.service-info-overlay').exists()).toBe(false)
  })

  it('should display service title', async () => {
    const wrapper = mount(ServiceInfo, {
      props: {
        service: mockService
      },
      global: {
        plugins: [i18n]
      }
    })
    
    wrapper.vm.show()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.text()).toContain('Test Service')
  })

  it('should display service description', async () => {
    const wrapper = mount(ServiceInfo, {
      props: {
        service: mockService
      },
      global: {
        plugins: [i18n]
      }
    })
    
    wrapper.vm.show()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.text()).toContain('Test Description')
  })

  it('should close modal when close button is clicked', async () => {
    const wrapper = mount(ServiceInfo, {
      props: {
        service: mockService
      },
      global: {
        plugins: [i18n]
      }
    })
    
    wrapper.vm.show()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.isVisible).toBe(true)
    
    await wrapper.find('.close-btn').trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.isVisible).toBe(false)
  })

  it('should have show and close methods', () => {
    const wrapper = mount(ServiceInfo, {
      props: {
        service: mockService
      },
      global: {
        plugins: [i18n]
      }
    })
    
    expect(wrapper.vm.show).toBeDefined()
    expect(wrapper.vm.close).toBeDefined()
  })

  it('should display action buttons', async () => {
    const wrapper = mount(ServiceInfo, {
      props: {
        service: mockService
      },
      global: {
        plugins: [i18n]
      }
    })
    
    wrapper.vm.show()
    await wrapper.vm.$nextTick()
    
    const buttons = wrapper.findAll('.btn')
    expect(buttons.length).toBe(2)
  })

  it('should have component name', () => {
    const wrapper = mount(ServiceInfo, {
      props: {
        service: mockService
      },
      global: {
        plugins: [i18n]
      }
    })
    
    expect(wrapper.vm.$options.name).toBe('ServiceInfo')
  })

  it('should match snapshot when visible', async () => {
    const wrapper = mount(ServiceInfo, {
      props: {
        service: mockService
      },
      global: {
        plugins: [i18n]
      }
    })
    
    wrapper.vm.show()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.html()).toMatchSnapshot()
  })
})
