import { createI18n } from 'vue-i18n'
import ptBR from './locales/pt-BR.json'
import en from './locales/en.json'

const getLocale = () => {
  const browserLocale = navigator.language || navigator.userLanguage
  const defaultLocale = 'pt-BR'
  
  if (browserLocale.startsWith('en')) {
    return 'en'
  }
  return defaultLocale
}

const i18n = createI18n({
  legacy: false,
  locale: getLocale(),
  fallbackLocale: 'pt-BR',
  messages: {
    'pt-BR': ptBR,
    'en': en
  }
})

export default i18n
