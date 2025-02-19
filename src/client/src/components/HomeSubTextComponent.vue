<script>
export default {
  name: "HomeSubTextComponent",
};
</script>

<template>
  <section class="container">
    <div class="text-left">
      <h1>
        Epicenter of Health <br />
        <span class="highlight">Your Wellness Haven</span>
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 20px;
  padding: 40px;
  background: linear-gradient(to right, #FFF, #D0DFF2);
}

.text-left h1 {
  font-size: 2rem;
  font-weight: bold;
  color:black;
}

.text-left .highlight {
  color: #1565C0; /* Azul forte para destacar "Wellness Haven" */
}

.text-right p {
  font-size: 1rem;
  color:black;
  max-width: 400px;
}
</style>
