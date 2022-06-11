import { FieldValidation } from '@presentation/validation/protocols'
import { ValidationBuilder, ValidationComposite } from '@presentation/validation/validators'

export class ValidationFacade {
  private readonly validators: FieldValidation[] = []

  field (fieldName: string): ValidationBuilder {
    return ValidationBuilder.field(fieldName, this)
  }

  push (validators: FieldValidation[]): ValidationFacade {
    this.validators.concat(validators)
    return this
  }

  build (): ValidationComposite {
    return new ValidationComposite(this.validators)
  }
}
