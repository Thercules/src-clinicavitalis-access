const config = require('../config/env')

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: config.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000
}

/**
 * Normalizes divergent login/register response shapes from the backend
 * into a consistent { token, user } structure.
 *
 * @param {Object} data - Raw backend response body
 * @returns {{ token: string|undefined, user: Object }}
 */
function normalizeLoginResponse(data) {
  const responseData = data.dados || data.data || data
  const usuarioData = responseData.usuario || responseData

  const token =
    responseData.token ||
    responseData.access_token ||
    responseData.jwt

  const user = {
    id: usuarioData.id || usuarioData.usuarioId,
    name:
      usuarioData.nome_completo ||
      usuarioData.nome ||
      usuarioData.name ||
      usuarioData.userName ||
      'Usuário',
    email: usuarioData.email,
    accessLevel: (
      usuarioData.nivel_de_acesso ||
      usuarioData.nivelDeAcesso ||
      'PACIENTE'
    ).toUpperCase()
  }

  return { token, user }
}

module.exports = { COOKIE_OPTIONS, normalizeLoginResponse }
