import { MinLengthValidation } from '@presentation/validation/validators'
import { FieldLengthError } from '@presentation/validation/errors'

describe('MinLengthValidation', () => {
  let sut: MinLengthValidation

  beforeEach(() => {
    sut = new MinLengthValidation('field', 5)
  })

  it('should return Error if value length less than the min', () => {
    const error = sut.validate('123')

    expect(error).toEqual(new FieldLengthError('field', 5))
  })
})
