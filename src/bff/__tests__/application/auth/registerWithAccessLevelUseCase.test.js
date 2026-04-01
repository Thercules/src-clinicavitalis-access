const { createRegisterWithAccessLevelUseCase } = require('../../../application/auth/registerWithAccessLevelUseCase')

const registerData = {
  email: 'doc@clinic.com',
  password: 'senha123',
  confirmPassword: 'senha123',
  nome_completo: 'Dr. Ana',
  telefone: '11999999999',
  nivel_de_acesso: 'MEDICO'
}

describe('registerWithAccessLevelUseCase', () => {
  it('should delegate to the backend with registerData and token', async () => {
    const mockResponse = { sucesso: true, mensagem: 'Usuário criado com sucesso' }
    const authBackend = { registerWithAccessLevel: jest.fn().mockResolvedValue(mockResponse) }

    const registerWithAccessLevel = createRegisterWithAccessLevelUseCase(authBackend)
    const result = await registerWithAccessLevel(registerData, 'admin-tok')

    expect(authBackend.registerWithAccessLevel).toHaveBeenCalledWith(registerData, 'admin-tok')
    expect(result).toEqual(mockResponse)
  })

  it('should return the backend response unchanged', async () => {
    const mockResponse = { sucesso: true, dados: { id: 10 } }
    const authBackend = { registerWithAccessLevel: jest.fn().mockResolvedValue(mockResponse) }

    const registerWithAccessLevel = createRegisterWithAccessLevelUseCase(authBackend)
    const result = await registerWithAccessLevel(registerData, 'admin-tok')

    expect(result).toBe(mockResponse)
  })

  it('should propagate backend errors', async () => {
    const authBackend = { registerWithAccessLevel: jest.fn().mockRejectedValue(new Error('Sem permissão')) }

    const registerWithAccessLevel = createRegisterWithAccessLevelUseCase(authBackend)

    await expect(registerWithAccessLevel(registerData, 'tok')).rejects.toThrow('Sem permissão')
  })
})
