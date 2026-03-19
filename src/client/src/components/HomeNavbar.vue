<script>
export default {
  name: "HomeNavbar",
  data() {
    return {
      mobileMenuOpen: false,
      locationEnabled: true,
      searchOpen: false,
      searchQuery: "",
      doctors: [
        { id: 1, name: "Dr. João Silva", specialty: "Cardiologia" },
        { id: 2, name: "Dra. Maria Santos", specialty: "Dermatologia" },
        { id: 3, name: "Dr. Pedro Oliveira", specialty: "Ortopedia" },
        { id: 4, name: "Dra. Ana Costa", specialty: "Pediatria" },
        { id: 5, name: "Dr. Carlos Lima", specialty: "Neurologia" },
        { id: 6, name: "Dra. Isabel Martins", specialty: "Oftalmologia" },
      ],
    };
  },
  computed: {
    filteredDoctors() {
      if (!this.searchQuery) return this.doctors;
      return this.doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    toggleLocation() {
      this.locationEnabled = !this.locationEnabled;
    },
    toggleSearch() {
      this.searchOpen = !this.searchOpen;
      if (this.searchOpen) {
        this.$nextTick(() => {
          const input = this.$refs.searchInput;
          if (input) input.focus();
        });
      }
    },
    selectDoctor(doctor) {
      this.searchQuery = doctor.name;
      console.log("Doutor selecionado:", doctor);
      // Aqui você pode adicionar lógica para redirecionar ou fazer algo com a seleção
      this.searchOpen = false;
    },
    closeSearch() {
      this.searchOpen = false;
    },
  },
};
</script>

<template>
  <nav class="navbar">
    <!-- Barra Superior -->
    <div class="navbar__top">
      <div class="navbar__top-left">
        <a href="#" class="navbar__top-link">Marcar Consulta</a>
        <a href="#" class="navbar__top-link">Marcar Exame</a>
        <a href="tel:3005-3230" class="navbar__top-link">3005-3230</a>
        <a href="#" class="navbar__top-link">Ouvidoria</a>
        <a href="#" class="navbar__top-link">Notícias</a>
      </div>

      <div class="navbar__top-right">
        <div class="navbar__location">
          <span class="navbar__location-text">Localização desiganda Clique ao lado para ativar</span>
          <button 
            class="navbar__toggle" 
            :class="{ 'navbar__toggle--active': locationEnabled }"
            @click="toggleLocation"
          >
            <span class="navbar__toggle-circle"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Barra Principal -->
    <div class="navbar__main">
      <div class="navbar__logo">
        <span class="navbar__logo-text">REDE SOR</span>
      </div>

      <ul class="navbar__menu" :class="{ 'navbar__menu--open': mobileMenuOpen }">
        <li><a href="#" class="navbar__link">Para Pacientes</a></li>
        <li><a href="#" class="navbar__link">Para Médicos</a></li>
        <li><a href="#" class="navbar__link">Institucional</a></li>
        <li><a href="#" class="navbar__link">O Grupo</a></li>
        <li><a href="#" class="navbar__link">Parcerias</a></li>
      </ul>

      <div class="navbar__actions">
        <div class="navbar__search-container">
          <button 
            class="navbar__search-icon" 
            @click="toggleSearch"
            aria-label="Buscar"
          >
            <span>🔍</span>
          </button>

          <!-- Dropdown de Busca -->
          <div 
            class="navbar__search-dropdown" 
            :class="{ 'navbar__search-dropdown--open': searchOpen }"
            v-if="searchOpen"
            @click.stop
          >
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              class="navbar__search-input"
              placeholder="Procure por doutor ou especialidade..."
            />
            <div class="navbar__search-results">
              <div 
                v-for="doctor in filteredDoctors" 
                :key="doctor.id"
                class="navbar__search-item"
                @click="selectDoctor(doctor)"
              >
                <div class="navbar__search-item-name">{{ doctor.name }}</div>
                <div class="navbar__search-item-specialty">{{ doctor.specialty }}</div>
              </div>
              <div v-if="filteredDoctors.length === 0" class="navbar__search-empty">
                Nenhum doutor encontrado
              </div>
            </div>
          </div>
        </div>

        <router-link to="/login-register">
          <button class="navbar__login-btn">ENTRAR</button>
        </router-link>
        <button 
          class="navbar__hamburger" 
          @click="toggleMobileMenu"
          :class="{ 'navbar__hamburger--active': mobileMenuOpen }"
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Overlay para fechar dropdown -->
    <div 
      v-if="searchOpen" 
      class="navbar__overlay" 
      @click="closeSearch"
    ></div>
  </nav>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

/* ===== BARRA SUPERIOR ===== */
.navbar__top {
  background-color: #003da5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem;
  gap: 2rem;
}

.navbar__top-left {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}

.navbar__top-link {
  color: #fff;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.3s;
}

.navbar__top-link:hover {
  color: #d0d0d0;
}

.navbar__top-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar__location {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.navbar__location-text {
  color: #fff;
  font-size: 0.75rem;
  white-space: nowrap;
}

/* Toggle Switch */
.navbar__toggle {
  width: 50px;
  height: 24px;
  background-color: #ccc;
  border: none;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 2px;
}

.navbar__toggle--active {
  background-color: #52a9ff;
}

.navbar__toggle-circle {
  display: block;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: left 0.3s;
}

.navbar__toggle--active .navbar__toggle-circle {
  left: 28px;
}

/* ===== BARRA PRINCIPAL ===== */
.navbar__main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  gap: 2rem;
}

.navbar__logo {
  flex-shrink: 0;
}

.navbar__logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #003da5;
  letter-spacing: 1px;
}

.navbar__menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  flex: 1;
  justify-content: center;
}

.navbar__menu li {
  position: relative;
}

.navbar__link {
  color: #333;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: color 0.3s;
  padding: 0.5rem 0;
}

.navbar__link:hover {
  color: #003da5;
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* ===== SEARCH ===== */
.navbar__search-container {
  position: relative;
}

.navbar__search-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: opacity 0.3s;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar__search-icon:hover {
  opacity: 0.7;
}

/* Dropdown de Busca */
.navbar__search-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 320px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  animation: fadeInDown 0.3s ease-out;
  z-index: 1001;
  overflow: hidden;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.navbar__search-input {
  padding: 0.75rem 1rem;
  border: none;
  border-bottom: 1px solid #eee;
  font-size: 0.95rem;
  outline: none;
  background-color: #f9f9f9;
}

.navbar__search-input::placeholder {
  color: #999;
}

.navbar__search-input:focus {
  background-color: #fff;
  border-bottom-color: #003da5;
}

.navbar__search-results {
  flex: 1;
  overflow-y: auto;
  max-height: 300px;
}

.navbar__search-item {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.navbar__search-item:hover {
  background-color: #f5f5f5;
}

.navbar__search-item:last-child {
  border-bottom: none;
}

.navbar__search-item-name {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.navbar__search-item-specialty {
  font-size: 0.8rem;
  color: #999;
  margin-top: 0.25rem;
}

.navbar__search-empty {
  padding: 1.5rem 1rem;
  text-align: center;
  color: #999;
  font-size: 0.9rem;
}

/* Overlay para fechar dropdown */
.navbar__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}

/* Login Button */
.navbar__login-btn {
  background-color: #003da5;
  color: white;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.navbar__login-btn:hover {
  background-color: #002875;
}

/* Hamburger Menu */
.navbar__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
}

.navbar__hamburger span {
  width: 25px;
  height: 3px;
  background-color: #003da5;
  transition: all 0.3s;
  border-radius: 2px;
}

.navbar__hamburger--active span:nth-child(1) {
  transform: rotate(45deg) translate(10px, 10px);
}

.navbar__hamburger--active span:nth-child(2) {
  opacity: 0;
}

.navbar__hamburger--active span:nth-child(3) {
  transform: rotate(-45deg) translate(8px, -8px);
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 1024px) {
  .navbar__top {
    flex-direction: column;
    gap: 1rem;
  }

  .navbar__top-left {
    width: 100%;
    justify-content: center;
    gap: 1rem;
  }

  .navbar__location-text {
    display: none;
  }

  .navbar__menu {
    gap: 1rem;
  }

  .navbar__link {
    font-size: 0.85rem;
  }

  .navbar__search-dropdown {
    width: 280px;
  }
}

@media (max-width: 768px) {
  .navbar__top {
    padding: 0.5rem 1rem;
  }

  .navbar__top-left {
    flex-direction: column;
    gap: 0.5rem;
  }

  .navbar__top-link {
    font-size: 0.75rem;
  }

  .navbar__main {
    padding: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .navbar__logo-text {
    font-size: 1.2rem;
  }

  .navbar__menu {
    display: none;
    position: absolute;
    top: calc(100% + 40px);
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: #fff;
    border-top: 2px solid #003da5;
    padding: 1rem;
    gap: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .navbar__menu--open {
    display: flex;
  }

  .navbar__hamburger {
    display: flex;
  }

  .navbar__actions {
    order: 3;
    width: 100%;
    justify-content: flex-end;
    gap: 1rem;
  }

  .navbar__location-text {
    font-size: 0.65rem;
  }

  .navbar__search-dropdown {
    width: 250px;
    right: -50px;
  }
}

@media (max-width: 480px) {
  .navbar__top {
    padding: 0.5rem;
  }

  .navbar__top-left {
    gap: 0.25rem;
  }

  .navbar__top-link {
    font-size: 0.65rem;
  }

  .navbar__logo-text {
    font-size: 1rem;
  }

  .navbar__link {
    font-size: 0.75rem;
  }

  .navbar__login-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  }

  .navbar__search-icon {
    font-size: 1rem;
  }

  .navbar__search-dropdown {
    width: 220px;
    right: -40px;
  }
}
</style>
