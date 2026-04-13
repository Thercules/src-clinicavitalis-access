const express = require('express')
const { authMiddleware, optionalAuth } = require('../middleware/auth')
const authValidator = require('../validators/authValidator')
const authBackendAdapter = require('../adapters/authBackendAdapter')
const authMapper = require('../mappers/authMapper')
const { createLoginUseCase } = require('../application/auth/loginUseCase')
const { createRegisterUseCase } = require('../application/auth/registerUseCase')
const { createRegisterWithAccessLevelUseCase } = require('../application/auth/registerWithAccessLevelUseCase')
const { createRefreshTokenUseCase } = require('../application/auth/refreshTokenUseCase')

// Compose use cases with their dependencies once at startup
const loginUseCase = createLoginUseCase(authBackendAdapter, authMapper)
const registerUseCase = createRegisterUseCase(authBackendAdapter, authMapper)
const registerWithAccessLevelUseCase = createRegisterWithAccessLevelUseCase(authBackendAdapter)
const refreshTokenUseCase = createRefreshTokenUseCase(authBackendAdapter, authMapper)

const router = express.Router()

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    authValidator.validateLogin({ email, password })
    const { token, user } = await loginUseCase(email, password)
    res.cookie('authToken', token, authMapper.COOKIE_OPTIONS)
    res.json({ user })
  } catch (error) {
    next(error)
  }
})

router.post('/register', async (req, res, next) => {
  try {
    const { email, password, confirmPassword, nome_completo, telefone, cpf, nivel_de_acesso } = req.body
    authValidator.validateRegister({ email, password, confirmPassword, nome_completo, telefone, cpf })
    const { token, user } = await registerUseCase({
      email,
      password,
      confirmPassword,
      nome_completo,
      telefone,
      cpf,
      nivel_de_acesso: nivel_de_acesso || 'PACIENTE'
    })
    res.cookie('authToken', token, authMapper.COOKIE_OPTIONS)
    res.json({ user })
  } catch (error) {
    next(error)
  }
})

router.post('/register-with-access-level', authMiddleware, async (req, res, next) => {
  try {
    const { email, password, confirmPassword, nome_completo, telefone, cpf, nivel_de_acesso } = req.body
    authValidator.validateRegisterWithAccessLevel({
      email,
      password,
      confirmPassword,
      nome_completo,
      telefone,
      nivel_de_acesso
    })
    const data = await registerWithAccessLevelUseCase(
      { email, password, confirmPassword, nome_completo, telefone, cpf, nivel_de_acesso },
      req.token
    )
    res.status(201).json({
      sucesso: data.sucesso,
      mensagem: data.mensagem,
      dados: data.dados
    })
  } catch (error) {
    next(error)
  }
})

router.post('/logout', optionalAuth, async (req, res, next) => {
  try {
    // Logout is BFF-only: clear the httpOnly cookie.
    // The Quarkus backend has no logout endpoint.
    res.clearCookie('authToken', authMapper.COOKIE_OPTIONS)
    res.json({ message: 'Logout realizado com sucesso' })
  } catch (error) {
    next(error)
  }
})

router.post('/refresh', optionalAuth, async (req, res, next) => {
  try {
    const { newToken } = await refreshTokenUseCase(req.token)
    if (newToken) {
      res.cookie('authToken', newToken, authMapper.COOKIE_OPTIONS)
    }
    res.json({ message: 'Token renovado com sucesso' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
