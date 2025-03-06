<script>
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import ServiceInfoComponent from './ServiceInfoComponent.vue'; // Importando o componente com o novo nome

export default {
  name: "HomeServicesComponent",
  components: {
    Carousel,
    Slide,
    Navigation,
    ServiceInfoComponent
  },
  data() {
    return {
      homeServicesList: [
        { id: 1, serviceName: "Massagem Terapêutica", serviceDescription: "Relaxe e alivie tensões com nossa massagem terapêutica.", serviceLargeDescription:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?", serviceImage: "https://i.ibb.co/NTkykk0/teste-toxicologico-7-11zon.webp" },
        { id: 2, serviceName: "Acupuntura", serviceDescription: "Equilibre sua energia e melhore sua saúde com acupuntura.", serviceLargeDescription:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?", serviceImage: "https://i.ibb.co/8YmDBYY/teatroterapia-6-11zon.webp" },
        { id: 3, serviceName: "Yoga", serviceDescription: "Aprimore sua flexibilidade e bem-estar com nossas aulas de Yoga.", serviceLargeDescription:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?", serviceImage: "https://i.ibb.co/k6GNs2w/predisposicao-4-11zon.webp" },
        { id: 4, serviceName: "Nutrição", serviceDescription: "Aprenda a se alimentar de forma saudável e equilibrada.", serviceLargeDescription:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?", serviceImage: "https://i.ibb.co/DMbHDdK/aromaterapia2-11zon.webp" },
        { id: 5, serviceName: "Fisioterapia", serviceDescription: "Recupere-se de lesões e melhore sua mobilidade.", serviceLargeDescription:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?", serviceImage: "https://i.ibb.co/1XKTPdh/grupo-terapeutico2-11zon-1.webp" }
      ],
      selectedService: null 
    };
  },
  methods: {
    openServiceInfo(service) {
      this.selectedService = { 
        image: service.serviceImage,
        title: service.serviceName,
        subtitle: service.serviceDescription,
        description: service.serviceLargeDescription
      };
      this.$refs.serviceInfoComponent.show();
    }
  }
};
</script>

<template>
  <section class="home-services-container">
    <div class="home-services-header">
      <h1>Explore Nossos Serviços</h1>
      <p>Descubra uma variedade de serviços para o seu bem-estar</p>
    </div>
    <carousel :items-to-show="3" :wrap-around="true" class="home-services-carousel">
      <slide v-for="service in homeServicesList" :key="service.id">
        <div class="home-service-card">
          <div class="home-service-image">
            <img :src="service.serviceImage" alt="Imagem do serviço">
          </div>
          <div class="home-service-card-content">
            <p class="home-service-name">{{ service.serviceName }}</p>
          </div>
          <div class="home-service-card-hover">
            <p class="home-service-description">{{ service.serviceDescription }}</p>
            <div class="home-service-buttons">
              <button class="home-service-btn" @click="openServiceInfo(service)">🛈</button>
              <button class="home-service-btn">➡</button>
            </div>
          </div>
        </div>
      </slide>
      <template #addons>
        <navigation />
      </template>
    </carousel>

    <service-info-component ref="serviceInfoComponent" :service="selectedService" />
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
  display: flex;
  flex-direction: column;
}

.home-service-card:hover {
  transform: scale(1.05);
}

.home-service-image {
  width: 100%;
  height: 70%;
}

.home-service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-service-card-content {
  height: 30%;
  display: flex;
  align-items: center;
  padding-left: 15px;
  background: linear-gradient(to top, #FFF, #D0DFF2);
  justify-content: flex-start;
}

.home-service-name {
  font-size: 1rem;
  font-weight: bold;
  color: black;
  text-align: left;
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
