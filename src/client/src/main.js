import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')

function loadVLibras() {
  if (window.VLibras) {
    new window.VLibras.Widget('https://vlibras.gov.br/app');
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';

  script.onload = () => {
    new window.VLibras.Widget('https://vlibras.gov.br/app');
  };

  document.body.appendChild(script);
}

loadVLibras();