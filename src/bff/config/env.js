require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  BACKEND_URL: process.env.BACKEND_URL,
  NODE_ENV: process.env.NODE_ENV,
  CORS_ORIGIN: process.env.CORS_ORIGIN
}
