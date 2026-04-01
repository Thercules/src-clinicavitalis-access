const express = require('express')
const authController = require('../controllers/authController')
const { authMiddleware, optionalAuth } = require('../middleware/auth')

const router = express.Router()

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/register-with-access-level', authMiddleware, authController.registerWithAccessLevel)
router.post('/logout', optionalAuth, authController.logout)
router.post('/refresh', optionalAuth, authController.refreshToken)

module.exports = router
