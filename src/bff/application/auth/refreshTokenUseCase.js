/**
 * @param {import('../../ports/IAuthBackend').IAuthBackend} authBackend
 * @param {{ normalizeLoginResponse: function }} authMapper
 */
function createRefreshTokenUseCase(authBackend, authMapper) {
  return async function refreshToken(token) {
    const raw = await authBackend.refreshToken(token)
    const { token: newToken } = authMapper.normalizeLoginResponse(raw)
    return { newToken }
  }
}

module.exports = { createRefreshTokenUseCase }
