import { EmailValidation } from '@presentation/validation/validators'
import { InvalidFieldError } from '@presentation/validation/errors/invalid-field'

describe('EmailValidation', () => {
  let sut: EmailValidation

  beforeEach(() => {
    sut = new EmailValidation('email')
  })
  it('should return error if email is invalid', () => {
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError('email'))
  })
})
