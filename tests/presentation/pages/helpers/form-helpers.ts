import { faker } from '@faker-js/faker'
import { fireEvent, screen } from '@testing-library/react'

export const arrangeName = (name = faker.name.findName()): string => {
  const emailInput = screen.getByRole('name-input')
  fireEvent.input(emailInput, { target: { value: name } })
  return name
}
export const arrangeEmail = (email = faker.internet.email()): string => {
  const emailInput = screen.getByRole('email-input')
  fireEvent.input(emailInput, { target: { value: email } })
  return email
}
export const arrangePassword = (password = faker.internet.password()): string => {
  const passwordInput = screen.getByRole('password-input')
  fireEvent.input(passwordInput, { target: { value: password } })
  return password
}
export const arrangePasswordConfirmation = (password = faker.internet.password()): string => {
  const passwordInput = screen.getByRole('passwordConfirmation-input')
  fireEvent.input(passwordInput, { target: { value: password } })
  return password
}
type LoginResult = {email: string, password: string}
export const arrangeLoginInputs = (emailInput?: string, passwordInput?: string): LoginResult => {
  const email = arrangeEmail(emailInput)
  const password = arrangePassword(passwordInput)
  return { email, password }
}
type SignUpResult = {name: string, email: string, password: string, passwordConfirmation: string}
export const arrangeSignUpInputs = (nameInput?: string, emailInput?: string, passwordInput?: string, passwordConfirmationInput?: string): SignUpResult => {
  const name = arrangeName(nameInput)
  const email = arrangeEmail(emailInput)
  const password = arrangePassword(passwordInput)
  const passwordConfirmation = arrangePasswordConfirmation(passwordConfirmationInput ?? password)
  return { name, email, password, passwordConfirmation }
}
export const actSubmit = (): void => {
  const form = screen.getByRole('form')
  fireEvent.submit(form)
}
export const testStatusForField = (fieldName: string, error: string, status: string): void => {
  const wrap = screen.getByRole(`${fieldName}-wrap`)
  const input = screen.getByRole(`${fieldName}-input`)
  const label = screen.getByRole(`${fieldName}-label`)

  expect(wrap).toHaveAttribute('data-status', status)
  expect(input.title).toBe(error)
  expect(label.title).toBe(error)
}
