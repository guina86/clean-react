import { EmailValidation } from '@presentation/validation/validators'
import { InvalidFieldError } from '@presentation/validation/errors/invalid-field'
import { faker } from '@faker-js/faker'

describe('EmailValidation', () => {
  let sut: EmailValidation

  beforeEach(() => {
    sut = new EmailValidation('email')
  })

  it('should return error if email is invalid', () => {
    const error = sut.validate(faker.random.word())

    expect(error).toEqual(new InvalidFieldError('email'))
  })

  it('should return falsy if email is valid', () => {
    const error = sut.validate(faker.internet.email())

    expect(error).toBeFalsy()
  })
})
