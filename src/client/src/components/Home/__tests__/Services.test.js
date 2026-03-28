import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Services from '../Services.vue'
import ServiceInfo from '../ServiceInfo.vue'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      homeServices: {
        title: 'Our Services',
        subtitle: 'We provide various services'
      },
      serviceInfo: {
        scheduleButton: 'Schedule',
        whatsappButton: 'WhatsApp'
      }
    }
  }
})

describe('Services Component', () => {
  it('should render services section correctly', () => {
    const wrapper = mount(Services, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true,
          ServiceInfo: true
        }
      }
    })
    
    expect(wrapper.find('.home-services-container').exists()).toBe(true)
  })

  it('should display services header', () => {
    const wrapper = mount(Services, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true,
          ServiceInfo: true
        }
      }
    })
    
    expect(wrapper.find('.home-services-header').exists()).toBe(true)
  })

  it('should have correct number of services', () => {
    const wrapper = mount(Services, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true,
          ServiceInfo: true
        }
      }
    })
    
    expect(wrapper.vm.homeServicesList.length).toBe(5)
  })

  it('should have carousel component', () => {
    const wrapper = mount(Services, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true,
          ServiceInfo: true
        }
      }
    })
    
    expect(wrapper.findComponent({ name: 'Carousel' }).exists()).toBe(true)
  })

  it('should initialize with null selected service', () => {
    const wrapper = mount(Services, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true,
          ServiceInfo: true
        }
      }
    })
    
    expect(wrapper.vm.selectedService).toBeNull()
  })

  it('should update selected service when openServiceInfo is called', async () => {
    const wrapper = mount(Services, {
      global: {
        plugins: [i18n],
        components: {
          ServiceInfo
        },
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true
        }
      }
    })
    
    const service = wrapper.vm.homeServicesList[0]
    wrapper.vm.openServiceInfo(service)
    
    expect(wrapper.vm.selectedService).not.toBeNull()
    expect(wrapper.vm.selectedService.title).toBe(service.serviceName)
  })

  it('should use i18n translations', () => {
    const wrapper = mount(Services, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true,
          ServiceInfo: true
        }
      }
    })
    
    expect(wrapper.vm.t).toBeDefined()
  })

  it('should have component name', () => {
    const wrapper = mount(Services, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true,
          ServiceInfo: true
        }
      }
    })
    
    expect(wrapper.vm.$options.name).toBe('Services')
  })

  it('should match snapshot', () => {
    const wrapper = mount(Services, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true,
          ServiceInfo: true
        }
      }
    })
    
    expect(wrapper.html()).toMatchSnapshot()
  })
})
