<script>
import HomeNavbar from "./components/HomeNavbar.vue";
import HomeSubTextComponent from "./components/HomeSubTextComponent.vue";
import HomeImageComponent from "./components/HomeImageComponent.vue";
import HomeServicesComponent from "./components/HomeServicesComponent.vue";
import HomeContactComponent from "./components/HomeContactComponent.vue";
import HomeSubNavbar from "./components/HomeSubNavbar.vue";
import HomeClinicImageComponent from "./components/HomeClinicImageComponent.vue";
import HomeDoctorFilterComponent from "./components/HomeDoctorFilterComponent.vue";
import HomeSubFooter from "./components/HomeSubFooter.vue";
import HomeFooter from "./components/HomeFooter.vue";
import HomeLibrasButton from "./components/HomeLibrasButton.vue";

export default {
  components: {
    HomeNavbar,
    HomeSubTextComponent,
    HomeClinicImageComponent,
    HomeImageComponent,
    HomeServicesComponent,
    HomeContactComponent,
    HomeSubNavbar,
    HomeDoctorFilterComponent,
    HomeSubFooter,
    HomeFooter,
    HomeLibrasButton,
  },
};
</script>

<template>
  <HomeNavbar />
  <HomeSubNavbar/>
  <HomeDoctorFilterComponent/>
  <HomeClinicImageComponent />
  <HomeSubTextComponent />
  <HomeImageComponent />
  <HomeServicesComponent/>
  <HomeContactComponent/>
  <HomeSubFooter />
  <HomeFooter />
  <HomeLibrasButton />
</template>

<style scoped>
.content {
  padding-top: 70px; 
  padding: 2rem;
}
</style>
