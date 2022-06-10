import { FieldValidation, Validation } from '@presentation/validation/protocols'

export class ValidationComposite implements Validation {
  constructor (private readonly validators: FieldValidation[]) {}

  validate (fieldName: string, fieldValue: string): string {
    for (const validator of this.validators) {
      if (validator.field === fieldName) {
        const error = validator.validate(fieldValue)
        if (error !== null) return error.message
      }
    }
    return ''
  }
}
