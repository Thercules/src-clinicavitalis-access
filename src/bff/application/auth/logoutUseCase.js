// Logout is fully handled by the BFF: the httpOnly cookie is cleared by the route.
// No backend call is made — the Quarkus backend has no logout endpoint.
// This file is kept as a placeholder for future server-side token invalidation.
module.exports = {}
