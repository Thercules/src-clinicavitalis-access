<script>
export default {
  name: "ServiceInfoComponent",
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    show() {
      this.isVisible = true;
    },
    close() {
      this.isVisible = false;
    }
  }
};
</script>

<template>
  <div v-if="isVisible" class="service-info-overlay">
    <div class="service-info-content">
      <button class="close-btn" @click="close">X</button>
      <div class="service-info-grid">
        <!-- Primeira Coluna -->
        <div class="doctor-column">
          <div class="doctor-card">
            <img src="https://i.ibb.co/SXXydXVd/ai-generated-a-smiling-doctor-with-glasses-and-a-white-lab-coat-isolated-on-transparent-background-f.webp" alt="Médico" class="doctor-image" />
          </div>
          <div class="doctor-small-cards">
            <div class="small-card"><img src="https://i.ibb.co/SXXydXVd/ai-generated-a-smiling-doctor-with-glasses-and-a-white-lab-coat-isolated-on-transparent-background-f.webp" alt="Médico" class="small-image" /></div>
            <div class="small-card"><img src="https://i.ibb.co/SXXydXVd/ai-generated-a-smiling-doctor-with-glasses-and-a-white-lab-coat-isolated-on-transparent-background-f.webp" alt="Médico" class="small-image" /></div>
          </div>
          <div class="doctor-small-cards">
            <div class="small-card"><img src="https://i.ibb.co/SXXydXVd/ai-generated-a-smiling-doctor-with-glasses-and-a-white-lab-coat-isolated-on-transparent-background-f.webp" alt="Médico" class="small-image" /></div>
            <div class="small-card"><img src="https://i.ibb.co/SXXydXVd/ai-generated-a-smiling-doctor-with-glasses-and-a-white-lab-coat-isolated-on-transparent-background-f.webp" alt="Médico" class="small-image" /></div>
          </div>
        </div>
        
        <!-- Segunda Coluna -->
        <div class="service-image-column">
          <img :src="service.image" alt="Imagem do serviço" class="service-image" />
        </div>
        
        <div class="text-column">
          <h1>{{ service.title }}</h1>
          <h3>{{ service.subtitle }}</h3>
          <p class="service-description">{{ service.description }}</p>
          
          <div class="button-container">
            <button class="btn btn-primary">Agendar Consulta</button>
            <button class="btn btn-secondary">Agendamento por whatsapp</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-info-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(200, 200, 200, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.service-info-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.service-info-grid {
  display: flex;
  width: 100%;
  height: 100%;
}

.doctor-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  justify-content: center;
}

.doctor-card {
  background: #f8f8f8;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.doctor-image {
  width: 100%;
  border-radius: 10px;
}

.doctor-small-cards {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
}

.small-card {
  width: 48%;
  background: #f8f8f8;
  padding: 5px;
  border-radius: 5px;
}

.small-image {
  width: 100%;
  border-radius: 5px;
}

.service-image-column {
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-image {
  width: 90%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.text-column {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5%;
}

h1, h3 {
  color: var(--vt-c-black);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.service-description {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #28a745;
  color: white;
}

.btn-secondary:hover {
  background: #1e7e34;
}
</style>
