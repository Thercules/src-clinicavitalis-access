<script>
export default {
  name: "HomeSubNavbar",
};
</script>

<template>
  <div class="home_subnavbar">
    <div class="home_subnavbar__content">
      🏥 Planos de saúde com descontos imperdíveis! Contrate agora e economize! 💙 |  
      Atendimento 24h pelo WhatsApp: 📲 (99) 9.9999-9999 |  
      Cuide da sua saúde com os melhores planos do mercado! 🌟  
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
