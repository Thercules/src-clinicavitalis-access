<script>
export default {
  name: "HomeImageComponent",
};
</script>

<template>
    <section class="home_image">
        <img
        src="https://i.ibb.co/7JQYnhbN/hospital-image.jpg"
        alt="Ala médica"
        class="home_image__img"
        />
    </section>
</template>
  
<style scoped>
.home_image {
position: relative;
width: 100%;
height: 300px;
overflow: hidden;
/* margin-top: calc(60px); */
}

.home_image__img {
width: 100%;
height: 100%;
object-fit: cover;
}
</style>