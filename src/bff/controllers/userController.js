const userService = require('../services/userService')

const userController = {
  getProfile: async (req, res, next) => {
    try {
      const token = req.token
      const data = await userService.getProfile(token)
      res.json(data)
    } catch (error) {
      next(error)
    }
  },

  getConsultations: async (req, res, next) => {
    try {
      const token = req.token
      const data = await userService.getConsultations(token)
      res.json(data)
    } catch (error) {
      next(error)
    }
  },

  getExams: async (req, res, next) => {
    try {
      const token = req.token
      const data = await userService.getExams(token)
      res.json(data)
    } catch (error) {
      next(error)
    }
  },

  downloadExam: async (req, res, next) => {
    try {
      const { examId } = req.params
      const token = req.token

      const blobData = await userService.downloadExam(examId, token)
      res.type('application/octet-stream')
      res.attachment(`exam-${examId}.pdf`)
      res.send(blobData)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController
