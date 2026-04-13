const { ValidationError, MissingTokenError } = require('../../application/errors')

describe('ValidationError', () => {
  it('should be an instance of Error', () => {
    const err = new ValidationError('invalid field')
    expect(err).toBeInstanceOf(Error)
  })

  it('should have name ValidationError', () => {
    const err = new ValidationError('invalid field')
    expect(err.name).toBe('ValidationError')
  })

  it('should have status 400', () => {
    const err = new ValidationError('invalid field')
    expect(err.status).toBe(400)
  })

  it('should preserve the message passed', () => {
    const err = new ValidationError('email obrigatório')
    expect(err.message).toBe('email obrigatório')
  })
})

describe('MissingTokenError', () => {
  it('should be an instance of Error', () => {
    const err = new MissingTokenError()
    expect(err).toBeInstanceOf(Error)
  })

  it('should have name MissingTokenError', () => {
    const err = new MissingTokenError()
    expect(err.name).toBe('MissingTokenError')
  })

  it('should have status 502', () => {
    const err = new MissingTokenError()
    expect(err.status).toBe(502)
  })

  it('should have a fixed message', () => {
    const err = new MissingTokenError()
    expect(err.message).toBe('Token não encontrado na resposta do servidor')
  })
})
