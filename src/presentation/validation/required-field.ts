import { FieldValidation } from '@presentation/validation/protocols'
import { RequiredFieldError } from '@presentation/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error | null {
    return value ? null : new RequiredFieldError()
  }
}
