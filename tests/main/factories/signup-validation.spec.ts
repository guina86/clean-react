import { makeSignUpValidation } from '@main/factories/validation'
import { ValidationFacade } from '@presentation/validation/validators'

describe('SignUpValidationFactory', () => {
  it('should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()

    expect(composite).toEqual(new ValidationFacade()
      .field('name').required().min(3).push()
      .field('email').required().email().push()
      .field('password').required().min(5).push()
      .field('passwordConfirmation').required().min(5).sameAs('password').push()
      .build()
    )
  })
})
