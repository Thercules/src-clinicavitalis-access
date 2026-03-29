<script>
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export default {
  name: "LoginRegister",
  setup() {
    const { t } = useI18n()
    const authStore = useAuthStore()
    const router = useRouter()

    return { t, authStore, router }
  },
  data() {
    return {
      isLogin: true,
      email: "",
      password: "",
      confirmPassword: "",
      nomeCompleto: "",
      telefone: "",
      cpf: "",
      nivelDeAcesso: "PACIENTE",
      error: "",
      loading: false,
    };
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated
    }
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
      this.error = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.nomeCompleto = "";
      this.telefone = "";
      this.cpf = "";
      this.nivelDeAcesso = "PACIENTE";
    },
    async handleSubmit() {
      if (this.isLogin) {
        if (!this.email || !this.password) {
          this.error = "Preencha todos os campos obrigatórios";
          return;
        }

        this.loading = true;
        this.error = "";

        try {
          await this.authStore.login(this.email, this.password);
          this.router.push('/user-dashboard');
        } catch (err) {
          this.error = err.response?.data?.message || "Erro ao fazer login. Verifique suas credenciais.";
        } finally {
          this.loading = false;
        }
      } else {
        if (
          !this.email ||
          !this.password ||
          !this.confirmPassword ||
          !this.nomeCompleto ||
          !this.telefone ||
          !this.cpf ||
          !this.nivelDeAcesso
        ) {
          this.error = "Preencha todos os campos obrigatórios";
          return;
        }

        if (this.password !== this.confirmPassword) {
          this.error = "As senhas não correspondem";
          return;
        }

        this.loading = true;
        this.error = "";

        try {
          const response = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
              confirmPassword: this.confirmPassword,
              nome_completo: this.nomeCompleto,
              telefone: this.telefone,
              cpf: this.cpf,
              nivel_de_acesso: this.nivelDeAcesso.toLowerCase(),
            }),
          });

          if (!response.ok) {
            const data = await response.json();
            this.error = data.message || data.error || "Erro ao registrar. Tente novamente.";
            return;
          }

          try {
            await this.authStore.login(this.email, this.password);
            this.router.push('/user-dashboard');
          } catch (loginErr) {
            this.error = loginErr.message || "Cadastro realizado, mas erro ao fazer login automático. Faça login manualmente.";
          }
        } catch (err) {
          this.error = err.message || "Erro ao registrar. Verifique os dados.";
        } finally {
          this.loading = false;
        }
      }
    },
  },
  mounted() {
    if (this.isAuthenticated) {
      this.router.push('/user-dashboard');
    }
  }
};
</script>

<template>
  <div class="login-register-container">
    <div class="login-register-wrapper">
      <!-- Left Side - Branding -->
      <div class="login-register-sidebar">
        <div class="sidebar-content">
          <h1 class="clinic-name">Clínica Vitalis</h1>
          <p class="clinic-tagline">Saúde e bem-estar em primeiro lugar</p>
          <div class="sidebar-icons">
            <div class="icon-item">
              <span class="icon">🏥</span>
              <p>Atendimento de Excelência</p>
            </div>
            <div class="icon-item">
              <span class="icon">👨‍⚕️</span>
              <p>Médicos Qualificados</p>
            </div>
            <div class="icon-item">
              <span class="icon">🕐</span>
              <p>Agendamento Online</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Form -->
      <div class="login-register-form">
        <div class="form-container">
          <h2 class="form-title">{{ isLogin ? "Faça seu Login" : "Crie sua Conta" }}</h2>
          <p class="form-subtitle">
            {{ isLogin ? "Acesse sua conta para agendar consultas" : "Registre-se para começar a usar nossos serviços" }}
          </p>

          <form @submit.prevent="handleSubmit" class="form">
            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <div class="form-group">
              <label for="email">E-mail</label>
              <input
                v-model="email"
                type="email"
                id="email"
                placeholder="seu@email.com"
                required
                :disabled="loading"
              />
            </div>

            <div class="form-group">
              <label for="password">Senha</label>
              <input
                v-model="password"
                type="password"
                id="password"
                placeholder="Mínimo 6 caracteres"
                required
                :disabled="loading"
              />
            </div>

            <div v-if="!isLogin" class="form-group">
              <label for="confirmPassword">Confirmar Senha</label>
              <input
                v-model="confirmPassword"
                type="password"
                id="confirmPassword"
                placeholder="Confirme sua senha"
                required
                :disabled="loading"
              />
            </div>

            <div v-if="!isLogin" class="form-group">
              <label for="nomeCompleto">Nome Completo</label>
              <input
                v-model="nomeCompleto"
                type="text"
                id="nomeCompleto"
                placeholder="Seu nome completo"
                required
                :disabled="loading"
              />
            </div>

            <div v-if="!isLogin" class="form-group">
              <label for="telefone">Telefone</label>
              <input
                v-model="telefone"
                type="tel"
                id="telefone"
                placeholder="(11) 98765-4321"
                required
                :disabled="loading"
              />
            </div>

            <div v-if="!isLogin" class="form-group">
              <label for="cpf">CPF</label>
              <input
                v-model="cpf"
                type="text"
                id="cpf"
                placeholder="123.456.789-09"
                required
                :disabled="loading"
              />
            </div>

            <button 
              type="submit" 
              class="submit-btn"
              :disabled="loading"
            >
              {{ loading ? "Processando..." : (isLogin ? "Entrar" : "Cadastrar") }}
            </button>
          </form>

          <div class="form-footer">
            <p class="toggle-text">
              {{ isLogin ? "Não tem conta?" : "Já tem uma conta?" }}
              <button
                type="button"
                class="toggle-link"
                @click="toggleForm"
                :disabled="loading"
              >
                {{ isLogin ? "Cadastre-se aqui" : "Faça login aqui" }}
              </button>
            </p>
          </div>

          <div class="forgot-password" v-if="isLogin">
            <a href="#" class="forgot-link">Esqueceu sua senha?</a>
          </div>
        </div>
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

.login-register-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #003da5 0%, #0056d4 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-register-wrapper {
  display: flex;
  width: 90%;
  max-width: 1000px;
  height: auto;
  max-height: none;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.login-register-sidebar {
  display: flex;
  flex: 1;
  background: linear-gradient(135deg, #003da5 0%, #0056d4 100%);
  color: #fff;
  padding: 3rem 2rem;
  align-items: center;
  justify-content: center;
}

.sidebar-content {
  text-align: center;
}

.clinic-name {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.clinic-tagline {
  font-size: 1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  font-weight: 300;
}

.sidebar-icons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.icon-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.icon {
  font-size: 2rem;
}

.icon-item p {
  font-size: 0.95rem;
  font-weight: 500;
}

.login-register-form {
  flex: 1;
  padding: 3rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}

.form-container {
  width: 100%;
}

.form-title {
  font-size: 1.75rem;
  color: #003da5;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.form-subtitle {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 0.95rem;
}

.form-group input {
  padding: 0.875rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.3s;
  outline: none;
  font-family: inherit;
}

.form-group input:focus {
  border-color: #003da5;
  box-shadow: 0 0 0 3px rgba(0, 61, 165, 0.1);
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}

.error-message {
  padding: 0.875rem;
  background-color: #fee;
  color: #c33;
  border-left: 4px solid #c33;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.submit-btn {
  padding: 0.975rem;
  background: linear-gradient(135deg, #003da5 0%, #0056d4 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 61, 165, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-footer {
  margin-top: 1.5rem;
  text-align: center;
}

.toggle-text {
  color: #666;
  font-size: 0.9rem;
}

.toggle-link {
  background: none;
  border: none;
  color: #003da5;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.3s;
  font-size: 0.9rem;
  padding: 0;
}

.toggle-link:hover:not(:disabled) {
  color: #0056d4;
  text-decoration: underline;
}

.toggle-link:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.forgot-password {
  margin-top: 1rem;
  text-align: center;
}

.forgot-link {
  color: #003da5;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.forgot-link:hover {
  color: #0056d4;
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .login-register-wrapper {
    flex-direction: column;
    max-height: none;
    width: 95%;
  }

  .login-register-sidebar {
    padding: 2rem;
    border-radius: 12px 12px 0 0;
  }

  .clinic-name {
    font-size: 1.75rem;
  }

  .sidebar-icons {
    gap: 1rem;
  }

  .icon-item {
    padding: 0.75rem;
  }

  .icon {
    font-size: 1.5rem;
  }

  .icon-item p {
    font-size: 0.85rem;
  }

  .login-register-form {
    padding: 2rem 1.5rem;
  }

  .form-container {
    width: 100%;
  }

  .form-title {
    font-size: 1.5rem;
  }

  .submit-btn {
    padding: 0.875rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .login-register-container {
    padding: 1rem;
  }

  .login-register-wrapper {
    width: 100%;
    border-radius: 8px;
  }

  .login-register-sidebar {
    padding: 1.5rem 1rem;
  }

  .clinic-name {
    font-size: 1.5rem;
  }

  .clinic-tagline {
    font-size: 0.85rem;
    margin-bottom: 1.5rem;
  }

  .sidebar-icons {
    gap: 0.75rem;
  }

  .icon-item {
    padding: 0.6rem 0.75rem;
    gap: 0.75rem;
  }

  .icon {
    font-size: 1.25rem;
  }

  .icon-item p {
    font-size: 0.75rem;
  }

  .login-register-form {
    padding: 1.5rem 1rem;
  }

  .form-title {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }

  .form-subtitle {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }

  .form {
    gap: 1rem;
  }

  .form-group input {
    padding: 0.75rem;
    font-size: 0.9rem;
  }

  .submit-btn {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
