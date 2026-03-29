<script>
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { useI18n } from 'vue-i18n'

export default {
  name: "News",
  components: {
    Carousel,
    Slide,
    Navigation
  },
  setup() {
    const { t, locale } = useI18n()
    const messages = useI18n().messages
    
    const getItems = (key) => {
      const keys = key.split('.')
      let data = messages.value[locale.value]
      for (let k of keys) {
        if (data && typeof data === 'object') {
          data = data[k]
        } else {
          return []
        }
      }
      return Array.isArray(data) ? data : []
    }
    
    return { 
      t,
      getItems
    }
  },
  methods: {
    readMore(newsId) {
    }
  }
}
</script>

<template>
  <section class="home-news-container">
    <div class="home-news-header">
      <h1>{{ t('homeNews.title') }}</h1>
      <p>{{ t('homeNews.subtitle') }}</p>
    </div>

    <carousel 
      :items-to-show="3" 
      :wrap-around="true" 
      class="home-news-carousel"
      @slide-end="handleSlideEnd"
    >
      <slide v-for="news in getItems('homeNews.news')" :key="news.id">
        <div class="news-card">
          <div class="news-image-container">
            <img :src="news.image" :alt="news.title" class="news-image">
            <div class="news-category-badge">{{ news.category }}</div>
            <div class="news-overlay"></div>
          </div>
          
          <div class="news-content">
            <div class="news-date">{{ news.date }}</div>
            <h3 class="news-title">{{ news.title }}</h3>
            <p class="news-excerpt">{{ news.excerpt }}</p>
            
            <button 
              class="news-read-more-btn"
              @click="readMore(news.id)"
            >
              {{ t('homeNews.readMore') }} →
            </button>
          </div>
        </div>
      </slide>

      <template #addons>
        <navigation />
      </template>
    </carousel>
  </section>
</template>

<style scoped>
.home-news-container {
  padding: 50px 40px;
  background: linear-gradient(to right, #FFF, #D0DFF2);
}

.home-news-header {
  text-align: center;
  margin-bottom: 50px;
  animation: slideInDown 0.8s ease-out;
}

.home-news-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #001f4d;
  margin-bottom: 15px;
  letter-spacing: -1px;
}

.home-news-header p {
  font-size: 1.1rem;
  color: #555;
  max-width: 600px;
  margin: 0 auto;
}

.home-news-carousel {
  max-width: 1200px;
  margin: 0 auto;
  height: 420px;
  padding: 0 80px;
  gap: 25px;
}

.news-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 31, 77, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: fadeInUp 0.6s ease-out;
  cursor: pointer;
  margin: 0 12px;
}

.news-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 20px 60px rgba(0, 31, 77, 0.2);
}

.news-image-container {
  position: relative;
  overflow: hidden;
  height: 180px;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.news-card:hover .news-image {
  transform: scale(1.1);
}

.news-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 31, 77, 0.3) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.news-card:hover .news-overlay {
  opacity: 1;
}

.news-category-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #52a9ff, #0066cc);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  animation: slideInRight 0.6s ease-out 0.1s backwards;
  box-shadow: 0 4px 12px rgba(82, 169, 255, 0.3);
}

.news-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 18px;
}

.news-date {
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.news-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #001f4d;
  margin-bottom: 8px;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.news-card:hover .news-title {
  color: #52a9ff;
}

.news-excerpt {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 15px;
  flex: 1;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-read-more-btn {
  align-self: flex-start;
  background: linear-gradient(135deg, #52a9ff, #0066cc);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(82, 169, 255, 0.3);
}

.news-read-more-btn:hover {
  transform: translateX(5px);
  box-shadow: 0 6px 16px rgba(82, 169, 255, 0.4);
  background: linear-gradient(135deg, #0066cc, #004399);
}

.news-read-more-btn:active {
  transform: translateX(0);
}

/* Animações */
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Customizar carousel */
:deep(.carousel__prev),
:deep(.carousel__next) {
  border: 2px solid #52a9ff;
  color: #52a9ff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  transition: all 0.3s ease;
}

:deep(.carousel__prev:hover),
:deep(.carousel__next:hover) {
  background-color: #52a9ff;
  color: white;
  transform: scale(1.1);
}

:deep(.carousel__next) {
  right: -60px;
}

:deep(.carousel__prev) {
  left: -60px;
}

/* Responsividade */
@media (max-width: 1024px) {
  .home-news-carousel {
    height: 400px;
  }

  .home-news-header h1 {
    font-size: 2rem;
  }

  :deep(.carousel) {
    display: flex;
  }

  :deep(.carousel__viewport) {
    padding: 0 60px;
  }
}

@media (max-width: 768px) {
  .home-news-container {
    padding: 30px 20px;
  }

  .home-news-carousel {
    height: 380px;
    padding: 0 50px;
  }

  .home-news-header h1 {
    font-size: 1.7rem;
  }

  .home-news-header p {
    font-size: 0.95rem;
  }

  .news-content {
    padding: 20px;
  }

  .news-title {
    font-size: 1.1rem;
  }

  :deep(.carousel__prev),
  :deep(.carousel__next) {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }

  :deep(.carousel__next) {
    right: -50px;
  }

  :deep(.carousel__prev) {
    left: -50px;
  }
}

@media (max-width: 640px) {
  .home-news-carousel {
    height: auto;
  }

  :deep(.carousel) {
    display: block;
  }

  :deep(.carousel__viewport) {
    padding: 0 !important;
  }

  :deep(.carousel__prev),
  :deep(.carousel__next) {
    display: none;
  }

  .news-card {
    margin-bottom: 20px;
  }

  .home-news-header h1 {
    font-size: 1.5rem;
  }
}
</style>
