/**
 * @typedef {Object} IAuthBackend
 * Port contract for authentication backend operations.
 * Any adapter implementing this port must provide these methods.
 *
 * @property {function(string, string): Promise<Object>} login
 *   Authenticates a user. Returns raw backend response.
 *
 * @property {function(Object): Promise<Object>} register
 *   Registers a new user. Returns raw backend response.
 *
 * @property {function(Object, string): Promise<Object>} registerWithAccessLevel
 *   Registers a user with a specific access level. Requires an admin token.
 *
 * @property {function(string): Promise<void>} logout
 *   Invalidates the session on the backend. Failures are silently swallowed.
 *
 * @property {function(string): Promise<Object>} refreshToken
 *   Exchanges an existing token for a new one.
 */

module.exports = {}
