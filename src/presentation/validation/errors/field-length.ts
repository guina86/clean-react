export class FieldLengthError extends Error {
  constructor (fieldName: string, minLength: number) {
    super(`${fieldName} deve ter pelo menos ${minLength} caracteres`)
    this.name = 'FieldLengthError'
  }
}
