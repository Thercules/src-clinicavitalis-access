<script>
export default {
  name: "HomeSubTextComponent",
};
</script>

<template>
  <section class="home-subtext-container">
    <div class="home-subtext-title-wrapper">
      <h1>
        Epicentro da Saúde <br />
        <span class="home-subtext-highlight">Conheça a Vitalis</span>
      </h1>
    </div>
    <div class="home-subtext-description-wrapper">
      <p>
        Ex purus dui, vehicula sed dignissim vitae, facilisi eu lacus.
        Nulla vulputate sed dignissim velit luctus. Donec nulla
        justo, venenatis et lacus non, tempus nulla.
      </p>
    </div>
  </section>
</template>

<style scoped>
.home-subtext-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 40px;
  padding: 60px;
  background: linear-gradient(to right, #FFF, #D0DFF2);
  margin-top: 60px;
}

.home-subtext-title-wrapper {
  flex: 1;
}

.home-subtext-title-wrapper h1 {
  font-size: 3rem;
  font-weight: bold;
  color: black;
}

.home-subtext-highlight {
  color: #1565C0;
}

.home-subtext-description-wrapper {
  flex: 1;
}

.home-subtext-description-wrapper p {
  font-size: 1.2rem;
  color: black;
  max-width: 500px;
}
</style>
