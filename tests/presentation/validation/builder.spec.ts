import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationBuilder } from '@presentation/validation/validators'

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

  it('should return a list of validations', () => {
    const validations = ValidationBuilder.field('any_field').required().email().min(5).build()
    expect(validations).toEqual([
      new RequiredFieldValidation('any_field'),
      new EmailValidation('any_field'),
      new MinLengthValidation('any_field', 5)
    ])
  })
})
