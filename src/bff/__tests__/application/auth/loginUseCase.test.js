const { createLoginUseCase } = require('../../../application/auth/loginUseCase')
const { MissingTokenError } = require('../../../application/errors')

const mockUser = { id: 1, name: 'João', email: 'j@j.com', accessLevel: 'PACIENTE' }

describe('loginUseCase', () => {
  it('should return token and user when the backend responds successfully', async () => {
    const authBackend = { login: jest.fn().mockResolvedValue({ raw: true }) }
    const authMapper = { normalizeLoginResponse: jest.fn().mockReturnValue({ token: 'abc123', user: mockUser }) }

    const login = createLoginUseCase(authBackend, authMapper)
    const result = await login('j@j.com', 'senha123')

    expect(authBackend.login).toHaveBeenCalledWith('j@j.com', 'senha123')
    expect(authMapper.normalizeLoginResponse).toHaveBeenCalled()
    expect(result).toEqual({ token: 'abc123', user: mockUser })
  })

  it('should throw MissingTokenError when token is absent in the response', async () => {
    const authBackend = { login: jest.fn().mockResolvedValue({}) }
    const authMapper = { normalizeLoginResponse: jest.fn().mockReturnValue({ token: undefined, user: mockUser }) }

    const login = createLoginUseCase(authBackend, authMapper)

    await expect(login('j@j.com', 'senha123')).rejects.toThrow(MissingTokenError)
  })

  it('should propagate backend errors', async () => {
    const authBackend = { login: jest.fn().mockRejectedValue(new Error('Credenciais inválidas')) }
    const authMapper = { normalizeLoginResponse: jest.fn() }

    const login = createLoginUseCase(authBackend, authMapper)

    await expect(login('j@j.com', 'senha123')).rejects.toThrow('Credenciais inválidas')
  })
})
