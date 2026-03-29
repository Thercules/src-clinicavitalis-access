import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SubFooter from '../SubFooter.vue'
import { createI18n } from 'vue-i18n'

const createComprehensiveI18n = () => {
  return createI18n({
    legacy: false,
    locale: 'pt-BR',
    messages: {
      'pt-BR': {
        homeSubFooter: {
          logo: 'Clínica Vitallis',
          email: 'contato@clinicavitallis.com',
          contact: {
            dora: 'Dora',
            doraPhone: '(11) 99999-9999',
            central: 'Central',
            centralPhone: '(11) 88888-8888'
          },
          social: {
            facebook: 'Facebook',
            linkedin: 'LinkedIn',
            instagram: 'Instagram',
            twitter: 'Twitter',
            whatsapp: 'WhatsApp',
            youtube: 'YouTube'
          },
          menu: {
            home: {
              title: 'Início',
              items: ['Home', 'Sobre Nós']
            },
            exams: {
              title: 'Exames',
              items: ['Exame 1', 'Exame 2']
            },
            institutional: {
              title: 'Institucional',
              items: ['Item 1', 'Item 2']
            },
            specialties: {
              title: 'Especialidades',
              items: ['Dermatologia', 'Cardiologia']
            },
            partnerships: {
              title: 'Parcerias',
              items: ['Parceiro 1', 'Parceiro 2']
            },
            app: {
              title: 'App',
              items: ['App 1', 'App 2']
            },
            ombudsman: {
              title: 'Ombudsman',
              text: 'Ombudsman Text'
            },
            news: {
              title: 'Notícias',
              text: 'News Text'
            },
            press: {
              title: 'Imprensa',
              text: 'Press Text'
            },
            careers: {
              title: 'Carreiras',
              items: ['Vaga 1', 'Vaga 2']
            }
          }
        }
      }
    }
  })
}

describe('SubFooter Component', () => {
  let wrapper
  let i18n

  beforeEach(() => {
    i18n = createComprehensiveI18n()
    wrapper = mount(SubFooter, {
      global: {
        plugins: [i18n]
      }
    })
  })

  it('should render sub-footer container', () => {
    expect(wrapper.find('.sub-footer').exists()).toBe(true)
  })

  it('should have component name', () => {
    expect(SubFooter.name).toBe('SubFooter')
  })

  it('should have setup function defined', () => {
    expect(SubFooter.setup).toBeDefined()
    expect(typeof SubFooter.setup).toBe('function')
  })

  it('should have i18n integration', () => {
    expect(wrapper.vm.t).toBeDefined()
    expect(wrapper.vm.getItems).toBeDefined()
  })

  it('should display footer logo', () => {
    expect(wrapper.text()).toContain('Clínica Vitallis')
  })

  it('should display contact information', () => {
    expect(wrapper.text()).toContain('(11) 99999-9999')
    expect(wrapper.text()).toContain('(11) 88888-8888')
  })

  it('should have footer sections', () => {
    expect(wrapper.find('.footer-left').exists()).toBe(true)
    expect(wrapper.find('.footer-logo').exists()).toBe(true)
    expect(wrapper.find('.footer-contact').exists()).toBe(true)
  })

  it('should have contact items', () => {
    expect(wrapper.find('.contact-item').exists()).toBe(true)
  })

  it('should have getItems method returning correct data', () => {
    const items = wrapper.vm.getItems('homeSubFooter.menu.home.items')
    expect(items).toBeDefined()
    expect(Array.isArray(items)).toBe(true)
    expect(items).toEqual(['Home', 'Sobre Nós'])
  })

  it('should have social media section', () => {
    expect(wrapper.find('.social-media').exists()).toBe(true)
  })

  it('should export a valid Vue component with setup', () => {
    expect(SubFooter).toBeDefined()
    expect(SubFooter.setup).toBeDefined()
  })

  it('should be a valid component object', () => {
    expect(typeof SubFooter).toBe('object')
    expect(SubFooter.name).toBe('SubFooter')
  })

  it('should have translation access to menu titles', () => {
    const homeTitle = wrapper.vm.t('homeSubFooter.menu.home.title')
    expect(homeTitle).toBe('Início')
  })

  it('should have footer center section', () => {
    expect(wrapper.find('.footer-center').exists()).toBe(true)
  })

  it('should have footer right section', () => {
    expect(wrapper.find('.footer-right').exists()).toBe(true)
  })

  it('should return empty array when path leads to non-array value', () => {
    const result = wrapper.vm.getItems('homeSubFooter.logo')
    expect(result).toEqual([])
  })

  it('should return empty array when path leads to string value', () => {
    const result = wrapper.vm.getItems('homeSubFooter.menu.home.title')
    expect(result).toEqual([])
  })
})
