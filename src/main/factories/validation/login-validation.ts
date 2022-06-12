import { ValidationComposite, ValidationFacade } from '@presentation/validation/validators'

export const makeLoginValidation = (): ValidationComposite => new ValidationFacade()
  .field('email').email().required().push()
  .field('password').required().min(5).push()
  .build()
