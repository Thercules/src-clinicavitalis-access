<script>
export default {
  name: "LoginRegister",
  data() {
    return {
      isLogin: true,
    };
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
    },
  },
};
</script>

<template>
  <div class="login-register">
    <h2>{{ isLogin ? "Login" : "Cadastro" }}</h2>
    <form>
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Senha</label>
        <input type="password" id="password" required />
      </div>
      <div class="form-group">
        <button type="submit">{{ isLogin ? "Entrar" : "Cadastrar" }}</button>
      </div>
    </form>
    <p @click="toggleForm" class="toggle-link">
      {{ isLogin ? "Não tem conta? Cadastre-se" : "Já tem uma conta? Faça login" }}
    </p>
  </div>
</template>

<style scoped>
.login-register {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #52a9ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #4078b2;
}

.toggle-link {
  text-align: center;
  margin-top: 10px;
  color: #52a9ff;
  cursor: pointer;
}

.toggle-link:hover {
  text-decoration: underline;
}
</style>
