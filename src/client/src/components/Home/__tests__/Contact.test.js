import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Contact from '../Contact.vue'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      homeContact: {
        question: 'Have any questions?',
        description: 'Feel free to contact us',
        contactButton: 'Contact Us',
        additionalContacts: 'Additional Contacts',
        phone: 'Phone: (81) 9999-9999',
        email: 'Email: contact at clinic dot com'
      }
    }
  }
})

describe('Contact Component', () => {
  it('should render contact section correctly', () => {
    const wrapper = mount(Contact, {
      global: {
        plugins: [i18n],
        stubs: {
          iframe: true
        }
      }
    })
    
    expect(wrapper.find('.home-contact-container').exists()).toBe(true)
  })

  it('should display contact info wrapper', () => {
    const wrapper = mount(Contact, {
      global: {
        plugins: [i18n],
        stubs: {
          iframe: true
        }
      }
    })
    
    expect(wrapper.find('.contact-info-wrapper').exists()).toBe(true)
  })

  it('should display contact button', () => {
    const wrapper = mount(Contact, {
      global: {
        plugins: [i18n],
        stubs: {
          iframe: true
        }
      }
    })
    
    const button = wrapper.find('.contact-button')
    expect(button.exists()).toBe(true)
  })

  it('should display map wrapper', () => {
    const wrapper = mount(Contact, {
      global: {
        plugins: [i18n],
        stubs: {
          iframe: true
        }
      }
    })
    
    expect(wrapper.find('.map-wrapper').exists()).toBe(true)
  })

  it('should display contact details', () => {
    const wrapper = mount(Contact, {
      global: {
        plugins: [i18n],
        stubs: {
          iframe: true
        }
      }
    })
    
    const details = wrapper.find('.contact-details')
    expect(details.exists()).toBe(true)
  })

  it('should use i18n translations', () => {
    const wrapper = mount(Contact, {
      global: {
        plugins: [i18n],
        stubs: {
          iframe: true
        }
      }
    })
    
    expect(wrapper.vm.t).toBeDefined()
  })

  it('should have component name', () => {
    const wrapper = mount(Contact, {
      global: {
        plugins: [i18n],
        stubs: {
          iframe: true
        }
      }
    })
    
    expect(wrapper.vm.$options.name).toBe('Contact')
  })

  it('should match snapshot', () => {
    const wrapper = mount(Contact, {
      global: {
        plugins: [i18n],
        stubs: {
          iframe: true
        }
      }
    })
    
    expect(wrapper.html()).toMatchSnapshot()
  })
})
