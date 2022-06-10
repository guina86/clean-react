import { MinLengthValidation } from '@presentation/validation/validators'
import { FieldLengthError } from '@presentation/validation/errors'
import { faker } from '@faker-js/faker'

describe('MinLengthValidation', () => {
  let sut: MinLengthValidation

  beforeEach(() => {
    sut = new MinLengthValidation('field', 5)
  })

  it('should return Error if value length invalid', () => {
    const error = sut.validate(faker.random.alphaNumeric(4))

    expect(error).toEqual(new FieldLengthError('field', 5))
  })

  it('should return falsy if value length valid', () => {
    const error = sut.validate(faker.random.alphaNumeric(5))

    expect(error).toBeFalsy()
  })
})
