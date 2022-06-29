import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationBuilder,
  ValidationComposite,
  ValidationFacade
} from '@presentation/validation/validators'

describe('ValidationFacade', () => {
  it('should return a ValidationBuilder after a field()', () => {
    const builder = new ValidationFacade().field('any_field')

    expect(builder).toBeInstanceOf(ValidationBuilder)
  })

  it('should add validations after a push()', () => {
    const facade = new ValidationFacade()
    const validators = [new RequiredFieldValidation('any_field')]
    const validators2 = [new EmailValidation('email')]
    facade.push(validators)
    facade.push(validators2)

    expect(facade.list).toEqual(validators.concat(validators2))
  })

  it('should return a ValidationComposite after a build()', () => {
    const composite = new ValidationFacade().build()

    expect(composite).toBeInstanceOf(ValidationComposite)
  })
})
