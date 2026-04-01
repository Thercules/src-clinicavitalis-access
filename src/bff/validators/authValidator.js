const { ValidationError } = require('../application/errors')

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateLogin({ email, password }) {
  if (!email || !password) {
    throw new ValidationError('Email e senha são obrigatórios')
  }
}

function validateRegister({ email, password, confirmPassword, nome_completo, telefone, cpf }) {
  if (!email || !password || !confirmPassword || !nome_completo || !telefone || !cpf) {
    throw new ValidationError('Email, senha, nome completo, telefone e CPF são obrigatórios')
  }
  if (password !== confirmPassword) {
    throw new ValidationError('As senhas não correspondem')
  }
  if (password.length < 6) {
    throw new ValidationError('Senha deve ter no mínimo 6 caracteres')
  }
  if (!EMAIL_REGEX.test(email)) {
    throw new ValidationError('Email inválido')
  }
}

function validateRegisterWithAccessLevel({
  email,
  password,
  confirmPassword,
  nome_completo,
  telefone,
  nivel_de_acesso
}) {
  if (!email || !password || !confirmPassword || !nome_completo || !telefone || !nivel_de_acesso) {
    throw new ValidationError(
      'Email, senha, nome completo, telefone e nível de acesso são obrigatórios'
    )
  }
  if (password !== confirmPassword) {
    throw new ValidationError('As senhas não correspondem')
  }
  if (password.length < 6) {
    throw new ValidationError('Senha deve ter no mínimo 6 caracteres')
  }
}

module.exports = { validateLogin, validateRegister, validateRegisterWithAccessLevel }
