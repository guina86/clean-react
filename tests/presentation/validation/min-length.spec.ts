import { MinLengthValidation } from '@presentation/validation/validators'
import { FieldLengthError } from '@presentation/validation/errors'
import { faker } from '@faker-js/faker'

describe('MinLengthValidation', () => {
  let sut: MinLengthValidation
  const input = {
    field: faker.random.alphaNumeric(4)
  }

  beforeEach(() => {
    sut = new MinLengthValidation('field', 5)
  })

  it('should return Error if value length invalid', () => {
    const error = sut.validate(input)

    expect(error).toEqual(new FieldLengthError('field', 5))
  })

  it('should return falsy if value length valid', () => {
    input.field = faker.random.alphaNumeric(5)
    const error = sut.validate(input)

    expect(error).toBeFalsy()
  })

  it('should return falsy if field is undefined', () => {
    const invalidInput = { otherField: 'any_value' }
    const error = sut.validate(invalidInput)

    expect(error).toBeFalsy()
  })
})
