import { makeLoginValidation } from '@main/factories/validation'
import { ValidationFacade } from '@presentation/validation/validators'

describe('LoginValidationFactory', () => {
  it('should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()

    expect(composite).toEqual(new ValidationFacade()
      .field('email').required().email().push()
      .field('password').required().min(5).push()
      .build()
    )
  })
})
