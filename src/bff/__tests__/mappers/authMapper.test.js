jest.mock('../../config/env', () => ({ NODE_ENV: 'test' }))

const { normalizeLoginResponse, COOKIE_OPTIONS } = require('../../mappers/authMapper')

describe('normalizeLoginResponse', () => {
  it('should map flat shape: { token, usuario }', () => {
    const raw = {
      token: 'tok1',
      usuario: { id: 1, nome_completo: 'João', email: 'j@j.com', nivel_de_acesso: 'medico' }
    }
    const { token, user } = normalizeLoginResponse(raw)
    expect(token).toBe('tok1')
    expect(user.id).toBe(1)
    expect(user.name).toBe('João')
    expect(user.email).toBe('j@j.com')
    expect(user.accessLevel).toBe('MEDICO')
  })

  it('should unwrap dados envelope', () => {
    const raw = {
      dados: {
        token: 'tok2',
        usuario: { id: 2, nome: 'Maria', email: 'm@m.com', nivelDeAcesso: 'PACIENTE' }
      }
    }
    const { token, user } = normalizeLoginResponse(raw)
    expect(token).toBe('tok2')
    expect(user.name).toBe('Maria')
    expect(user.accessLevel).toBe('PACIENTE')
  })

  it('should unwrap data envelope', () => {
    const raw = {
      data: { access_token: 'tok3', id: 3, name: 'Pedro', email: 'p@p.com' }
    }
    const { token, user } = normalizeLoginResponse(raw)
    expect(token).toBe('tok3')
    expect(user.name).toBe('Pedro')
  })

  it('should accept jwt field as token', () => {
    const raw = { jwt: 'tok4', id: 4, email: 'e@e.com' }
    const { token } = normalizeLoginResponse(raw)
    expect(token).toBe('tok4')
  })

  it('should use access_token when token field is not present', () => {
    const raw = { access_token: 'tok5', id: 5, email: 'e@e.com' }
    const { token } = normalizeLoginResponse(raw)
    expect(token).toBe('tok5')
  })

  it('should return PACIENTE as default accessLevel', () => {
    const raw = { token: 'tok6', id: 6, email: 'e@e.com' }
    const { user } = normalizeLoginResponse(raw)
    expect(user.accessLevel).toBe('PACIENTE')
  })

  it('should return default name "Usuário" when no name field is present', () => {
    const raw = { token: 'tok7', id: 7, email: 'e@e.com' }
    const { user } = normalizeLoginResponse(raw)
    expect(user.name).toBe('Usuário')
  })

  it('should return undefined token when no token field is present', () => {
    const raw = { id: 8, email: 'e@e.com' }
    const { token } = normalizeLoginResponse(raw)
    expect(token).toBeUndefined()
  })

  it('should map usuarioId when id field is not present', () => {
    const raw = { token: 'tok9', usuarioId: 99, email: 'e@e.com' }
    const { user } = normalizeLoginResponse(raw)
    expect(user.id).toBe(99)
  })

  it('should normalize accessLevel to uppercase', () => {
    const raw = { token: 'tok10', id: 10, email: 'e@e.com', nivel_de_acesso: 'gm' }
    const { user } = normalizeLoginResponse(raw)
    expect(user.accessLevel).toBe('GM')
  })
})

describe('COOKIE_OPTIONS', () => {
  it('should have httpOnly set to true', () => {
    expect(COOKIE_OPTIONS.httpOnly).toBe(true)
  })

  it('should have sameSite set to strict', () => {
    expect(COOKIE_OPTIONS.sameSite).toBe('strict')
  })

  it('should not be secure in non-production environment', () => {
    expect(COOKIE_OPTIONS.secure).toBe(false)
  })

  it('should have maxAge of 7 days in milliseconds', () => {
    expect(COOKIE_OPTIONS.maxAge).toBe(7 * 24 * 60 * 60 * 1000)
  })
})
