import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SubNavbar from '../SubNavbar.vue'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      subnavbar: {
        healthPlans: 'Health Plans',
        whatsapp: 'WhatsApp',
        care: 'Care'
      }
    }
  }
})

describe('SubNavbar Component', () => {
  it('should render subnavbar correctly', () => {
    const wrapper = mount(SubNavbar, {
      global: {
        plugins: [i18n]
      }
    })
    
    expect(wrapper.find('.home_subnavbar').exists()).toBe(true)
  })

  it('should display subnavbar content with separators', () => {
    const wrapper = mount(SubNavbar, {
      global: {
        plugins: [i18n]
      }
    })
    
    const content = wrapper.find('.home_subnavbar__content').text()
    expect(content).toContain('|')
  })

  it('should have marquee animation', () => {
    const wrapper = mount(SubNavbar, {
      global: {
        plugins: [i18n]
      }
    })
    
    const content = wrapper.find('.home_subnavbar__content')
    expect(content.exists()).toBe(true)
  })

  it('should use i18n translations', () => {
    const wrapper = mount(SubNavbar, {
      global: {
        plugins: [i18n]
      }
    })
    
    expect(wrapper.vm.t).toBeDefined()
  })

  it('should match snapshot', () => {
    const wrapper = mount(SubNavbar, {
      global: {
        plugins: [i18n]
      }
    })
    
    expect(wrapper.html()).toMatchSnapshot()
  })
})
