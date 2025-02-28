<script>
export default {
  name: "HomeContactComponent",
};
</script>

<template>
  <section class="home-contact-container">
    <div class="contact-info-wrapper">
      <h2>Não encontrou o que procura e precisa de mais informações?</h2>
      <p>Fale com nossos consultores clicando no botão.</p>
      <button class="contact-button">📞 Entre em contato!</button>
      
      <div class="contact-details">
        <h3>Onde nos encontrar?</h3>
        <p>📍 Endereço</p>
        <p>Av. República do Líbano, 251 - Pina, Recife - PE, 51110-160</p>
        
        <h3>Contatos adicionais:</h3>
        <p>📞 Número: (88) 8.8888-8888</p>
        <p>📧 E-mail comercial: vitalis@email.com</p>
      </div>
    </div>
    
    <div class="map-wrapper">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.668731112663!2d-34.89773832413943!3d-8.085967800650101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab1f3bec607c45%3A0xf9b44be61a236c4d!2sRioMar%20Recife!5e0!3m2!1spt-BR!2sbr!4v1740714281955!5m2!1spt-BR!2sbr" 
        width="100%" 
        height="100%" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  </section>
</template>

<style scoped>
.home-contact-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 60px;
  background: linear-gradient(to right, #FFF, #D0DFF2);
  gap: 40px;
}

.contact-info-wrapper {
  flex: 1;
  max-width: 500px;
}

.contact-info-wrapper h2 {
  font-size: 2rem;
  color: black;
}

.contact-info-wrapper p {
  font-size: 1.2rem;
  color: black;
}

.contact-button {
  background-color: #1565C0;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  margin: 20px 0;
}

.contact-details h3 {
  margin-top: 20px;
  font-size: 1.5rem;
  color: black;
}

.map-wrapper {
  flex: 1;
  height: 400px;
}
</style>