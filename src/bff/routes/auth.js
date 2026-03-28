const express = require('express')
const authController = require('../controllers/authController')
const { optionalAuth } = require('../middleware/auth')

const router = express.Router()

router.post('/login', authController.login)
router.post('/logout', optionalAuth, authController.logout)
router.post('/refresh', optionalAuth, authController.refreshToken)

module.exports = router
