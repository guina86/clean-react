import { FieldValidation } from '@presentation/validation/protocols'
import { ValidationComposite } from '@presentation/validation/validators'
import { mock } from 'jest-mock-extended'

describe('ValidationComposite', () => {
  const makeSut = (): ValidationComposite => new ValidationComposite([fieldValidationSpy, fieldValidationSpy2])
  const fieldValidationSpy = mock<FieldValidation>()
  const fieldValidationSpy2 = mock<FieldValidation>()
  const input = { any_field: 'any_value' }

  beforeAll(() => {
    fieldValidationSpy.field = 'any_field'
    fieldValidationSpy.validate.mockReturnValue(new Error('first_error_message'))
    fieldValidationSpy2.field = 'any_field'
    fieldValidationSpy2.validate.mockReturnValue(new Error('second_error_message'))
  })

  it('should return error if any validation fails', () => {
    const sut = makeSut()

    const error = sut.validate('any_field', input)

    expect(error).toBe('first_error_message')
  })

  it('should return empty if validation succeeds', () => {
    const sut = makeSut()
    fieldValidationSpy.validate.mockReturnValue(null)
    fieldValidationSpy2.validate.mockReturnValue(null)

    const error = sut.validate('any_field', input)

    expect(error).toBe('')
  })
})
