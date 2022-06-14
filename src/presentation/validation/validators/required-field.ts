import { FieldValidation } from '@presentation/validation/protocols'
import { RequiredFieldError } from '@presentation/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: Record<string, string>): Error | null {
    return input[this.field] ? null : new RequiredFieldError()
  }
}
