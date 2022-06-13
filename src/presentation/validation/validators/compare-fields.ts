import { FieldValidation } from '@presentation/validation/protocols'
import { InvalidFieldError } from '@presentation/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (readonly field: string, private readonly fieldValue: string) {}

  validate (value: string): Error | null {
    return value !== this.fieldValue ? new InvalidFieldError(this.field) : null
  }
}
