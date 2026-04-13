class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
    this.status = 400
  }
}

class MissingTokenError extends Error {
  constructor() {
    super('Token não encontrado na resposta do servidor')
    this.name = 'MissingTokenError'
    this.status = 502
  }
}

module.exports = { ValidationError, MissingTokenError }
