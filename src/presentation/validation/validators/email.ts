import { FieldValidation } from '@presentation/validation/protocols'
import { InvalidFieldError } from '@presentation/validation/errors'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: Record<string, string>): Error | null {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const value = input[this.field]
    return (!value || emailRegex.test(value)) ? null : new InvalidFieldError(this.field)
  }
}
