import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ClinicImage from '../ClinicImage.vue'

describe('ClinicImage Component', () => {
  it('should render clinic image correctly', () => {
    const wrapper = mount(ClinicImage)
    
    expect(wrapper.find('.home_clinic_image').exists()).toBe(true)
  })

  it('should display image with correct alt text', () => {
    const wrapper = mount(ClinicImage)
    
    const image = wrapper.find('.home_clinic_image__img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('alt')).toBe('Ala médica')
  })

  it('should have correct image source', () => {
    const wrapper = mount(ClinicImage)
    
    const image = wrapper.find('.home_clinic_image__img')
    expect(image.attributes('src')).toContain('ibb.co')
  })

  it('should have component name', () => {
    const wrapper = mount(ClinicImage)
    expect(wrapper.vm.$options.name).toBe('ClinicImage')
  })

  it('should match snapshot', () => {
    const wrapper = mount(ClinicImage)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
