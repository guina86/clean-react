import { FieldValidation } from '@presentation/validation/protocols'
import { InvalidFieldError } from '@presentation/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (readonly field: string, private readonly fieldToCompare: string) {}

  validate (input: Record<string, string>): Error | null {
    return input[this.field] !== input[this.fieldToCompare] ? new InvalidFieldError(this.field) : null
  }
}
