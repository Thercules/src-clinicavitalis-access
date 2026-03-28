require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3001,
  BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:8080',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173'
}
