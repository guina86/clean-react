import { faker } from '@faker-js/faker'
import { fireEvent, screen } from '@testing-library/react'

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
export const arrangeInputs = (emailInput?: string, passwordInput?: string): {email: string, password: string} => {
  const email = arrangeEmail(emailInput)
  const password = arrangePassword(passwordInput)
  return { email, password }
}
export const actSubmit = (): void => {
  const form = screen.getByRole('form')
  fireEvent.submit(form)
}
