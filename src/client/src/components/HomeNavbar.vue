<script>
export default {
  name: "HomeNavbar",
  data() {
    return {
      menuOpen: false,
    };
  },
};
</script>

<template>
  <nav class="home_navbar">
    <div class="home_navbar__left">
      <div class="home_navbar__logo">
        <img alt="Vue logo" class="home_navbar__logo-img" src="@/assets/logo.svg" width="200" height="200" />
      </div>
    </div>
    <ul class="home_navbar__links">
      <li><a href="#">Início</a></li>
      <li><a href="#">Sobre</a></li>
      <li><a href="#">Serviços</a></li>
      <li><a href="#">Contato</a></li>
    </ul>
  </nav>
</template>

<style scoped>
.home_navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(to right, #FFF, #D0DFF2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 1000;
}

.home_navbar__left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.home_navbar__logo-img {
  height: 40px;
  width: auto;
}

.home_navbar__links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.home_navbar__links li a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  font-weight: 700;
  transition: color 0.3s, text-shadow 0.3s;
}

.home_navbar__links li a:hover {
  color: #52a9ff;
  text-shadow: 2px 2px 4px rgba(72, 188, 255, 0.3);
}

/* Responsividade */
@media (max-width: 768px) {
  .home_navbar__links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background: #181818;
    width: 100%;
    text-align: center;
    padding: 1rem 0;
  }

  .home_navbar__links--open {
    display: flex;
  }
}
</style>
