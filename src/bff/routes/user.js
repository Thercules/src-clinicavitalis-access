const express = require('express')
const userController = require('../controllers/userController')
const { authMiddleware } = require('../middleware/auth')

const router = express.Router()

// Todas as rotas de user requerem autenticação
router.use(authMiddleware)

router.get('/profile', userController.getProfile)
router.get('/consultations', userController.getConsultations)
router.get('/exams', userController.getExams)
router.get('/exams/:examId/download', userController.downloadExam)

module.exports = router
