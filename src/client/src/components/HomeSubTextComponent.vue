<script>
export default {
  name: "HomeSubTextComponent",
};
</script>

<template>
  <section class="container">
    <div class="text-left">
      <h1>
        Epicentro da Saúde <br />
        <span class="highlight">Conheça a Vitalis</span>
      </h1>
    </div>
    <div class="text-right">
      <p>
        Ex purus dui, vehicula sed dignissim vitae, facilisi eu lacus.
        Nulla vulputate sed dignissim velit luctus. Donec nulla
        justo, venenatis et lacus non, tempus nulla.
      </p>
    </div>
  </section>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 40px;
  padding: 60px;
  background: linear-gradient(to right, #FFF, #D0DFF2);
  margin-top: 60px;
}

.text-left {
  flex: 1;
}

.text-left h1 {
  font-size: 3rem;
  font-weight: bold;
  color: black;
}

.text-left .highlight {
  color: #1565C0;
}

.text-right {
  flex: 1;
}

.text-right p {
  font-size: 1.2rem;
  color: black;
  max-width: 500px;
}
</style>
