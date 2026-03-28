import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SubText from '../SubText.vue'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      homeSubText: {
        title: 'Welcome to',
        highlight: 'Clinica Vitalis',
        description: 'We provide the best healthcare services for your family.'
      }
    }
  }
})

describe('SubText Component', () => {
  it('should render subtext correctly', () => {
    const wrapper = mount(SubText, {
      global: {
        plugins: [i18n]
      }
    })
    
    expect(wrapper.find('.home-subtext-container').exists()).toBe(true)
  })

  it('should display title with highlight', () => {
    const wrapper = mount(SubText, {
      global: {
        plugins: [i18n]
      }
    })
    
    expect(wrapper.find('.home-subtext-highlight').exists()).toBe(true)
  })

  it('should display description', () => {
    const wrapper = mount(SubText, {
      global: {
        plugins: [i18n]
      }
    })
    
    const description = wrapper.find('.home-subtext-description-wrapper')
    expect(description.exists()).toBe(true)
  })

  it('should use i18n translations', () => {
    const wrapper = mount(SubText, {
      global: {
        plugins: [i18n]
      }
    })
    
    expect(wrapper.vm.t).toBeDefined()
  })

  it('should have component name', () => {
    const wrapper = mount(SubText, {
      global: {
        plugins: [i18n]
      }
    })
    
    expect(wrapper.vm.$options.name).toBe('SubText')
  })

  it('should match snapshot', () => {
    const wrapper = mount(SubText, {
      global: {
        plugins: [i18n]
      }
    })
    
    expect(wrapper.html()).toMatchSnapshot()
  })
})
