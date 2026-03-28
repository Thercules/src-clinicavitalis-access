const authService = require('../services/authService')

const authController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' })
      }

      const data = await authService.login(email, password)
      res.json(data)
    } catch (error) {
      next(error)
    }
  },

  logout: async (req, res, next) => {
    try {
      const token = req.token
      await authService.logout(token)
      res.json({ message: 'Logout realizado com sucesso' })
    } catch (error) {
      next(error)
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const token = req.token
      const data = await authService.refreshToken(token)
      res.json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = authController
