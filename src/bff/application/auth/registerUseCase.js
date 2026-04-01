const { MissingTokenError } = require('../errors')

/**
 * @param {import('../../ports/IAuthBackend').IAuthBackend} authBackend
 * @param {{ normalizeLoginResponse: function }} authMapper
 */
function createRegisterUseCase(authBackend, authMapper) {
  return async function register(registerData) {
    const raw = await authBackend.register(registerData)
    const { token, user } = authMapper.normalizeLoginResponse(raw)
    if (!token) throw new MissingTokenError()
    return { token, user }
  }
}

module.exports = { createRegisterUseCase }
