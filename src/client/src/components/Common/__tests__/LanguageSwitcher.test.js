import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import LanguageSwitcher from '../../Common/LanguageSwitcher.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  messages: {
    'pt-BR': { message: 'Português' },
    'en': { message: 'English' }
  }
})

describe('LanguageSwitcher Component', () => {
  let wrapper

  beforeEach(() => {
    localStorage.clear()
    wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [i18n]
      }
    })
  })

  it('should render language buttons', () => {
    const buttons = wrapper.findAll('.lang-btn')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toContain('PT')
    expect(buttons[1].text()).toContain('EN')
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have pt-BR as active initially', () => {
    const buttons = wrapper.findAll('.lang-btn')
    expect(buttons[0].classes()).toContain('active')
    expect(buttons[1].classes()).not.toContain('active')
  })

  it('should change language to EN', async () => {
    const enButton = wrapper.findAll('.lang-btn')[1]
    
    await enButton.trigger('click')
    
    expect(wrapper.vm.locale).toBe('en')
    expect(localStorage.getItem('locale')).toBe('en')
  })

  it('should change language to pt-BR', async () => {
    // First set to EN
    const enButton = wrapper.findAll('.lang-btn')[1]
    await enButton.trigger('click')
    
    // Then change back to pt-BR
    const ptButton = wrapper.findAll('.lang-btn')[0]
    await ptButton.trigger('click')
    
    expect(wrapper.vm.locale).toBe('pt-BR')
    expect(localStorage.getItem('locale')).toBe('pt-BR')
  })

  it('should update active class when language changes', async () => {
    const buttons = wrapper.findAll('.lang-btn')
    
    expect(buttons[0].classes()).toContain('active')
    expect(buttons[1].classes()).not.toContain('active')
    
    await buttons[1].trigger('click')
    
    expect(buttons[0].classes()).not.toContain('active')
    expect(buttons[1].classes()).toContain('active')
  })
})
