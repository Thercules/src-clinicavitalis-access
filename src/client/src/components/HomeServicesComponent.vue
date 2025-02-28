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
      services: [
        { id: 1, name: "Massagem Terapêutica", icon: "💆", description: "Relaxe e alivie tensões com nossa massagem terapêutica." },
        { id: 2, name: "Acupuntura", icon: "🩸", description: "Equilibre sua energia e melhore sua saúde com acupuntura." },
        { id: 3, name: "Yoga", icon: "🧘", description: "Aprimore sua flexibilidade e bem-estar com nossas aulas de Yoga." },
        { id: 4, name: "Nutrição", icon: "🥗", description: "Aprenda a se alimentar de forma saudável e equilibrada." },
        { id: 5, name: "Fisioterapia", icon: "🏋️", description: "Recupere-se de lesões e melhore sua mobilidade." }
      ],
    };
  }
};
</script>

<template>
  <section class="services-container">
    <div class="text-center">
      <h1>Explore Nossos Serviços</h1>
      <p>Descubra uma variedade de serviços para o seu bem-estar</p>
    </div>
    <carousel :items-to-show="3" :wrap-around="true" class="carousel" :breakpoints="{
      768: { itemsToShow: 3 },
      480: { itemsToShow: 1 },
      320: { itemsToShow: 1 }
    }">
      <slide v-for="service in services" :key="service.id">
        <div class="service-card">
          <div class="card-content">
            <span class="icon">{{ service.icon }}</span>
            <p class="service-name">{{ service.name }}</p>
          </div>
          <div class="card-hover">
            <p class="service-description">{{ service.description }}</p>
            <div class="buttons">
              <button class="btn">🛈</button>
              <button class="btn">➡</button>
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
.services-container {
  text-align: center;
  padding: 40px;
  background: linear-gradient(to right, #FFF, #D0DFF2);
}

.text-center h1 {
  font-size: 2rem;
  font-weight: bold;
  color: black;
}

.text-center p {
  font-size: 1.2rem;
  color: black;
  margin-bottom: 20px;
}

.carousel {
  max-width: 800px;
  height: 280px;
  margin: 0 auto;
}

.service-card {
  position: relative;
  width: 200px;
  height: 260px;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;
  border-radius: 10%;
}

.service-card:hover {
  transform: scale(1.05);
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  background: linear-gradient(to top, #FFF, #D0DFF2);
  transition: transform 0.4s ease-in-out;
}

.service-card:hover .card-content {
  transform: translateY(-40%);
}

.card-hover {
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

.service-card:hover .card-hover {
  bottom: 0;
  opacity: 1;
}

.service-name {
  font-size: 1rem;
  font-weight: bold;
  color: black;
  text-align: center;
}

.service-description {
  font-size: 0.8rem;
  margin-bottom: 8px;
}

.buttons {
  display: flex;
  gap: 10px;
}

.btn {
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

.btn:hover {
  background: #D0DFF2;
}
</style>
