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

  it('should have getItems method', () => {
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
    
    expect(wrapper.vm.getItems).toBeDefined()
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

  it('should verify getItems returns correct structure', () => {
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
    
    const news = wrapper.vm.getItems('homeNews.news')
    expect(Array.isArray(news)).toBe(true)
    if (news.length > 0) {
      expect(news[0].id).toBeDefined()
      expect(news[0].title).toBeDefined()
      expect(news[0].excerpt).toBeDefined()
    }
  })

  it('should call console.log when readMore is invoked', () => {
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
    
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    wrapper.vm.readMore(1)
    expect(consoleSpy).toHaveBeenCalledWith('Ler mais sobre notícia:', 1)
    consoleSpy.mockRestore()
  })

  it('should mount component with all nested components', () => {
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

  it('should handle getItems with invalid path gracefully', () => {
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
    
    const result = wrapper.vm.getItems('invalid.path.that.does.not.exist')
    expect(result).toBeDefined()
  })

  it('should return exact empty array for invalid path', () => {
    const wrapper = mount(News, {
      global: {
        plugins: [i18n],
        stubs: { Carousel: true, Slide: true, Navigation: true }
      }
    })
    const result = wrapper.vm.getItems('nonexistent.deep.path')
    expect(result).toEqual([])
  })

  it('should return actual news items using dot-separated path', () => {
    const wrapper = mount(News, {
      global: {
        plugins: [i18n],
        stubs: { Carousel: true, Slide: true, Navigation: true }
      }
    })
    const news = wrapper.vm.getItems('homeNews.news')
    expect(Array.isArray(news)).toBe(true)
    expect(news.length).toBe(1)
    expect(news[0].id).toBe(1)
    expect(news[0].title).toBe('News 1')
    expect(news[0].excerpt).toBe('Excerpt 1')
  })

  it('should traverse nested path correctly to return array', () => {
    const wrapper = mount(News, {
      global: {
        plugins: [i18n],
        stubs: { Carousel: true, Slide: true, Navigation: true }
      }
    })
    // If split separator was '' (empty string), 'homeNews.news' would split into
    // individual characters and not find the right nested keys
    const result = wrapper.vm.getItems('homeNews.news')
    expect(result).not.toEqual([])
    expect(result[0].category).toBe('Health')
  })

  it('should have Carousel Slide Navigation components registered', () => {
    expect(News.components).toBeDefined()
    expect(Object.keys(News.components).length).toBeGreaterThan(0)
    expect(News.components.Carousel).toBeDefined()
    expect(News.components.Slide).toBeDefined()
    expect(News.components.Navigation).toBeDefined()
  })

  it('should log to console with correct message format', () => {
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
    
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    wrapper.vm.readMore(5)
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})
