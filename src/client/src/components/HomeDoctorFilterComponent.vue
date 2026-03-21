<script>
import { useI18n } from 'vue-i18n'

export default {
  name: "HomeDoctorFilterComponent",
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      selectedSpecialty: "Clínico Geral",
      selectedLocation: "Olinda",
      searchQuery: "",
      showSpecialtyDropdown: false,
      selectedGender: "Todos",
      
      specialties: [
        { id: 1, name: "Clínico Geral", count: 928 },
        { id: 2, name: "Cirurgião", count: 687 },
        { id: 3, name: "Cirurgião Geral", count: 443 },
        { id: 4, name: "Cirurgião de Aparelho Digestivo", count: 363 },
        { id: 5, name: "Gastroenterologista Clínico", count: 355 },
        { id: 6, name: "Proctologista Clínico", count: 307 },
        { id: 7, name: "Cirurgião Bariátrico", count: 189 },
      ],
      
      doctors: [
        { id: 1, name: "Adélia Maria Guedes Neta", specialty: "Clínico Geral", location: "Olinda", gender: "Feminino", image: "https://i.ibb.co/qxHwQ1L/doctor1.jpg" },
        { id: 2, name: "Adimor Junior Diniz Pinheiro", specialty: "Clínico Geral", location: "Olinda", gender: "Masculino", image: "https://i.ibb.co/qxHwQ1L/doctor2.jpg" },
        { id: 3, name: "Adrian Ferreira Sial", specialty: "Clínico Geral", location: "Olinda", gender: "Masculino", image: "https://i.ibb.co/qxHwQ1L/doctor3.jpg" },
        { id: 4, name: "Adriano Silva Da Oliveira", specialty: "Clínico Geral", location: "Olinda", gender: "Masculino", image: "https://i.ibb.co/qxHwQ1L/doctor4.jpg" },
        { id: 5, name: "Adriano Tomas Pataca", specialty: "Cardiologista Clínico", location: "Olinda", gender: "Masculino", image: "https://i.ibb.co/qxHwQ1L/doctor5.jpg" },
        { id: 6, name: "Afonso Celso Pereira", specialty: "Cardiologista Clínico", location: "Olinda", gender: "Masculino", image: "https://i.ibb.co/qxHwQ1L/doctor6.jpg" },
        { id: 7, name: "Alberto Eduardo Dias", specialty: "Clínico Geral", location: "Olinda", gender: "Masculino", image: "https://i.ibb.co/qxHwQ1L/doctor7.jpg" },
        { id: 8, name: "Alcino Nicolau Soares", specialty: "Clínico Geral", location: "Olinda", gender: "Masculino", image: "https://i.ibb.co/qxHwQ1L/doctor8.jpg" },
      ],
    };
  },
  
  computed: {
    filteredDoctors() {
      return this.doctors.filter(doctor => {
        const matchesSpecialty = doctor.specialty.toLowerCase().includes(this.selectedSpecialty.toLowerCase());
        const matchesLocation = doctor.location.toLowerCase().includes(this.selectedLocation.toLowerCase());
        const matchesGender = this.selectedGender === "Todos" || doctor.gender === this.selectedGender;
        return matchesSpecialty && matchesLocation && matchesGender;
      });
    },

    filteredSpecialties() {
      if (!this.searchQuery) return this.specialties;
      return this.specialties.filter(spec =>
        spec.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  
  methods: {
    selectSpecialty(specialty) {
      this.selectedSpecialty = specialty.name;
      this.showSpecialtyDropdown = false;
      this.searchQuery = "";
    },
    
    clearSpecialty() {
      this.selectedSpecialty = "";
    },
    
    search() {
      console.log("Buscando doutores:", {
        especialidade: this.selectedSpecialty,
        localizacao: this.selectedLocation,
        genero: this.selectedGender,
      });
    },
  },
};
</script>

<template>
  <section class="doctor_filter">
    <div class="doctor_filter__overlay">
      <div class="doctor_filter__content">
        
        <div class="doctor_filter__left">
          <div class="doctor_filter__section">
            <h3 class="doctor_filter__subtitle">{{ t('homeDoctorFilter.specialties') }}</h3>
            <div class="doctor_filter__specialty-list">
              <div 
                v-for="specialty in specialties.slice(0, 7)" 
                :key="specialty.id"
                class="doctor_filter__specialty-item"
                @click="selectSpecialty(specialty)"
              >
                <span class="doctor_filter__specialty-icon">⏱</span>
                <div>
                  <div class="doctor_filter__specialty-name">{{ specialty.name }}</div>
                  <div class="doctor_filter__specialty-count">{{ specialty.count }} {{ t('homeDoctorFilter.genderOptions.male') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="doctor_filter__center">
          <h1 class="doctor_filter__title">{{ t('homeDoctorFilter.title') }}</h1>
          
          <div class="doctor_filter__search-container">
            <div class="doctor_filter__input-group">
              <label class="doctor_filter__label">{{ t('homeDoctorFilter.specialties') }}</label>
              <div class="doctor_filter__input-wrapper">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="doctor_filter__input"
                  :placeholder="t('homeDoctorFilter.searchDoctor')"
                  @focus="showSpecialtyDropdown = true"
                />
                <button 
                  v-if="selectedSpecialty"
                  class="doctor_filter__clear-btn"
                  @click="clearSpecialty"
                >
                  ✕
                </button>
              </div>

              <div 
                v-if="showSpecialtyDropdown"
                class="doctor_filter__dropdown"
              >
                <div 
                  v-for="specialty in filteredSpecialties"
                  :key="specialty.id"
                  class="doctor_filter__dropdown-item"
                  @click="selectSpecialty(specialty)"
                >
                  {{ specialty.name }}
                </div>
              </div>

              <div v-if="selectedSpecialty" class="doctor_filter__selected-tag">
                {{ selectedSpecialty }}
                <button class="doctor_filter__tag-close" @click="clearSpecialty">✕</button>
              </div>
            </div>

            <div class="doctor_filter__input-group">
              <label class="doctor_filter__label">{{ t('homeDoctorFilter.filterSearch') }}</label>
              <div class="doctor_filter__input-wrapper">
                <input
                  v-model="selectedLocation"
                  type="text"
                  class="doctor_filter__input"
                  placeholder="Digite a localização..."
                />
                <span class="doctor_filter__input-icon">📍</span>
              </div>
            </div>
          </div>

          <button class="doctor_filter__search-btn" @click="search">{{ t('homeDoctorFilter.searchButton') }}</button>

          <div class="doctor_filter__refine-section">
            <h3 class="doctor_filter__refine-title">{{ t('homeDoctorFilter.filterSearch') }}</h3>
            
            <div class="doctor_filter__refine-group">
              <label class="doctor_filter__refine-label">CONVÊNIO</label>
              <div class="doctor_filter__refine-input">
                <input type="text" placeholder="Selecionar convênio..." />
                <span class="doctor_filter__refine-icon">🔍</span>
              </div>
            </div>

            <div class="doctor_filter__refine-group">
              <label class="doctor_filter__refine-label">{{ t('homeDoctorFilter.gender') }}</label>
              <div class="doctor_filter__gender-options">
                <label class="doctor_filter__radio-label">
                  <input 
                    v-model="selectedGender" 
                    type="radio" 
                    value="Todos"
                    class="doctor_filter__radio"
                  />
                  <span>{{ t('homeDoctorFilter.genderOptions.all') }}</span>
                </label>
                <label class="doctor_filter__radio-label">
                  <input 
                    v-model="selectedGender" 
                    type="radio" 
                    value="Feminino"
                    class="doctor_filter__radio"
                  />
                  <span>{{ t('homeDoctorFilter.genderOptions.female') }}</span>
                </label>
                <label class="doctor_filter__radio-label">
                  <input 
                    v-model="selectedGender" 
                    type="radio" 
                    value="Masculino"
                    class="doctor_filter__radio"
                  />
                  <span>{{ t('homeDoctorFilter.genderOptions.male') }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="doctor_filter__right">
          <div class="doctor_filter__doctors-header">
            <h3 class="doctor_filter__doctors-title">{{ t('homeDoctorFilter.doctorsFound') }}</h3>
          </div>
          
          <div class="doctor_filter__doctors-list">
            <div 
              v-for="doctor in filteredDoctors"
              :key="doctor.id"
              class="doctor_filter__doctor-card"
            >
              <img :src="doctor.image" :alt="doctor.name" class="doctor_filter__doctor-image" />
              <div class="doctor_filter__doctor-info">
                <div class="doctor_filter__doctor-name">{{ doctor.name }}</div>
                <div class="doctor_filter__doctor-specialty">{{ doctor.specialty }}</div>
              </div>
            </div>
            
            <div v-if="filteredDoctors.length === 0" class="doctor_filter__no-results">
              {{ t('homeDoctorFilter.noResults') }}
            </div>
          </div>

          <button class="doctor_filter__consult-btn">{{ t('homeDoctorFilter.scheduleConsult') }}</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.doctor_filter {
  position: relative;
  width: 100%;
  background-color: #fff;
  padding: 2rem 0;
}

.doctor_filter__overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  padding-top: 15vh;
}

.doctor_filter__content {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  gap: 2rem;
  width: 100%;
  max-width: 1400px;
}

.doctor_filter__left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 0.9rem;
}

.doctor_filter__section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.doctor_filter__subtitle {
  font-size: 0.9rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
}

.doctor_filter__specialty-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.doctor_filter__specialty-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  align-items: center;
  border: 1px solid #f0f0f0;
}

.doctor_filter__specialty-item:hover {
  background-color: #f5f5f5;
}

.doctor_filter__specialty-icon {
  flex-shrink: 0;
  font-size: 1.2rem;
}

.doctor_filter__specialty-name {
  font-weight: 600;
  color: #003da5;
  font-size: 0.85rem;
}

.doctor_filter__specialty-count {
  color: #999;
  font-size: 0.75rem;
}

.doctor_filter__center {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.doctor_filter__title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  border-bottom: 3px solid #003da5;
  padding-bottom: 0.75rem;
}

.doctor_filter__search-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.doctor_filter__input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
}

.doctor_filter__label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #666;
  text-transform: uppercase;
}

.doctor_filter__input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.doctor_filter__input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
}

.doctor_filter__input:focus {
  border-color: #003da5;
}

.doctor_filter__input-icon {
  position: absolute;
  right: 1rem;
  font-size: 1.2rem;
  pointer-events: none;
}

.doctor_filter__clear-btn {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #999;
  padding: 0;
  display: flex;
  align-items: center;
}

.doctor_filter__dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
}

.doctor_filter__dropdown-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.9rem;
  border-bottom: 1px solid #f0f0f0;
  color: black;
}

.doctor_filter__dropdown-item:hover {
  background-color: #f5f5f5;
}

.doctor_filter__dropdown-item:last-child {
  border-bottom: none;
}

.doctor_filter__selected-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #333;
  width: fit-content;
  margin-top: 0.5rem;
}

.doctor_filter__tag-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #999;
  padding: 0;
}

.doctor_filter__search-btn {
  background-color: #f79646;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  font-weight: 700;
  font-size: 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-start;
}

.doctor_filter__search-btn:hover {
  background-color: #e67e35;
}

.doctor_filter__refine-section {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 6px;
}

.doctor_filter__refine-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
}

.doctor_filter__refine-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.doctor_filter__refine-group:last-child {
  margin-bottom: 0;
}

.doctor_filter__refine-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #666;
  text-transform: uppercase;
}

.doctor_filter__refine-input {
  position: relative;
  display: flex;
  align-items: center;
}

.doctor_filter__refine-input input {
  width: 100%;
  padding: 0.6rem 2rem 0.6rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.85rem;
  outline: none;
}

.doctor_filter__refine-input input:focus {
  border-color: #003da5;
}

.doctor_filter__refine-icon {
  position: absolute;
  right: 0.75rem;
  font-size: 1rem;
  pointer-events: none;
}

.doctor_filter__gender-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.doctor_filter__radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  color: #333;
}

.doctor_filter__radio {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.doctor_filter__right {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.doctor_filter__doctors-header {
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.75rem;
}

.doctor_filter__doctors-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #333;
}

.doctor_filter__doctors-list {
  flex: 1;
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.doctor_filter__doctor-card {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid #f0f0f0;
}

.doctor_filter__doctor-card:hover {
  background-color: #f5f5f5;
}

.doctor_filter__doctor-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.doctor_filter__doctor-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: center;
  flex: 1;
  min-width: 0;
}

.doctor_filter__doctor-name {
  font-weight: 600;
  color: #333;
  font-size: 0.85rem;
  word-break: break-word;
}

.doctor_filter__doctor-specialty {
  font-size: 0.75rem;
  color: #003da5;
}

.doctor_filter__no-results {
  text-align: center;
  color: #999;
  padding: 2rem 1rem;
  font-size: 0.9rem;
}

.doctor_filter__consult-btn {
  background-color: #003da5;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  font-weight: 700;
  font-size: 0.85rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.doctor_filter__consult-btn:hover {
  background-color: #002875;
}

@media (max-width: 1200px) {
  .doctor_filter__content {
    grid-template-columns: 200px 1fr 250px;
    gap: 1.5rem;
  }

  .doctor_filter__title {
    font-size: 1.5rem;
  }
}

@media (max-width: 992px) {
  .doctor_filter__content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .doctor_filter__left {
    max-height: 300px;
  }

  .doctor_filter__right {
    max-height: 300px;
  }

  .doctor_filter__title {
    font-size: 1.3rem;
  }
}

@media (max-width: 768px) {
  .doctor_filter__overlay {
    padding: 1rem;
  }

  .doctor_filter__title {
    font-size: 1.1rem;
  }

  .doctor_filter__search-container {
    gap: 0.75rem;
  }

  .doctor_filter__search-btn {
    width: 100%;
    align-self: center;
  }

  .doctor_filter__specialty-item {
    padding: 0.5rem;
  }

  .doctor_filter__doctor-card {
    gap: 0.5rem;
    padding: 0.5rem;
  }

  .doctor_filter__doctor-image {
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .doctor_filter__overlay {
    padding: 0.5rem;
  }

  .doctor_filter__content {
    grid-template-columns: 1fr;
  }

  .doctor_filter__title {
    font-size: 1rem;
  }

  .doctor_filter__subtitle {
    font-size: 0.8rem;
  }

  .doctor_filter__specialty-item {
    font-size: 0.75rem;
  }

  .doctor_filter__search-btn {
    padding: 0.6rem 1.5rem;
    font-size: 0.8rem;
  }
}
</style>
