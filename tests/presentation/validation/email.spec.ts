import { EmailValidation } from '@presentation/validation/validators'
import { InvalidFieldError } from '@presentation/validation/errors'
import { faker } from '@faker-js/faker'

describe('EmailValidation', () => {
  let sut: EmailValidation
  const input = {
    email: faker.random.word()
  }

  beforeEach(() => {
    sut = new EmailValidation('email')
  })

  it('should return error if email is invalid', () => {
    const error = sut.validate(input)

    expect(error).toEqual(new InvalidFieldError('email'))
  })

  it('should return falsy if email is valid', () => {
    input.email = faker.internet.email()
    const error = sut.validate(input)

    expect(error).toBeFalsy()
  })

  it('should return falsy if email is empty', () => {
    input.email = ''
    const error = sut.validate(input)

    expect(error).toBeFalsy()
  })
})
