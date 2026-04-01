const { validateLogin, validateRegister, validateRegisterWithAccessLevel } = require('../../validators/authValidator')
const { ValidationError } = require('../../application/errors')

describe('validateLogin', () => {
  it('should not throw with valid data', () => {
    expect(() => validateLogin({ email: 'a@b.com', password: '123456' })).not.toThrow()
  })

  it('should throw ValidationError when email is missing', () => {
    expect(() => validateLogin({ email: '', password: '123456' })).toThrow(ValidationError)
  })

  it('should throw ValidationError when password is missing', () => {
    expect(() => validateLogin({ email: 'a@b.com', password: '' })).toThrow(ValidationError)
  })

  it('should throw ValidationError with correct message', () => {
    expect(() => validateLogin({ email: '', password: '' }))
      .toThrow('Email e senha são obrigatórios')
  })
})

describe('validateRegister', () => {
  const base = {
    email: 'a@b.com',
    password: '123456',
    confirmPassword: '123456',
    nome_completo: 'João Silva',
    telefone: '11999999999',
    cpf: '12345678901'
  }

  it('should not throw with valid data', () => {
    expect(() => validateRegister(base)).not.toThrow()
  })

  it('should throw ValidationError when a required field is missing', () => {
    expect(() => validateRegister({ ...base, email: '' })).toThrow(ValidationError)
  })

  it('should throw ValidationError when passwords do not match', () => {
    expect(() => validateRegister({ ...base, confirmPassword: 'outra' }))
      .toThrow('As senhas não correspondem')
  })

  it('should throw ValidationError when password is shorter than 6 characters', () => {
    expect(() => validateRegister({ ...base, password: '123', confirmPassword: '123' }))
      .toThrow('Senha deve ter no mínimo 6 caracteres')
  })

  it('should throw ValidationError for an invalid email format', () => {
    expect(() => validateRegister({ ...base, email: 'nao-e-email' }))
      .toThrow('Email inválido')
  })

  it('should throw ValidationError when cpf is missing', () => {
    expect(() => validateRegister({ ...base, cpf: '' })).toThrow(ValidationError)
  })
})

describe('validateRegisterWithAccessLevel', () => {
  const base = {
    email: 'doc@clinic.com',
    password: 'senha123',
    confirmPassword: 'senha123',
    nome_completo: 'Dr. Ana',
    telefone: '11999999999',
    nivel_de_acesso: 'MEDICO'
  }

  it('should not throw with valid data', () => {
    expect(() => validateRegisterWithAccessLevel(base)).not.toThrow()
  })

  it('should throw ValidationError when nivel_de_acesso is missing', () => {
    expect(() => validateRegisterWithAccessLevel({ ...base, nivel_de_acesso: '' }))
      .toThrow(ValidationError)
  })

  it('should throw ValidationError when passwords do not match', () => {
    expect(() => validateRegisterWithAccessLevel({ ...base, confirmPassword: 'errada' }))
      .toThrow('As senhas não correspondem')
  })

  it('should throw ValidationError when password is shorter than 6 characters', () => {
    expect(() => validateRegisterWithAccessLevel({ ...base, password: '12', confirmPassword: '12' }))
      .toThrow('Senha deve ter no mínimo 6 caracteres')
  })

  it('should throw ValidationError with correct message when a required field is missing', () => {
    expect(() => validateRegisterWithAccessLevel({ ...base, nome_completo: '' }))
      .toThrow('Email, senha, nome completo, telefone e nível de acesso são obrigatórios')
  })
})
