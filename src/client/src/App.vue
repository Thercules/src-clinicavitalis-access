<script>
import { useRoute } from 'vue-router'
import Navbar from "./components/Common/Navbar.vue"
import SubNavbar from "./components/Common/SubNavbar.vue"
import Footer from "./components/Common/Footer.vue"
import SubFooter from "./components/Common/SubFooter.vue"
import ClinicImage from "./components/Home/ClinicImage.vue"
import Contact from "./components/Home/Contact.vue"
import DoctorFilter from "./components/Home/DoctorFilter.vue"
import Image from "./components/Home/Image.vue"
import News from "./components/Home/News.vue"
import ServiceInfo from "./components/Home/ServiceInfo.vue"
import Services from "./components/Home/Services.vue"
import SubText from "./components/Home/SubText.vue"

export default {
  components: {
    Navbar,
    SubNavbar,
    Footer,
    SubFooter,
    ClinicImage,
    Contact,
    DoctorFilter,
    Image,
    News,
    ServiceInfo,
    Services,
    SubText,
  },
  setup() {
    const route = useRoute()
    return { route }
  },
  computed: {
    isBlankLayout() {
      return this.$route.meta.layout === 'blank'
    }
  }
};
</script>

<template>
  <router-view v-if="isBlankLayout" />
  <div v-else>
    <Navbar />
    <SubNavbar/>
    <DoctorFilter/>
    <ClinicImage />
    <SubText />
    <Image />
    <Services/>
    <News />
    <Contact/>
    <SubFooter />
    <Footer />
  </div>
</template>

<style scoped>
.content {
  padding-top: 70px; 
  padding: 2rem;
}
</style>
