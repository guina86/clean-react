import { ValidationComposite, ValidationFacade } from '@presentation/validation/validators'

export const makeSignUpValidation = (): ValidationComposite => new ValidationFacade()
  .field('name').required().min(3).push()
  .field('email').required().email().push()
  .field('password').required().min(5).push()
  .field('passwordConfirmation').required().min(5).sameAs('password').push()
  .build()
