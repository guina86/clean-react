import { RequiredFieldValidation } from '@presentation/validation/validators'
import { RequiredFieldError } from '@presentation/validation/errors'
import { faker } from '@faker-js/faker'

describe('RequiredFieldValidation', () => {
  const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation('field')

  it('should return error if field is empty', () => {
    const sut = makeSut()
    const input = { field: '' }

    const error = sut.validate(input)

    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is not empty', () => {
    const sut = makeSut()
    const input = { field: faker.random.word() }

    const error = sut.validate(input)

    expect(error).toBeFalsy()
  })
})
