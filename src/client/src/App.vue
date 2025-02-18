<script>
import HomeNavbar from "./components/HomeNavbar.vue";

export default {
  components: {
    HomeNavbar,
  },
};
</script>

<template>
  <HomeNavbar />
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
