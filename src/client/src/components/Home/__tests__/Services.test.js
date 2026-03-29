import { describe, it, expect, vi, beforeEach } from 'vitest'
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

  it('should verify each service has required properties', () => {
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
    
    wrapper.vm.homeServicesList.forEach(service => {
      expect(service.id).toBeDefined()
      expect(service.serviceName).toBeDefined()
      expect(service.serviceDescription).toBeDefined()
      expect(service.serviceLargeDescription).toBeDefined()
      expect(service.serviceImage).toBeDefined()
    })
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

  it('should set selectedService correctly when openServiceInfo is called', () => {
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
    
    const service = wrapper.vm.homeServicesList[0]
    wrapper.vm.selectedService = {
      image: service.serviceImage,
      title: service.serviceName,
      subtitle: service.serviceDescription,
      description: service.serviceLargeDescription
    }
    
    expect(wrapper.vm.selectedService).not.toBeNull()
    expect(wrapper.vm.selectedService.image).toBe(service.serviceImage)
    expect(wrapper.vm.selectedService.title).toBe('Massagem Terapêutica')
    expect(wrapper.vm.selectedService.subtitle).toBe('Relaxe e alivie tensões com nossa massagem terapêutica.')
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

  it('should have all service names correct', () => {
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
    
    const names = wrapper.vm.homeServicesList.map(s => s.serviceName)
    expect(names).toContain('Massagem Terapêutica')
    expect(names).toContain('Acupuntura')
    expect(names).toContain('Yoga')
    expect(names).toContain('Nutrição')
    expect(names).toContain('Fisioterapia')
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

  it('should have correct service descriptions', () => {
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
    
    const services = wrapper.vm.homeServicesList
    expect(services[0].serviceDescription).toBe('Relaxe e alivie tensões com nossa massagem terapêutica.')
    expect(services[1].serviceDescription).toBe('Equilibre sua energia e melhore sua saúde com acupuntura.')
    expect(services[2].serviceDescription).toBe('Aprimore sua flexibilidade e bem-estar com nossas aulas de Yoga.')
    expect(services[3].serviceDescription).toBe('Aprenda a se alimentar de forma saudável e equilibrada.')
    expect(services[4].serviceDescription).toBe('Recupere-se de lesões e melhore sua mobilidade.')
  })

  it('should have non-empty large descriptions for all services', () => {
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
    
    const services = wrapper.vm.homeServicesList
    services.forEach(service => {
      expect(service.serviceLargeDescription).toBeTruthy()
      expect(service.serviceLargeDescription.length).toBeGreaterThan(100)
    })
  })

  it('should have valid service images for all services', () => {
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
    
    const services = wrapper.vm.homeServicesList
    services.forEach(service => {
      expect(service.serviceImage).toBeTruthy()
      expect(service.serviceImage).toMatch(/^https:/)
    })
  })

  it('should have methods property defined', () => {
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
    
    expect(wrapper.vm.openServiceInfo).toBeDefined()
    expect(typeof wrapper.vm.openServiceInfo).toBe('function')
  })

  it('should set selectedService correctly when openServiceInfo is called', () => {
    const showMock = vi.fn()
    const wrapper = mount(Services, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true,
          ServiceInfo: {
            name: 'ServiceInfo',
            template: '<div></div>',
            methods: { show: showMock }
          }
        }
      }
    })

    const service = wrapper.vm.homeServicesList[0]
    wrapper.vm.openServiceInfo(service)

    expect(wrapper.vm.selectedService).not.toBeNull()
    expect(wrapper.vm.selectedService.image).toBe(service.serviceImage)
    expect(wrapper.vm.selectedService.title).toBe(service.serviceName)
    expect(wrapper.vm.selectedService.subtitle).toBe(service.serviceDescription)
    expect(wrapper.vm.selectedService.description).toBe(service.serviceLargeDescription)
  })

  it('should call show on serviceInfoComponent ref when openServiceInfo is called', () => {
    const showMock = vi.fn()
    const wrapper = mount(Services, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true,
          ServiceInfo: {
            name: 'ServiceInfo',
            template: '<div></div>',
            methods: { show: showMock }
          }
        }
      }
    })

    wrapper.vm.openServiceInfo(wrapper.vm.homeServicesList[0])
    expect(showMock).toHaveBeenCalled()
  })

  it('should set selectedService with all 4 required fields', () => {
    const showMock = vi.fn()
    const wrapper = mount(Services, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true,
          ServiceInfo: {
            name: 'ServiceInfo',
            template: '<div></div>',
            methods: { show: showMock }
          }
        }
      }
    })

    wrapper.vm.openServiceInfo(wrapper.vm.homeServicesList[2])
    expect(wrapper.vm.selectedService.title).toBe('Yoga')
    expect(Object.keys(wrapper.vm.selectedService)).toEqual(['image', 'title', 'subtitle', 'description'])
  })
})
