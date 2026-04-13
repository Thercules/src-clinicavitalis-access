const backendClient = require('../infrastructure/backendClient')

const medicosBackendAdapter = {
  listarMedicos: async () => {
    const response = await backendClient.get('/api/medicos')
    return response.data
  }
}

module.exports = medicosBackendAdapter
