<script>
import { useI18n } from 'vue-i18n'

export default {
  name: "Footer",
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
};
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-copyright">
        <p>{{ t('homeFooter.copyright', { year: currentYear }) }}</p>
      </div>
      <div class="footer-links">
        <a href="#">{{ t('homeFooter.privacyNotice') }}</a>
        <span class="separator">|</span>
        <a href="#">{{ t('homeFooter.cookieNotice') }}</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: white;
  color: #666;
  padding: 1.5rem 2rem;
  border-top: 1px solid #1f3a5f;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.footer-copyright {
  margin: 0;
  font-size: 0.85rem;
}

.footer-copyright p {
  margin: 0;
  color: #666;
  letter-spacing: 0.5px;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
}

.footer-links a {
  color: #52a9ff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #7ac3ff;
  text-decoration: underline;
}

.separator {
  color: #444;
}

/* Responsividade */
@media (max-width: 768px) {
  .footer {
    padding: 1rem;
  }

  .footer-container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .footer-copyright p,
  .footer-links {
    font-size: 0.75rem;
  }
}
</style>
