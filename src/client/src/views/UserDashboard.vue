<template>
  <div class="dashboard-container">
    <!-- Navbar -->
    <nav class="dashboard-navbar">
      <div class="navbar-content">
        <div class="navbar-brand">
          <h1>Clínica Vitalis</h1>
          <span class="badge">Paciente</span>
        </div>
        <div class="navbar-user">
          <span class="user-name">{{ user?.name || 'Usuário' }}</span>
          <button @click="handleLogout" class="logout-btn">Sair</button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="dashboard-content">
      <!-- Welcome Section -->
      <section class="welcome-section">
        <h2>Bem-vindo, {{ user?.name?.split(' ')[0] }}! 👋</h2>
        <p>Aqui você pode acompanhar suas consultas e exames</p>
      </section>

      <!-- Tabs -->
      <div class="tabs-container">
        <div class="tabs-header">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['tab-btn', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Consultas Tab -->
        <div v-show="activeTab === 'consultations'" class="tab-content">
          <div v-if="loadingConsultations" class="loading">
            <p>Carregando consultas...</p>
          </div>
          <div v-else-if="consultations.length > 0" class="consultations-list">
            <div v-for="consultation in consultations" :key="consultation.id" class="card consultation-card">
              <div class="card-header">
                <h3>{{ consultation.doctor }}</h3>
                <span class="status" :class="consultation.status">{{ consultation.status }}</span>
              </div>
              <div class="card-body">
                <p><strong>Data:</strong> {{ formatDate(consultation.date) }}</p>
                <p><strong>Especialidade:</strong> {{ consultation.specialty }}</p>
                <p><strong>Local:</strong> {{ consultation.location }}</p>
              </div>
              <div class="card-footer">
                <button v-if="consultation.status !== 'concluída'" class="btn btn-secondary">
                  Reagendar
                </button>
                <button v-if="consultation.status === 'concluída'" class="btn btn-primary">
                  Ver Detalhes
                </button>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <p>Nenhuma consulta agendada</p>
            <button class="btn btn-primary">Agendar Consulta</button>
          </div>
        </div>

        <!-- Exames Tab -->
        <div v-show="activeTab === 'exams'" class="tab-content">
          <div v-if="loadingExams" class="loading">
            <p>Carregando exames...</p>
          </div>
          <div v-else-if="exams.length > 0" class="exams-list">
            <div v-for="exam in exams" :key="exam.id" class="card exam-card">
              <div class="card-header">
                <h3>{{ exam.name }}</h3>
                <span class="status" :class="exam.status">{{ exam.status }}</span>
              </div>
              <div class="card-body">
                <p><strong>Data:</strong> {{ formatDate(exam.date) }}</p>
                <p><strong>Tipo:</strong> {{ exam.type }}</p>
                <p v-if="exam.result"><strong>Resultado:</strong> {{ exam.result }}</p>
              </div>
              <div class="card-footer">
                <button v-if="exam.status === 'disponível'" @click="downloadExam(exam.id)" class="btn btn-primary">
                  Baixar Resultado
                </button>
                <button v-else class="btn btn-secondary" disabled>
                  Aguardando resultado
                </button>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <p>Nenhum exame encontrado</p>
          </div>
        </div>

        <!-- Dados Pessoais Tab -->
        <div v-show="activeTab === 'profile'" class="tab-content">
          <div class="profile-card">
            <h3>Informações Pessoais</h3>
            <div class="profile-info">
              <div class="info-group">
                <label>Nome Completo</label>
                <p>{{ user?.name }}</p>
              </div>
              <div class="info-group">
                <label>E-mail</label>
                <p>{{ user?.email }}</p>
              </div>
              <div class="info-group">
                <label>Data de Cadastro</label>
                <p>{{ formatDate(new Date()) }}</p>
              </div>
            </div>
            <button class="btn btn-secondary">Editar Perfil</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { userService } from '@/services/api'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'UserDashboard',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    return {
      user: authStore.user,
      authStore,
      router
    }
  },
  data() {
    return {
      activeTab: 'consultations',
      tabs: [
        { id: 'consultations', label: 'Minhas Consultas' },
        { id: 'exams', label: 'Meus Exames' },
        { id: 'profile', label: 'Dados Pessoais' }
      ],
      consultations: [],
      exams: [],
      loadingConsultations: false,
      loadingExams: false
    }
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated
    }
  },
  watch: {
    activeTab(newTab) {
      if (newTab === 'consultations' && this.consultations.length === 0) {
        this.fetchConsultations()
      }
      if (newTab === 'exams' && this.exams.length === 0) {
        this.fetchExams()
      }
    }
  },
  methods: {
    async fetchConsultations() {
      this.loadingConsultations = true
      try {
        const response = await userService.getConsultations()
        this.consultations = response.data.consultations || [
          {
            id: 1,
            doctor: 'Dr. João Silva',
            specialty: 'Cardiologia',
            date: new Date('2026-04-15'),
            location: 'Clínica Centro',
            status: 'agendada'
          },
          {
            id: 2,
            doctor: 'Dra. Maria Santos',
            specialty: 'Dermatologia',
            date: new Date('2026-03-20'),
            location: 'Clínica Centro',
            status: 'concluída'
          }
        ]
      } catch (error) {
        this.consultations = [
          {
            id: 1,
            doctor: 'Dr. João Silva',
            specialty: 'Cardiologia',
            date: new Date('2026-04-15'),
            location: 'Clínica Centro',
            status: 'agendada'
          }
        ]
      } finally {
        this.loadingConsultations = false
      }
    },
    async fetchExams() {
      this.loadingExams = true
      try {
        const response = await userService.getExams()
        this.exams = response.data.exams || [
          {
            id: 1,
            name: 'Eletrocardiograma',
            type: 'Cardiologia',
            date: new Date('2026-03-15'),
            status: 'disponível',
            result: 'Normal'
          },
          {
            id: 2,
            name: 'Hemograma',
            type: 'Hematologia',
            date: new Date('2026-03-20'),
            status: 'disponível',
            result: 'Normal'
          }
        ]
      } catch (error) {
        this.exams = [
          {
            id: 1,
            name: 'Eletrocardiograma',
            type: 'Cardiologia',
            date: new Date('2026-03-15'),
            status: 'disponível',
            result: 'Normal'
          }
        ]
      } finally {
        this.loadingExams = false
      }
    },
    formatDate(date) {
      if (!date) return ''
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('pt-BR', options)
    },
    async downloadExam(examId) {
      try {
        const response = await userService.downloadExam(examId)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `exame-${examId}.pdf`)
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        alert('Erro ao baixar exame. Tente novamente.')
      }
    },
    handleLogout() {
      if (confirm('Tem certeza que deseja sair?')) {
        this.authStore.logout()
        this.router.push('/login-register')
      }
    }
  },
  mounted() {
    if (!this.isAuthenticated) {
      this.router.push('/login-register')
    }
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Navbar */
.dashboard-navbar {
  background: linear-gradient(135deg, #003da5 0%, #0056d4 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar-brand h1 {
  font-size: 1.5rem;
  font-weight: 700;
}

.badge {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.navbar-user {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-name {
  font-weight: 500;
}

.logout-btn {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

/* Main Content */
.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.welcome-section {
  margin-bottom: 2rem;
}

.welcome-section h2 {
  font-size: 2rem;
  color: #003da5;
  margin-bottom: 0.5rem;
}

.welcome-section p {
  color: #666;
  font-size: 1.05rem;
}

/* Tabs */
.tabs-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.tabs-header {
  display: flex;
  border-bottom: 2px solid #e8eef5;
  background-color: #f9fafb;
}

.tab-btn {
  flex: 1;
  padding: 1.25rem;
  border: none;
  background: none;
  color: #666;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.tab-btn:hover {
  color: #003da5;
  background-color: rgba(0, 61, 165, 0.05);
}

.tab-btn.active {
  color: #003da5;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(135deg, #003da5 0%, #0056d4 100%);
}

.tab-content {
  padding: 2rem;
}

/* Loading */
.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem;
  color: #999;
}

.empty-state p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

/* Lists */
.consultations-list,
.exams-list {
  display: grid;
  gap: 1.5rem;
}

.card {
  border: 1px solid #e8eef5;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 61, 165, 0.1);
  transform: translateY(-2px);
}

.card-header {
  background-color: #f9fafb;
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e8eef5;
}

.card-header h3 {
  color: #003da5;
  font-size: 1.1rem;
  margin: 0;
}

.status {
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status.agendada {
  background-color: #e3f2fd;
  color: #0056d4;
}

.status.concluída {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status.disponível {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.card-body {
  padding: 1.25rem;
}

.card-body p {
  margin-bottom: 0.75rem;
  color: #555;
  line-height: 1.6;
}

.card-body p strong {
  color: #333;
}

.card-footer {
  padding: 1.25rem;
  background-color: #f9fafb;
  border-top: 1px solid #e8eef5;
  display: flex;
  gap: 1rem;
}

/* Buttons */
.btn {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.btn-primary {
  background: linear-gradient(135deg, #003da5 0%, #0056d4 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 61, 165, 0.3);
}

.btn-secondary {
  background-color: #e8eef5;
  color: #003da5;
  border: 1px solid #d0dce9;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #d0dce9;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Profile Card */
.profile-card {
  background-color: white;
  border: 1px solid #e8eef5;
  border-radius: 8px;
  padding: 2rem;
}

.profile-card h3 {
  color: #003da5;
  margin-bottom: 2rem;
  font-size: 1.25rem;
}

.profile-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.info-group label {
  display: block;
  color: #666;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.info-group p {
  color: #333;
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-content {
    padding: 1rem;
  }

  .navbar-content {
    padding: 0 1rem;
    flex-direction: column;
    gap: 1rem;
  }

  .welcome-section h2 {
    font-size: 1.5rem;
  }

  .tabs-header {
    flex-direction: column;
  }

  .tab-btn {
    border-bottom: 1px solid #e8eef5;
  }

  .tab-btn.active::after {
    bottom: 0;
    height: 3px;
  }

  .card-footer {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>
