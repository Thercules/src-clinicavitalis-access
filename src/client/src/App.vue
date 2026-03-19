<script>
import HomeNavbar from "./components/HomeNavbar.vue";
import HomeSubTextComponent from "./components/HomeSubTextComponent.vue";
import HomeImageComponent from "./components/HomeImageComponent.vue";
import HomeServicesComponent from "./components/HomeServicesComponent.vue";
import HomeContactComponent from "./components/HomeContactComponent.vue";
import HomeSubNavbar from "./components/HomeSubNavbar.vue";
import HomeClinicImageComponent from "./components/HomeClinicImageComponent.vue";

export default {
  components: {
    HomeNavbar,
    HomeSubTextComponent,
    HomeClinicImageComponent,
    HomeImageComponent,
    HomeServicesComponent,
    HomeContactComponent,
    HomeSubNavbar,
  },
};
</script>

<template>
  <HomeNavbar />
  <HomeSubNavbar/>
  <HomeClinicImageComponent />
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
