<script>
import { useI18n } from 'vue-i18n'

export default {
  name: "SubNavbar",
  setup() {
    const { t } = useI18n()
    return { t }
  },
};
</script>

<template>
  <div class="home_subnavbar">
    <div class="home_subnavbar__content">
      {{ t('subnavbar.healthPlans') }} |  
      {{ t('subnavbar.whatsapp') }} |  
      {{ t('subnavbar.care') }}
    </div>
  </div>
</template>

<style scoped>
.home_subnavbar {
  position: fixed;
  top: 60px; 
  left: 0;
  width: 100%;
  height: 30px;
  background: #52a9ff;
  color: white;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  z-index: 999;
}

.home_subnavbar__content {
  display: inline-block;
  padding-left: 100%;
  animation: marquee 20s linear infinite; 
  font-size: 0.9rem;
  font-weight: bold;
}

/* Animação do letreiro */
@keyframes marquee {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
