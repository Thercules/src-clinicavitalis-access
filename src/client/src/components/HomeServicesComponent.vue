<script>
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

export default {
  name: "HomeServicesComponent",
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      homeServicesList: [
        { id: 1, serviceName: "Massagem Terapêutica", serviceIcon: "💆", serviceDescription: "Relaxe e alivie tensões com nossa massagem terapêutica." },
        { id: 2, serviceName: "Acupuntura", serviceIcon: "🩸", serviceDescription: "Equilibre sua energia e melhore sua saúde com acupuntura." },
        { id: 3, serviceName: "Yoga", serviceIcon: "🧘", serviceDescription: "Aprimore sua flexibilidade e bem-estar com nossas aulas de Yoga." },
        { id: 4, serviceName: "Nutrição", serviceIcon: "🥗", serviceDescription: "Aprenda a se alimentar de forma saudável e equilibrada." },
        { id: 5, serviceName: "Fisioterapia", serviceIcon: "🏋️", serviceDescription: "Recupere-se de lesões e melhore sua mobilidade." }
      ],
    };
  }
};
</script>

<template>
  <section class="home-services-container">
    <div class="home-services-header">
      <h1>Explore Nossos Serviços</h1>
      <p>Descubra uma variedade de serviços para o seu bem-estar</p>
    </div>
    <carousel :items-to-show="3" :wrap-around="true" class="home-services-carousel" :breakpoints="{
      768: { itemsToShow: 3 },
      480: { itemsToShow: 1 },
      320: { itemsToShow: 1 }
    }">
      <slide v-for="service in homeServicesList" :key="service.id">
        <div class="home-service-card">
          <div class="home-service-card-content">
            <span class="home-service-icon">{{ service.serviceIcon }}</span>
            <p class="home-service-name">{{ service.serviceName }}</p>
          </div>
          <div class="home-service-card-hover">
            <p class="home-service-description">{{ service.serviceDescription }}</p>
            <div class="home-service-buttons">
              <button class="home-service-btn">🛈</button>
              <button class="home-service-btn">➡</button>
            </div>
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
.home-services-container {
  text-align: center;
  padding: 40px;
  background: linear-gradient(to right, #FFF, #D0DFF2);
}

.home-services-header h1 {
  font-size: 2rem;
  font-weight: bold;
  color: black;
}

.home-services-header p {
  font-size: 1.2rem;
  color: black;
  margin-bottom: 20px;
}

.home-services-carousel {
  max-width: 800px;
  height: 280px;
  margin: 0 auto;
}

.home-service-card {
  position: relative;
  width: 200px;
  height: 260px;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;
  border-radius: 10%;
}

.home-service-card:hover {
  transform: scale(1.05);
}

.home-service-card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  background: linear-gradient(to top, #FFF, #D0DFF2);
  transition: transform 0.4s ease-in-out;
}

.home-service-card:hover .home-service-card-content {
  transform: translateY(-40%);
}

.home-service-card-hover {
  position: absolute;
  bottom: -50px;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #1565C0, #D0DFF2);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  border-radius: 20px;
  opacity: 0;
  transition: bottom 0.4s ease-in-out, opacity 0.4s ease-in-out;
}

.home-service-card:hover .home-service-card-hover {
  bottom: 0;
  opacity: 1;
}

.home-service-name {
  font-size: 1rem;
  font-weight: bold;
  color: black;
  text-align: center;
}

.home-service-description {
  font-size: 0.8rem;
  margin-bottom: 8px;
}

.home-service-buttons {
  display: flex;
  gap: 10px;
}

.home-service-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: white;
  color: #1565C0;
  font-size: 1rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s;
}

.home-service-btn:hover {
  background: #D0DFF2;
}
</style>
