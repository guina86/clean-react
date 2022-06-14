import { FieldValidation } from '@presentation/validation/protocols'
import { FieldLengthError } from '@presentation/validation/errors'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (input: Record<string, string>): Error | null {
    return input[this.field]?.length < this.minLength ? new FieldLengthError(this.field, this.minLength) : null
  }
}
