import { FieldValidation } from '@presentation/validation/protocols'
import {
  CompareFieldsValidation,
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationFacade
} from '@presentation/validation/validators'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[],
    private readonly parent?: ValidationFacade
  ) {}

  static field (fieldName: string, parent?: ValidationFacade): ValidationBuilder {
    return new ValidationBuilder(fieldName, [], parent)
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  min (length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length))
    return this
  }

  sameAs (fieldToCompare: string): ValidationBuilder {
    this.validations.push(new CompareFieldsValidation(this.fieldName, fieldToCompare))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }

  push (): ValidationFacade {
    if (this.parent === undefined) throw new Error('This helper function can only be used through the facade')
    this.parent.push(this.validations)
    return this.parent
  }
}
