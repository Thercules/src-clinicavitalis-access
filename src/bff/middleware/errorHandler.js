const config = require('../config/env')

const errorHandler = (err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    status: err.status || 500,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  })

  const status = err.status || err.response?.status || 500
  const message = err.message || 'Erro interno do servidor'

  res.status(status).json({
    error: {
      message,
      status,
      ...(config.NODE_ENV === 'development' && { stack: err.stack })
    }
  })
}

module.exports = errorHandler
