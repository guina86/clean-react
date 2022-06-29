import { EmailValidation } from '@presentation/validation/validators'
import { InvalidFieldError } from '@presentation/validation/errors'
import { faker } from '@faker-js/faker'

describe('EmailValidation', () => {
  const makeSut = (): EmailValidation => new EmailValidation('email')

  it('should return error if email is invalid', () => {
    const sut = makeSut()
    const input = { email: faker.random.word() }

    const error = sut.validate(input)

    expect(error).toEqual(new InvalidFieldError('email'))
  })

  it('should return falsy if email is valid', () => {
    const sut = makeSut()
    const input = { email: faker.internet.email() }

    const error = sut.validate(input)

    expect(error).toBeFalsy()
  })

  it('should return falsy if email is empty', () => {
    const sut = makeSut()
    const input = { email: '' }

    const error = sut.validate(input)

    expect(error).toBeFalsy()
  })
})
