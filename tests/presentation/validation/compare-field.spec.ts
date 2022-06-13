import { InvalidFieldError } from '@presentation/validation/errors'
import { CompareFieldsValidation } from '@presentation/validation/validators'

describe('CompareFieldsValidation', () => {
  let sut: CompareFieldsValidation

  beforeEach(() => {
    sut = new CompareFieldsValidation('any_field', 'any_value')
  })

  it('should return error if fields do not match', () => {
    const error = sut.validate('other_field')

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  it('should return falsy if fields match', () => {
    const error = sut.validate('any_value')

    expect(error).toBeFalsy()
  })
})
