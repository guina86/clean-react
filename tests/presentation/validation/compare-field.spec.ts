import { InvalidFieldError } from '@presentation/validation/errors'
import { CompareFieldsValidation } from '@presentation/validation/validators'

describe('CompareFieldsValidation', () => {
  let sut: CompareFieldsValidation
  const input = {
    any_field: 'any_value',
    field_to_compare: 'other_value'
  }

  beforeEach(() => {
    sut = new CompareFieldsValidation('any_field', 'field_to_compare')
  })

  it('should return error if fields do not match', () => {
    const error = sut.validate(input)

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  it('should return falsy if fields match', () => {
    input.field_to_compare = 'any_value'
    const error = sut.validate(input)

    expect(error).toBeFalsy()
  })
})
