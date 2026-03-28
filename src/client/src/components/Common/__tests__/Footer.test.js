import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from '../Footer.vue'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      homeFooter: {
        copyright: 'Copyright © {year} Clinica Vitalis. All rights reserved.',
        privacyNotice: 'Privacy Notice',
        cookieNotice: 'Cookie Notice'
      }
    }
  }
})

describe('Footer Component', () => {
  it('should render footer correctly', () => {
    const wrapper = mount(Footer, {
      global: {
        plugins: [i18n]
      }
    })
    
    expect(wrapper.find('.footer').exists()).toBe(true)
    expect(wrapper.find('.footer-container').exists()).toBe(true)
  })

  it('should display current year in copyright', () => {
    const wrapper = mount(Footer, {
      global: {
        plugins: [i18n]
      }
    })
    
    const currentYear = new Date().getFullYear()
    expect(wrapper.vm.currentYear).toBe(currentYear)
  })

  it('should display footer links', () => {
    const wrapper = mount(Footer, {
      global: {
        plugins: [i18n]
      }
    })
    
    const links = wrapper.findAll('.footer-links a')
    expect(links.length).toBe(2)
  })

  it('should match snapshot', () => {
    const wrapper = mount(Footer, {
      global: {
        plugins: [i18n]
      }
    })
    
    expect(wrapper.html()).toMatchSnapshot()
  })
})
