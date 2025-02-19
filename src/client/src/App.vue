<script>
import HomeNavbar from "./components/HomeNavbar.vue";
import HomeSubTextComponent from "./components/HomeSubTextComponent.vue";

export default {
  components: {
    HomeNavbar,
    HomeSubTextComponent,
  },
};
</script>

<template>
  <HomeNavbar />
  <HomeSubTextComponent />
  <div class="content">
    <h1>Teste</h1>
    <p>Conteúdo abaixo da navbar...</p>
  </div>
</template>

<style scoped>
.content {
  padding-top: 70px; 
}
</style>
