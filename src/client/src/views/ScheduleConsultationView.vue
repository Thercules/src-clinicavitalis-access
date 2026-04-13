<script>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default {
  name: "ScheduleConsultationView",
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    return { t, router }
  },
  data() {
    return {
      selectedDoctor: null,
      availableDates: [],
      lastAvailableDate: null,
      selectedDate: null,
      selectedTime: null,
      showConfirmationPopup: false,
      loading: false,
      error: "",
      currentMonth: new Date(),
    };
  },
  computed: {
    monthYear() {
      const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      return `${months[this.currentMonth.getMonth()]} de ${this.currentMonth.getFullYear()}`;
    },
    availableTimes() {
      const doctor = this.selectedDoctor
      if (!doctor) return []
      const interval = doctor.intervalo_consulta_minutos || 30
      const times = []
      const parseTime = (timeStr) => {
        if (!timeStr) return null
        const parts = timeStr.split(':').map(Number)
        return parts[0] * 60 + parts[1]
      }
      const formatTime = (minutes) => {
        const h = Math.floor(minutes / 60).toString().padStart(2, '0')
        const m = (minutes % 60).toString().padStart(2, '0')
        return `${h}:${m}`
      }
      const addSlots = (startStr, endStr) => {
        const start = parseTime(startStr)
        const end = parseTime(endStr)
        if (start === null || end === null) return
        for (let t = start; t < end; t += interval) {
          times.push(formatTime(t))
        }
      }
      addSlots(doctor.horario_inicio_manha, doctor.horario_fim_manha)
      addSlots(doctor.horario_inicio_tarde, doctor.horario_fim_tarde)
      return times
    },

    calendarDays() {
      const year = this.currentMonth.getFullYear();
      const month = this.currentMonth.getMonth();
      
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - firstDay.getDay());
      
      const days = [];
      let currentDate = new Date(startDate);
      
      while (days.length < 42) {
        days.push({
          date: new Date(currentDate),
          dateStr: currentDate.toISOString().split('T')[0],
          isCurrentMonth: currentDate.getMonth() === month,
          isAvailable: this.isDateAvailable(currentDate.toISOString().split('T')[0]),
          isSelected: this.selectedDate === currentDate.toISOString().split('T')[0],
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      return days;
    },
  },
  methods: {
    loadSelecteddoctor() {
      const doctor = localStorage.getItem('selectedDoctor');
      if (doctor) {
        this.selectedDoctor = JSON.parse(doctor);
      } else {
        this.error = "Nenhum médico foi selecionado";
        setTimeout(() => {
          this.router.push('/');
        }, 2000);
      }
    },
    
    async fetchAvailableDates() {
      try {
        this.loading = true
        const doctor = this.selectedDoctor
        if (!doctor?.dias_atendimento?.length) return

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const limitDate = doctor.data_limite_agendamento
          ? new Date(doctor.data_limite_agendamento + 'T00:00:00')
          : new Date(today.getFullYear(), today.getMonth() + 3, 0)

        const dates = []
        const cursor = new Date(today)

        while (cursor <= limitDate) {
          if (doctor.dias_atendimento.includes(cursor.getDay())) {
            dates.push(cursor.toISOString().split('T')[0])
          }
          cursor.setDate(cursor.getDate() + 1)
        }

        this.availableDates = dates
        this.lastAvailableDate = doctor.data_limite_agendamento ?? null
      } catch (err) {
        this.error = 'Erro ao carregar datas disponíveis'
      } finally {
        this.loading = false
      }
    },
    
    isDateAvailable(dateStr) {
      return this.availableDates.includes(dateStr);
    },
    
    isDateAfterLimit(dateStr) {
      if (!this.lastAvailableDate) return false;
      return dateStr > this.lastAvailableDate;
    },
    
    selectDate(dateStr) {
      if (!this.isDateAvailable(dateStr)) return;
      this.selectedDate = dateStr;
      this.selectedTime = null;
    },
    
    parseDate(dateStr) {
      const [year, month, day] = dateStr.split('-');
      return new Date(year, month - 1, day);
    },
    
    formatDateDisplay(dateStr) {
      const date = this.parseDate(dateStr);
      const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
      const months = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ];
      return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]}`;
    },
    
    navigateMonth(offset) {
      this.currentMonth.setMonth(this.currentMonth.getMonth() + offset);
      this.currentMonth = new Date(this.currentMonth);
    },
    
    async submitSchedule() {
      if (!this.selectedDate || !this.selectedTime) {
        this.error = "Por favor, selecione uma data e hora";
        return;
      }
      
      this.loading = true;
      
      try {
        const consultationData = {
          doctor: this.selectedDoctor,
          date: this.selectedDate,
          time: this.selectedTime,
          timestamp: new Date().toISOString()
        };
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        this.showConfirmationPopup = true;
      } catch (err) {
        this.error = "Erro ao agendar a consulta";
      } finally {
        this.loading = false;
      }
    },
    
    closePopup() {
      this.showConfirmationPopup = false;
      this.$router.push('/');
    },
  },
  mounted() {
    this.loadSelecteddoctor();
    this.fetchAvailableDates();
  },
};
</script>

<template>
  <div class="schedule-consultation-container">
    <div class="schedule-consultation-wrapper">
      <!-- Left Side - Branding -->
      <div class="schedule-consultation-sidebar">
        <div class="sidebar-content">
          <h1 class="clinic-name">Clínica Vitalis</h1>
          <p class="clinic-tagline">Agende sua consulta de forma rápida e fácil</p>
          <div class="sidebar-icons">
            <div class="icon-item">
              <span class="icon">📅</span>
              <p>Agende Online</p>
            </div>
            <div class="icon-item">
              <span class="icon">👨‍⚕️</span>
              <p>Médicos Disponíveis</p>
            </div>
            <div class="icon-item">
              <span class="icon">✅</span>
              <p>Confirmação Instantânea</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Schedule Form -->
      <div class="schedule-consultation-form">
        <div class="form-container">
          <h2 class="form-title">Agendar Consulta</h2>
          <p class="form-subtitle">Selecione a data e hora mais conveniente para você</p>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <!-- Doctor Info -->
          <div v-if="selectedDoctor" class="doctor-info-card">
            <img :src="selectedDoctor.image" :alt="selectedDoctor.name" class="doctor-info-image" />
            <div class="doctor-info-details">
              <div class="doctor-info-name">{{ selectedDoctor.name }}</div>
              <div class="doctor-info-specialty">{{ selectedDoctor.specialty }}</div>
              <div class="doctor-info-location">📍 {{ selectedDoctor.location }}</div>
            </div>
          </div>

          <!-- Calendar -->
          <div class="calendar-section">
            <div class="calendar-header">
              <button class="calendar-nav-btn" @click="navigateMonth(-1)">←</button>
              <h3 class="calendar-month-year">{{ monthYear }}</h3>
              <button class="calendar-nav-btn" @click="navigateMonth(1)">→</button>
            </div>

            <div class="calendar-weekdays">
              <div class="weekday">Dom</div>
              <div class="weekday">Seg</div>
              <div class="weekday">Ter</div>
              <div class="weekday">Qua</div>
              <div class="weekday">Qui</div>
              <div class="weekday">Sex</div>
              <div class="weekday">Sab</div>
            </div>

            <div class="calendar-days">
              <div
                v-for="day in calendarDays"
                :key="day.dateStr"
                class="calendar-day"
                :class="{
                  'calendar-day--other-month': !day.isCurrentMonth,
                  'calendar-day--available': day.isAvailable && day.isCurrentMonth,
                  'calendar-day--unavailable': !day.isAvailable && day.isCurrentMonth,
                  'calendar-day--selected': day.isSelected,
                  'calendar-day--after-limit': isDateAfterLimit(day.dateStr)
                }"
                @click="selectDate(day.dateStr)"
              >
                {{ day.date.getDate() }}
                <span v-if="isDateAfterLimit(day.dateStr)" class="limit-indicator">✕</span>
              </div>
            </div>
          </div>

          <!-- Time Selection -->
          <div v-if="selectedDate" class="time-section">
            <label class="time-label">Hora da Consulta</label>
            <div class="time-grid">
              <button
                v-for="time in availableTimes"
                :key="time"
                class="time-btn"
                :class="{ 'time-btn--selected': selectedTime === time }"
                @click="selectedTime = time"
              >
                {{ time }}
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            class="submit-btn"
            @click="submitSchedule"
            :disabled="!selectedDate || !selectedTime || loading"
          >
            {{ loading ? "Agendando..." : "Confirmar Agendamento" }}
          </button>

          <div class="back-link">
            <router-link to="/">Voltar para buscar outro médico</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Popup -->
    <div v-if="showConfirmationPopup" class="popup-overlay">
      <div class="popup-content">
        <div class="popup-success-icon">✅</div>
        <h2 class="popup-title">Consulta Agendada com Sucesso!</h2>
        <div class="popup-message">
          <p><strong>Médico:</strong> {{ selectedDoctor?.name }}</p>
          <p><strong>Especialidade:</strong> {{ selectedDoctor?.specialty }}</p>
          <p><strong>Data:</strong> {{ formatDateDisplay(selectedDate) }}</p>
          <p><strong>Hora:</strong> {{ selectedTime }}</p>
        </div>
        <p class="popup-note">Um e-mail de confirmação foi enviado para você</p>
        <button class="popup-btn" @click="closePopup">Voltar ao Início</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.schedule-consultation-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #003da5 0%, #0056d4 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 1rem;
}

.schedule-consultation-wrapper {
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.schedule-consultation-sidebar {
  display: flex;
  flex: 1;
  background: linear-gradient(135deg, #003da5 0%, #0056d4 100%);
  color: #fff;
  padding: 3rem 2rem;
  align-items: center;
  justify-content: center;
  min-height: 600px;
}

.sidebar-content {
  text-align: center;
}

.clinic-name {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.clinic-tagline {
  font-size: 1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.sidebar-icons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.icon-item .icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.icon-item p {
  font-size: 0.95rem;
  opacity: 0.9;
}

.schedule-consultation-form {
  flex: 1.2;
  padding: 2rem;
  overflow-y: auto;
  max-height: 100vh;
}

.form-container {
  max-width: 500px;
}

.form-title {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border-left: 4px solid #c62828;
}

.doctor-info-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  align-items: center;
}

.doctor-info-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.doctor-info-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.doctor-info-name {
  font-weight: 600;
  color: #333;
  font-size: 1rem;
}

.doctor-info-specialty {
  color: #666;
  font-size: 0.9rem;
}

.doctor-info-location {
  color: #999;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.calendar-section {
  margin-bottom: 1.5rem;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.calendar-nav-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #003da5;
  font-weight: bold;
}

.calendar-nav-btn:hover {
  color: #0056d4;
}

.calendar-month-year {
  font-size: 1.1rem;
  color: #333;
  font-weight: 600;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.weekday {
  font-weight: 600;
  color: #666;
  font-size: 0.85rem;
  padding: 0.5rem;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: default;
  font-size: 0.9rem;
  position: relative;
}

.calendar-day--other-month {
  color: #ccc;
  background-color: #fafafa;
}

.calendar-day--unavailable {
  color: #ccc;
  background-color: #f0f0f0;
}

.calendar-day--available {
  background-color: #e3f2fd;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}

.calendar-day--available:hover {
  background-color: #bbdefb;
  border: 2px solid #003da5;
}

.calendar-day--selected {
  background-color: #003da5;
  color: #fff;
  font-weight: 600;
}

.calendar-day--after-limit {
  background-color: #f5f5f5;
  color: #ccc;
  cursor: not-allowed;
}

.limit-indicator {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #c62828;
  color: #fff;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.time-section {
  margin-bottom: 1.5rem;
}

.time-label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.time-btn {
  padding: 0.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.time-btn:hover {
  border-color: #003da5;
  background-color: #e3f2fd;
}

.time-btn--selected {
  background-color: #003da5;
  color: #fff;
  border-color: #003da5;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #003da5 0%, #0056d4 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.submit-btn:hover:not(:disabled) {
  box-shadow: 0 5px 20px rgba(0, 61, 165, 0.4);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.back-link {
  text-align: center;
}

.back-link a {
  color: #003da5;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.back-link a:hover {
  color: #0056d4;
  text-decoration: underline;
}

/* Popup Styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-content {
  background-color: #fff;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.popup-success-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.popup-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.popup-message {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: left;
  font-size: 0.9rem;
}

.popup-message p {
  margin-bottom: 0.5rem;
  color: #333;
}

.popup-message p:last-child {
  margin-bottom: 0;
}

.popup-note {
  color: #666;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.popup-btn {
  background: linear-gradient(135deg, #003da5 0%, #0056d4 100%);
  color: #fff;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.popup-btn:hover {
  box-shadow: 0 5px 20px rgba(0, 61, 165, 0.4);
}

@media (max-width: 768px) {
  .schedule-consultation-wrapper {
    flex-direction: column;
  }

  .schedule-consultation-sidebar {
    min-height: auto;
    padding: 2rem 1rem;
  }

  .schedule-consultation-form {
    padding: 1.5rem;
  }

  .time-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .clinic-name {
    font-size: 1.8rem;
  }
}
</style>
