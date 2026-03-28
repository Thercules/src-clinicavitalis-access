import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Image from '../Image.vue'

describe('Image Component', () => {
  it('should render image correctly', () => {
    const wrapper = mount(Image)
    
    expect(wrapper.find('.home_image').exists()).toBe(true)
  })

  it('should display image with correct alt text', () => {
    const wrapper = mount(Image)
    
    const image = wrapper.find('.home_image__img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('alt')).toBe('Ala médica')
  })

  it('should have correct image source', () => {
    const wrapper = mount(Image)
    
    const image = wrapper.find('.home_image__img')
    expect(image.attributes('src')).toContain('ibb.co')
  })

  it('should have component name', () => {
    const wrapper = mount(Image)
    expect(wrapper.vm.$options.name).toBe('Image')
  })

  it('should match snapshot', () => {
    const wrapper = mount(Image)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
