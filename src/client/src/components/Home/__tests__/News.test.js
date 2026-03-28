import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import News from '../News.vue'
import { createI18n } from 'vue-i18n'

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(callback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      homeNews: {
        title: 'Latest News',
        subtitle: 'Stay updated with our latest news',
        readMore: 'Read More',
        news: [
          {
            id: 1,
            title: 'News 1',
            excerpt: 'Excerpt 1',
            category: 'Health',
            date: '2024-01-01',
            image: 'https://i.ibb.co/image1.jpg'
          }
        ]
      }
    }
  }
})

describe('News Component', () => {
  it('should render news section correctly', () => {
    const wrapper = mount(News, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true
        }
      }
    })
    
    expect(wrapper.find('.home-news-container').exists()).toBe(true)
  })

  it('should display news header', () => {
    const wrapper = mount(News, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true
        }
      }
    })
    
    expect(wrapper.find('.home-news-header').exists()).toBe(true)
  })

  it('should have carousel component', () => {
    const wrapper = mount(News, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true
        }
      }
    })
    
    expect(wrapper.findComponent({ name: 'Carousel' }).exists()).toBe(true)
  })

  it('should have readMore method', () => {
    const wrapper = mount(News, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true
        }
      }
    })
    
    expect(wrapper.vm.readMore).toBeDefined()
  })

  it('should use i18n translations', () => {
    const wrapper = mount(News, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true
        }
      }
    })
    
    expect(wrapper.vm.t).toBeDefined()
    expect(wrapper.vm.getItems).toBeDefined()
  })

  it('should have component name', () => {
    const wrapper = mount(News, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true
        }
      }
    })
    
    expect(wrapper.vm.$options.name).toBe('News')
  })

  it('should match snapshot', () => {
    const wrapper = mount(News, {
      global: {
        plugins: [i18n],
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true
        }
      }
    })
    
    expect(wrapper.html()).toMatchSnapshot()
  })
})
