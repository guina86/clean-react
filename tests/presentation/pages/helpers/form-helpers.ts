import { faker } from '@faker-js/faker'
import { fireEvent, screen } from '@testing-library/react'

export const arrangeName = (name = faker.name.findName()): string => {
  const emailInput = screen.getByPlaceholderText('Digite seu nome')
  fireEvent.input(emailInput, { target: { value: name } })
  return name
}
export const arrangeEmail = (email = faker.internet.email()): string => {
  const emailInput = screen.getByPlaceholderText('Digite seu e-mail')
  fireEvent.input(emailInput, { target: { value: email } })
  return email
}
export const arrangePassword = (password = faker.internet.password()): string => {
  const passwordInput = screen.getByPlaceholderText('Digite sua senha')
  fireEvent.input(passwordInput, { target: { value: password } })
  return password
}
export const arrangePasswordConfirmation = (password = faker.internet.password()): string => {
  const passwordInput = screen.getByPlaceholderText('Repita sua senha')
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
