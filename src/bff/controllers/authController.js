const authService = require('../services/authService')
const config = require('../config/env')

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: config.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000
}

function normalizeLoginResponse(data) {  
  const responseData = data.dados || data.data || data  
  const token = responseData.token || responseData.access_token || responseData.jwt
  const user = {
    id: responseData.id || responseData.usuarioId,
    name: responseData.nome_completo || responseData.nome || responseData.name || responseData.userName || 'Usuário',
    email: responseData.email
  }
  return { token, user }
}

const authController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' })
      }

      const data = await authService.login(email, password)
      
      const { token, user } = normalizeLoginResponse(data)

      if (!token) {
        return res.status(502).json({ error: 'Token não encontrado na resposta do servidor' })
      }

      res.cookie('authToken', token, COOKIE_OPTIONS)
      res.json({ user })
    } catch (error) {
      next(error)
    }
  },

  register: async (req, res, next) => {
    try {
      const {
        email,
        password,
        confirmPassword,
        nome_completo,
        telefone,
        cpf,
        nivel_de_acesso
      } = req.body

      if (!email || !password || !confirmPassword || !nome_completo || !telefone || !cpf) {
        return res.status(400).json({
          error: 'Email, senha, nome completo, telefone e CPF são obrigatórios'
        })
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'As senhas não correspondem' })
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' })
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Email inválido' })
      }

      const registerData = {
        email,
        password,
        confirmPassword,
        nome_completo,
        telefone,
        cpf,
        nivel_de_acesso: nivel_de_acesso || 'PACIENTE'
      }

      const data = await authService.register(registerData)
      
      const { token, user } = normalizeLoginResponse(data)

      if (!token) {
        return res.status(502).json({ error: 'Token não encontrado na resposta do servidor' })
      }

      res.cookie('authToken', token, COOKIE_OPTIONS)
      res.json({ user })
    } catch (error) {
      next(error)
    }
  },

  logout: async (req, res, next) => {
    try {
      const token = req.token
      await authService.logout(token)
      res.clearCookie('authToken', { httpOnly: true, sameSite: 'strict', secure: config.NODE_ENV === 'production' })
      res.json({ message: 'Logout realizado com sucesso' })
    } catch (error) {
      next(error)
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const token = req.token
      const data = await authService.refreshToken(token)
      const { token: newToken } = normalizeLoginResponse(data)
      if (newToken) {
        res.cookie('authToken', newToken, COOKIE_OPTIONS)
      }
      res.json({ message: 'Token renovado com sucesso' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = authController
