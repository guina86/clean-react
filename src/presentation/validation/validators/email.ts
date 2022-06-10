import { FieldValidation } from '@presentation/validation/protocols'
import { InvalidFieldError } from '../errors/invalid-field'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error | null {
    return new InvalidFieldError(this.field)
  }
}
