const { MissingTokenError } = require('../errors')

/**
 * @param {import('../../ports/IAuthBackend').IAuthBackend} authBackend
 * @param {{ normalizeLoginResponse: function }} authMapper
 */
function createLoginUseCase(authBackend, authMapper) {
  return async function login(email, password) {
    const raw = await authBackend.login(email, password)
    const { token, user } = authMapper.normalizeLoginResponse(raw)
    if (!token) throw new MissingTokenError()
    return { token, user }
  }
}

module.exports = { createLoginUseCase }
