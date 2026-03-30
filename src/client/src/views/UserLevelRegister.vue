<script>
import { useAuthStore } from '@/stores/auth'
import { authService } from '@/services/api'
import { useRouter } from 'vue-router'

export default {
  name: 'UserLevelRegister',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    return { authStore, router }
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      nomeCompleto: '',
      telefone: '',
      cpf: '',
      nivelDeAcesso: 'PACIENTE',
      error: '',
      success: '',
      loading: false,
      accessLevels: [
        { value: 'PACIENTE', label: 'Paciente' },
        { value: 'MEDICO', label: 'Médico' },
        { value: 'ENFERMEIRA', label: 'Enfermeira' },
        { value: 'GESTOR', label: 'Gestor' },
        { value: 'ADM', label: 'Administrador' },
        { value: 'GM', label: 'Game Master (GM)' },
      ],
    }
  },
  computed: {
    isGM() {
      return this.authStore.user?.accessLevel === 'GM'
    },
  },
  methods: {
    resetForm() {
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.nomeCompleto = ''
      this.telefone = ''
      this.cpf = ''
      this.nivelDeAcesso = 'PACIENTE'
      this.error = ''
    },
    async handleSubmit() {
      this.error = ''
      this.success = ''

      if (
        !this.email ||
        !this.password ||
        !this.confirmPassword ||
        !this.nomeCompleto ||
        !this.telefone ||
        !this.cpf ||
        !this.nivelDeAcesso
      ) {
        this.error = 'Preencha todos os campos obrigatórios'
        return
      }

      if (this.password !== this.confirmPassword) {
        this.error = 'As senhas não correspondem'
        return
      }

      this.loading = true

      try {
        const response = await authService.registerWithAccessLevel({
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          nome_completo: this.nomeCompleto,
          telefone: this.telefone,
          cpf: this.cpf,
          nivel_de_acesso: this.nivelDeAcesso.toLowerCase(),
        })

        const dados = response.data?.dados
        const label = this.getLevelLabel(this.nivelDeAcesso)
        this.success = `Usuário "${dados?.nome_completo || this.nomeCompleto}" registrado com sucesso como ${label}!`
        this.resetForm()
      } catch (err) {
        this.error = err.message || 'Erro ao registrar usuário. Verifique os dados.'
      } finally {
        this.loading = false
      }
    },
    getLevelLabel(value) {
      const found = this.accessLevels.find((l) => l.value === value)
      return found ? found.label : value
    },
  },
  mounted() {
    if (!this.authStore.isAuthenticated) {
      this.router.push('/login-register')
      return
    }
    if (!this.isGM) {
      this.router.push('/user-dashboard')
    }
  },
}
</script>

<template>
  <div class="ulr-container">
    <!-- Header -->
    <header class="ulr-header">
      <div class="header-content">
        <div class="header-brand">
          <h1>Clínica Vitalis</h1>
          <span class="gm-badge">Game Master</span>
        </div>
        <div class="header-actions">
          <span class="logged-as">{{ authStore.user?.name }}</span>
          <button class="back-btn" @click="router.push('/user-dashboard')">
            ← Voltar ao Dashboard
          </button>
        </div>
      </div>
    </header>

    <!-- Page content -->
    <div class="ulr-content">
      <div class="form-card">
        <!-- Title -->
        <div class="form-header">
          <div class="gm-icon">👑</div>
          <h2>Registrar Novo Usuário</h2>
          <p>Área exclusiva Game Master — cadastre usuários com qualquer nível de acesso</p>
        </div>

        <!-- Success message -->
        <div v-if="success" class="success-message">
          {{ success }}
        </div>

        <!-- Error message -->
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <form @submit.prevent="handleSubmit" class="form">
          <div class="form-grid">
            <!-- Nome Completo -->
            <div class="form-group full-width">
              <label for="nomeCompleto">Nome Completo</label>
              <input
                v-model="nomeCompleto"
                type="text"
                id="nomeCompleto"
                placeholder="Nome completo do usuário"
                :disabled="loading"
                required
              />
            </div>

            <!-- Email -->
            <div class="form-group">
              <label for="email">E-mail</label>
              <input
                v-model="email"
                type="email"
                id="email"
                placeholder="email@exemplo.com"
                :disabled="loading"
                required
              />
            </div>

            <!-- CPF -->
            <div class="form-group">
              <label for="cpf">CPF</label>
              <input
                v-model="cpf"
                type="text"
                id="cpf"
                placeholder="123.456.789-09"
                :disabled="loading"
                required
              />
            </div>

            <!-- Telefone -->
            <div class="form-group">
              <label for="telefone">Telefone</label>
              <input
                v-model="telefone"
                type="tel"
                id="telefone"
                placeholder="(11) 98765-4321"
                :disabled="loading"
                required
              />
            </div>

            <!-- Nível de Acesso -->
            <div class="form-group">
              <label for="nivelDeAcesso">Nível de Acesso</label>
              <select
                v-model="nivelDeAcesso"
                id="nivelDeAcesso"
                :disabled="loading"
                required
              >
                <option
                  v-for="level in accessLevels"
                  :key="level.value"
                  :value="level.value"
                >
                  {{ level.label }}
                </option>
              </select>
            </div>

            <!-- Senha -->
            <div class="form-group">
              <label for="password">Senha</label>
              <input
                v-model="password"
                type="password"
                id="password"
                placeholder="Mínimo 6 caracteres"
                :disabled="loading"
                required
              />
            </div>

            <!-- Confirmar Senha -->
            <div class="form-group">
              <label for="confirmPassword">Confirmar Senha</label>
              <input
                v-model="confirmPassword"
                type="password"
                id="confirmPassword"
                placeholder="Confirme a senha"
                :disabled="loading"
                required
              />
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-cancel" @click="resetForm" :disabled="loading">
              Limpar
            </button>
            <button type="submit" class="btn-submit" :disabled="loading">
              {{ loading ? 'Registrando...' : 'Registrar Usuário' }}
            </button>
          </div>
        </form>
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

.ulr-container {
  min-height: 100vh;
  background-color: #fff5f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header */
.ulr-header {
  background: linear-gradient(135deg, #b71c1c 0%, #d32f2f 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-brand h1 {
  font-size: 1.5rem;
  font-weight: 700;
}

.gm-badge {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.logged-as {
  font-size: 0.9rem;
  opacity: 0.9;
}

.back-btn {
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.back-btn:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

/* Content */
.ulr-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
}

.form-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #ffcdd2;
  box-shadow: 0 4px 20px rgba(183, 28, 28, 0.08);
  overflow: hidden;
}

.form-header {
  background: linear-gradient(135deg, #b71c1c 0%, #d32f2f 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.gm-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.form-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.form-header p {
  font-size: 0.95rem;
  opacity: 0.9;
}

/* Messages */
.success-message {
  margin: 1.5rem 2rem 0;
  padding: 1rem;
  background-color: #e8f5e9;
  color: #2e7d32;
  border-left: 4px solid #2e7d32;
  border-radius: 4px;
  font-size: 0.95rem;
  font-weight: 500;
}

.error-message {
  margin: 1.5rem 2rem 0;
  padding: 1rem;
  background-color: #ffebee;
  color: #c62828;
  border-left: 4px solid #c62828;
  border-radius: 4px;
  font-size: 0.95rem;
}

/* Form */
.form {
  padding: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select {
  padding: 0.875rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.3s;
  outline: none;
  background-color: white;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #d32f2f;
  box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1);
}

.form-group input:disabled,
.form-group select:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}

/* Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #ffe0e0;
}

.btn-cancel {
  padding: 0.75rem 1.5rem;
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel:hover:not(:disabled) {
  background-color: #e8e8e8;
}

.btn-cancel:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-submit {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #b71c1c 0%, #d32f2f 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(183, 28, 28, 0.4);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }

  .ulr-content {
    padding: 1.5rem 1rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: 1;
  }

  .form {
    padding: 1.5rem 1rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-cancel,
  .btn-submit {
    width: 100%;
    text-align: center;
  }
}
</style>
