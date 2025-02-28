<script>
import HomeNavbar from "./components/HomeNavbar.vue";
import HomeSubTextComponent from "./components/HomeSubTextComponent.vue";
import HomeImageComponent from "./components/HomeImageComponent.vue";
import HomeServicesComponent from "./components/HomeServicesComponent.vue";
import HomeContactComponent from "./components/HomeContactComponent.vue";

export default {
  components: {
    HomeNavbar,
    HomeSubTextComponent,
    HomeImageComponent,
    HomeServicesComponent,
    HomeContactComponent,
  },
};
</script>

<template>
  <HomeNavbar />
  <HomeSubTextComponent />
  <HomeImageComponent />
  <HomeServicesComponent/>
  <HomeContactComponent/>
  <div class="content">
    <h1>Teste de enquadramento de componentes</h1>
    <p>Se este conteúdo está abaixo do seu componente seguindo as ordens impostas acima, você fez corretamente.</p>
  </div>
</template>

<style scoped>
.content {
  padding-top: 70px; 
  padding: 2rem;
}
</style>
