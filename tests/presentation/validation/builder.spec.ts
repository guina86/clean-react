import { CompareFieldsValidation, EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationBuilder, ValidationFacade } from '@presentation/validation/validators'

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  it('should return EmailValidation', () => {
    const validations = ValidationBuilder.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  it('should return MinLenghtValidation', () => {
    const validations = ValidationBuilder.field('any_field').min(5).build()
    expect(validations).toEqual([new MinLengthValidation('any_field', 5)])
  })

  it('should return CompareFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').sameAs('field_to_compare').build()
    expect(validations).toEqual([new CompareFieldsValidation('any_field', 'field_to_compare')])
  })

  it('should return a list of validations', () => {
    const validations = ValidationBuilder.field('any_field').required().email().min(5).build()
    expect(validations).toEqual([
      new RequiredFieldValidation('any_field'),
      new EmailValidation('any_field'),
      new MinLengthValidation('any_field', 5)
    ])
  })

  it('should throw error if push is accessed without a facade', () => {
    try {
      ValidationBuilder.field('any_field').required().email().min(5).push()
    } catch (error) {
      expect(error).toEqual(new Error('This helper function can only be used through the facade'))
    }
  })

  it('should return a ValidationFacade after a push', () => {
    const facade = new ValidationFacade()
    const validations = ValidationBuilder.field('any_field', facade).required().email().min(5).push()
    expect(validations).toEqual(facade)
  })
})
