import { RequiredFieldValidation, ValidationBuilder } from '@presentation/validation/validators'

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
})
