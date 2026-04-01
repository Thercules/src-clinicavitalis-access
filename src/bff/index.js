require('./bff_start_banner')

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const config = require('./config/env')
const errorHandler = require('./middleware/errorHandler')

const authRoutes = require('./routes/auth')

const app = express()
app.use(cors({
  origin: config.CORS_ORIGIN,
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'BFF is running' })
})

app.use('/api/auth', authRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
})

app.use(errorHandler)

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`BFF running on port ${PORT}`)
  console.log(`Environment: ${config.NODE_ENV}`)
})
