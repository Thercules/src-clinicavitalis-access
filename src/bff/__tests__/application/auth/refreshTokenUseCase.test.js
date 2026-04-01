const { createRefreshTokenUseCase } = require('../../../application/auth/refreshTokenUseCase')

describe('refreshTokenUseCase', () => {
  it('should return newToken when the backend responds with a token', async () => {
    const authBackend = { refreshToken: jest.fn().mockResolvedValue({ raw: true }) }
    const authMapper = { normalizeLoginResponse: jest.fn().mockReturnValue({ token: 'new-tok' }) }

    const refreshToken = createRefreshTokenUseCase(authBackend, authMapper)
    const result = await refreshToken('old-tok')

    expect(authBackend.refreshToken).toHaveBeenCalledWith('old-tok')
    expect(result).toEqual({ newToken: 'new-tok' })
  })

  it('should return newToken as undefined when the backend returns no token', async () => {
    const authBackend = { refreshToken: jest.fn().mockResolvedValue({}) }
    const authMapper = { normalizeLoginResponse: jest.fn().mockReturnValue({ token: undefined }) }

    const refreshToken = createRefreshTokenUseCase(authBackend, authMapper)
    const result = await refreshToken('old-tok')

    expect(result).toEqual({ newToken: undefined })
  })

  it('should propagate backend errors', async () => {
    const authBackend = { refreshToken: jest.fn().mockRejectedValue(new Error('Token expirado')) }
    const authMapper = { normalizeLoginResponse: jest.fn() }

    const refreshToken = createRefreshTokenUseCase(authBackend, authMapper)

    await expect(refreshToken('tok')).rejects.toThrow('Token expirado')
  })
})
