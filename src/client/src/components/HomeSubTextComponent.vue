<script>
import { useI18n } from 'vue-i18n'

export default {
  name: "HomeSubTextComponent",
  setup() {
    const { t } = useI18n()
    return { t }
  },
};
</script>

<template>
  <section class="home-subtext-container">
    <div class="home-subtext-title-wrapper">
      <h1>
        {{ t('homeSubText.title') }} <br />
        <span class="home-subtext-highlight">{{ t('homeSubText.highlight') }}</span>
      </h1>
    </div>
    <div class="home-subtext-description-wrapper">
      <p>
        {{ t('homeSubText.description') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.home-subtext-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 40px;
  padding: 60px;
  background: linear-gradient(to right, #FFF, #D0DFF2);
}

.home-subtext-title-wrapper {
  flex: 1;
}

.home-subtext-title-wrapper h1 {
  font-size: 3rem;
  font-weight: bold;
  color: black;
}

.home-subtext-highlight {
  color: #1565C0;
}

.home-subtext-description-wrapper {
  flex: 1;
}

.home-subtext-description-wrapper p {
  font-size: 1.2rem;
  color: black;
  max-width: 500px;
}
</style>
