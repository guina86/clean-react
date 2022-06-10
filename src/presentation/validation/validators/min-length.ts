import { FieldValidation } from '@presentation/validation/protocols'
import { FieldLengthError } from '@presentation/validation/errors'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (value: string): Error | null {
    return new FieldLengthError(this.field, this.minLength)
  }
}
