<script>
export default {
  name: "HomeNavbar",
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    goToLoginRegister() {
      this.$router.push({ name: 'login-register' });
    },
  },
};
</script>

<template>
  <nav class="home_navbar">
    <div class="home_navbar__left">
      <div class="home_navbar__logo">
        <img alt="Vue logo" class="home_navbar__logo-img" src="@/assets/logo.svg" width="200" height="200" />
      </div>
      <ul class="home_navbar__links">
        <li><a href="#">Início</a></li>
        <li><a href="#">Sobre</a></li>
        <li><a href="#">Serviços</a></li>
        <li><a href="#">Contato</a></li>
      </ul>
    </div>

    <div class="home_navbar__right">
      <router-link to="/login-register">
        <button class="home_navbar__button">Login</button>
      </router-link>
      <router-link to="/login-register">
        <button class="home_navbar__button">Cadastro</button>
      </router-link>
      <button class="home_navbar__button">Deslogar</button>
      <img class="home_navbar__user-icon" src="https://i.ibb.co/fzKrcTZ7/png-clipart-computer-icons-user-profile-circle-abstract-miscellaneous-rim.png" alt="User Icon">
    </div>
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

/* Esquerda */
.home_navbar__left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.home_navbar__logo-img {
  height: 40px;
  width: auto;
}

.home_navbar__separator {
  font-size: 1.5rem;
  font-weight: bold;
  color: #888;
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

/* Direita */
.home_navbar__right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.home_navbar__button {
  background: #52a9ff;
  border: white;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.home_navbar__button:hover {
  background: none;
  border: 2px solid #52a9ff;
  color: #52a9ff;
}

.home_navbar__user-icon {
  width: 40px;
  border-radius: 50%; 
}

/* Responsividade */
@media (max-width: 768px) {
  .home_navbar {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }

  .home_navbar__left {
    flex-direction: column;
    align-items: center;
  }

  .home_navbar__links {
    flex-direction: column;
    text-align: center;
  }

  .home_navbar__right {
    margin-top: 1rem;
    flex-direction: column;
  }

  .home_navbar__button {
    width: 100%;
    text-align: center;
  }
}
</style>
