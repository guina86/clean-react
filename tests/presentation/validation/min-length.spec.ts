import { MinLengthValidation } from '@presentation/validation/validators'
import { FieldLengthError } from '@presentation/validation/errors'
import { faker } from '@faker-js/faker'

describe('MinLengthValidation', () => {
  const makeSut = (): MinLengthValidation => new MinLengthValidation('field', 5)

  it('should return Error if value length invalid', () => {
    const sut = makeSut()
    const input = { field: faker.random.alphaNumeric(4) }

    const error = sut.validate(input)

    expect(error).toEqual(new FieldLengthError('field', 5))
  })

  it('should return falsy if value length valid', () => {
    const sut = makeSut()
    const input = { field: faker.random.alphaNumeric(5) }

    const error = sut.validate(input)

    expect(error).toBeFalsy()
  })

  it('should return falsy if field is undefined', () => {
    const sut = makeSut()
    const invalidInput = { otherField: 'any_value' }

    const error = sut.validate(invalidInput)

    expect(error).toBeFalsy()
  })
})
