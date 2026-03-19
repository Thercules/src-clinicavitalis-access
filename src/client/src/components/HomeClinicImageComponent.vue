<script>
export default {
  name: "HomeClinicImageComponent",
};
</script>

<template>
    <section class="home_clinic_image">
        <img
        src="https://i.ibb.co/nSckHLZ/recepcao-de-clinica-medica.webp"
        alt="Ala médica"
        class="home_clinic_image__img"
        />
    </section>
</template>
  
<style scoped>
.home_clinic_image {
position: relative;
width: 100%;
height: 500px;
overflow: hidden;
/* margin-top: calc(60px); */
}

.home_clinic_image__img {
width: 100%;
height: 100%;
object-fit: cover;
}
</style>