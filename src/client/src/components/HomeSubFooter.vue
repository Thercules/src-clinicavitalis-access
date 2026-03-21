<script>
import { useI18n } from 'vue-i18n'

export default {
  name: "HomeSubFooter",
  setup() {
    const { t, locale } = useI18n()
    const messages = useI18n().messages
    
    const getItems = (key) => {
      const keys = key.split('.')
      let data = messages.value[locale.value]
      for (let k of keys) {
        data = data[k]
      }
      return Array.isArray(data) ? data : []
    }
    
    return { 
      t,
      getItems
    }
  }
};
</script>

<template>
  <footer class="sub-footer">
    <div class="sub-footer-container">
      <div class="footer-section footer-left">
        <div class="footer-logo">
          <span class="logo-text">{{ t('homeSubFooter.logo') }}</span>
        </div>
        <div class="footer-contact">
          <p class="contact-item">
            <span class="contact-icon">☎️</span>
            <span class="contact-info">
              <span class="contact-label">{{ t('homeSubFooter.contact.dora') }}</span>
              <span class="contact-number">{{ t('homeSubFooter.contact.doraPhone') }}</span>
            </span>
          </p>
          <p class="contact-item">
            <span class="contact-icon">📞</span>
            <span class="contact-info">
              <span class="contact-label">{{ t('homeSubFooter.contact.central') }}</span>
              <span class="contact-number">{{ t('homeSubFooter.contact.centralPhone') }}</span>
            </span>
          </p>
        </div>
        <div class="social-media">
          <a href="#" class="social-icon" :title="t('homeSubFooter.social.facebook')" :aria-label="t('homeSubFooter.social.facebook')">f</a>
          <a href="#" class="social-icon" :title="t('homeSubFooter.social.linkedin')" :aria-label="t('homeSubFooter.social.linkedin')">in</a>
          <a href="#" class="social-icon" :title="t('homeSubFooter.social.instagram')" :aria-label="t('homeSubFooter.social.instagram')">📷</a>
          <a href="#" class="social-icon" :title="t('homeSubFooter.social.twitter')" :aria-label="t('homeSubFooter.social.twitter')">𝕏</a>
          <a href="#" class="social-icon" :title="t('homeSubFooter.social.whatsapp')" :aria-label="t('homeSubFooter.social.whatsapp')">💬</a>
          <a href="#" class="social-icon" :title="t('homeSubFooter.social.youtube')" :aria-label="t('homeSubFooter.social.youtube')">▶</a>
        </div>
      </div>

      <div class="footer-section footer-center">
        <div class="footer-column">
          <h4 class="footer-title">{{ t('homeSubFooter.menu.home.title') }}</h4>
          <ul class="footer-links">
            <li v-for="(item, index) in getItems('homeSubFooter.menu.home.items')" :key="`home-${index}`">
              <a href="#">{{ item }}</a>
            </li>
          </ul>
        </div>

        <div class="footer-column">
          <h4 class="footer-title">{{ t('homeSubFooter.menu.exams.title') }}</h4>
          <ul class="footer-links">
            <li v-for="(item, index) in getItems('homeSubFooter.menu.exams.items')" :key="`exams-${index}`">
              <a href="#">{{ item }}</a>
            </li>
          </ul>

          <h4 class="footer-title" style="margin-top: 1.5rem;">{{ t('homeSubFooter.menu.institutional.title') }}</h4>
          <ul class="footer-links">
            <li v-for="(item, index) in getItems('homeSubFooter.menu.institutional.items')" :key="`institutional-${index}`">
              <a href="#">{{ item }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-section footer-right">
        <div class="footer-column">
          <h4 class="footer-title">{{ t('homeSubFooter.menu.specialties.title') }}</h4>
          <ul class="footer-links">
            <li v-for="(item, index) in getItems('homeSubFooter.menu.specialties.items')" :key="`specialties-${index}`">
              <a href="#">{{ item }}</a>
            </li>
          </ul>

          <h4 class="footer-title" style="margin-top: 1.5rem;">{{ t('homeSubFooter.menu.partnerships.title') }}</h4>
          <ul class="footer-links">
            <li v-for="(item, index) in getItems('homeSubFooter.menu.partnerships.items')" :key="`partnerships-${index}`">
              <a href="#">{{ item }}</a>
            </li>
          </ul>

          <h4 class="footer-title" style="margin-top: 1.5rem;">{{ t('homeSubFooter.menu.app.title') }}</h4>
          <ul class="footer-links">
            <li v-for="(item, index) in getItems('homeSubFooter.menu.app.items')" :key="`app-${index}`">
              <a href="#">{{ item }}</a>
            </li>
          </ul>

          <h4 class="footer-title" style="margin-top: 1.5rem;">{{ t('homeSubFooter.menu.ombudsman.title') }}</h4>
          <p class="footer-link-text">{{ t('homeSubFooter.menu.ombudsman.text') }}</p>

          <h4 class="footer-title" style="margin-top: 1.5rem;">{{ t('homeSubFooter.menu.news.title') }}</h4>
          <p class="footer-link-text">{{ t('homeSubFooter.menu.news.text') }}</p>

          <h4 class="footer-title" style="margin-top: 1.5rem;">{{ t('homeSubFooter.menu.press.title') }}</h4>
          <p class="footer-link-text">{{ t('homeSubFooter.menu.press.text') }}</p>

          <h4 class="footer-title" style="margin-top: 1.5rem;">{{ t('homeSubFooter.menu.careers.title') }}</h4>
          <ul class="footer-links">
            <li v-for="(item, index) in getItems('homeSubFooter.menu.careers.items')" :key="`careers-${index}`">
              <a href="#">{{ item }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.sub-footer {
  background-color: #001f4d;
  color: #e0e0e0;
  padding: 3rem 2rem;
  font-size: 0.9rem;
}

.sub-footer-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr 1.5fr;
  gap: 3rem;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-logo {
  margin-bottom: 0.5rem;
}

.logo-text {
  font-size: 1.3rem;
  font-weight: 700;
  color: #52a9ff;
  letter-spacing: 1px;
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 0;
}

.contact-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-label {
  font-size: 0.8rem;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-number {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
}

.social-media {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.social-icon:hover {
  background-color: #52a9ff;
  border-color: #52a9ff;
  transform: translateY(-3px);
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.footer-center {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.footer-right {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #52a9ff;
  padding-bottom: 0.5rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.footer-links li {
  margin: 0;
}

.footer-links a {
  color: #b0b0b0;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.85rem;
}

.footer-links a:hover {
  color: #52a9ff;
}

.footer-link-text {
  color: #b0b0b0;
  font-size: 0.85rem;
  margin: 0;
}

@media (max-width: 1024px) {
  .sub-footer-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-center,
  .footer-right {
    grid-column: 1;
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .sub-footer {
    padding: 2rem 1rem;
  }

  .sub-footer-container {
    gap: 1.5rem;
  }

  .footer-center,
  .footer-right {
    grid-template-columns: 1fr;
  }

  .social-media {
    flex-wrap: wrap;
  }

  .social-icon {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
}
</style>
