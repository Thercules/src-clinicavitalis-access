/**
 * @param {import('../../ports/IAuthBackend').IAuthBackend} authBackend
 */
function createRegisterWithAccessLevelUseCase(authBackend) {
  return async function registerWithAccessLevel(registerData, requesterToken) {
    return authBackend.registerWithAccessLevel(registerData, requesterToken)
  }
}

module.exports = { createRegisterWithAccessLevelUseCase }
