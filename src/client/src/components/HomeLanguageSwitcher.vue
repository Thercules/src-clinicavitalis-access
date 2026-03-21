<script>
import { useI18n } from 'vue-i18n'

export default {
  name: "HomeLanguageSwitcher",
  setup() {
    const { locale } = useI18n()
    return { locale }
  },
  methods: {
    changeLanguage(lang) {
      this.locale = lang
      localStorage.setItem('locale', lang)
    }
  }
}
</script>

<template>
  <div class="language-switcher">
    <button 
      :class="{ active: locale === 'pt-BR' }"
      @click="changeLanguage('pt-BR')"
      class="lang-btn"
    >
      🇧🇷 PT
    </button>
    <button 
      :class="{ active: locale === 'en' }"
      @click="changeLanguage('en')"
      class="lang-btn"
    >
      🇺🇸 EN
    </button>
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.lang-btn {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s;
  color: #333;
}

.lang-btn:hover {
  background-color: #e0e0e0;
}

.lang-btn.active {
  background-color: #003da5;
  color: white;
  border-color: #003da5;
}
</style>
