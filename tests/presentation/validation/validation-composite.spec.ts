import { ValidationComposite } from '@presentation/validation/validators'
import { mock } from 'jest-mock-extended'
import { FieldValidation } from './protocols'

describe('ValidationComposite', () => {
  let sut: ValidationComposite
  const fieldValidationSpy = mock<FieldValidation>()
  const fieldValidationSpy2 = mock<FieldValidation>()

  beforeAll(() => {
    fieldValidationSpy.field = 'any_field'
    fieldValidationSpy.validate.mockReturnValue(null)
    fieldValidationSpy2.field = 'any_field'
    fieldValidationSpy2.validate.mockReturnValue(new Error('error_message'))
  })

  beforeEach(() => {
    sut = new ValidationComposite([fieldValidationSpy, fieldValidationSpy2])
  })

  it('should return error if any validation fails', () => {
    const error = sut.validate('any_field', 'any_value')

    expect(error).toBe('error_message')
  })
})
