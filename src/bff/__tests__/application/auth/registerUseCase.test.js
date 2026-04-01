const { createRegisterUseCase } = require('../../../application/auth/registerUseCase')
const { MissingTokenError } = require('../../../application/errors')

const mockUser = { id: 2, name: 'Maria', email: 'm@m.com', accessLevel: 'PACIENTE' }
const registerData = {
  email: 'm@m.com',
  password: 'senha123',
  confirmPassword: 'senha123',
  nome_completo: 'Maria Silva',
  telefone: '11999999999',
  cpf: '12345678901',
  nivel_de_acesso: 'PACIENTE'
}

describe('registerUseCase', () => {
  it('should return token and user when the backend responds successfully', async () => {
    const authBackend = { register: jest.fn().mockResolvedValue({ raw: true }) }
    const authMapper = { normalizeLoginResponse: jest.fn().mockReturnValue({ token: 'reg-tok', user: mockUser }) }

    const register = createRegisterUseCase(authBackend, authMapper)
    const result = await register(registerData)

    expect(authBackend.register).toHaveBeenCalledWith(registerData)
    expect(result).toEqual({ token: 'reg-tok', user: mockUser })
  })

  it('should throw MissingTokenError when token is absent in the response', async () => {
    const authBackend = { register: jest.fn().mockResolvedValue({}) }
    const authMapper = { normalizeLoginResponse: jest.fn().mockReturnValue({ token: undefined, user: mockUser }) }

    const register = createRegisterUseCase(authBackend, authMapper)

    await expect(register(registerData)).rejects.toThrow(MissingTokenError)
  })

  it('should propagate backend errors', async () => {
    const authBackend = { register: jest.fn().mockRejectedValue(new Error('Email já cadastrado')) }
    const authMapper = { normalizeLoginResponse: jest.fn() }

    const register = createRegisterUseCase(authBackend, authMapper)

    await expect(register(registerData)).rejects.toThrow('Email já cadastrado')
  })
})
