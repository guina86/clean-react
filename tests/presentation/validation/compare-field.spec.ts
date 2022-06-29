import { CompareFieldsValidation } from '@presentation/validation/validators'
import { InvalidFieldError } from '@presentation/validation/errors'

describe('CompareFieldsValidation', () => {
  const makeSut = (): CompareFieldsValidation => new CompareFieldsValidation('any_field', 'field_to_compare')
  const input = {
    any_field: 'any_value',
    field_to_compare: 'other_value'
  }

  it('should return error if fields do not match', () => {
    const sut = makeSut()

    const error = sut.validate(input)

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  it('should return falsy if fields match', () => {
    const sut = makeSut()
    input.field_to_compare = 'any_value'

    const error = sut.validate(input)

    expect(error).toBeFalsy()
  })
})
