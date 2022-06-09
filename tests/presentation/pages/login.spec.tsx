import React from 'react'
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react'
import Login from '@presentation/pages/login'
import mock from 'jest-mock-extended/lib/Mock'
import { Validation } from '@presentation/protocols/validation'
import { faker } from '@faker-js/faker'
import { Authentication } from '@domain/usecases'

describe('Login Component', () => {
  let sut: RenderResult
  let email: string
  let password: string
  let errorMessage: string
  const validationSpy = mock<Validation>()
  const authenticationSpy = mock<Authentication>()

  beforeAll(() => {
    errorMessage = faker.random.words(2)
    email = faker.internet.email()
    password = faker.internet.password()
    validationSpy.validate.mockReturnValue(errorMessage)
    authenticationSpy.auth.mockResolvedValue({ accessToken: faker.datatype.uuid() })
  })

  beforeEach(() => {
    sut = render(<Login validation={validationSpy} authentication={authenticationSpy}/>)
    jest.clearAllMocks()
  })

  afterEach(cleanup)

  it('should start with initial state', () => {
    const statusWrap = sut.getByTestId('statusWrap')
    expect(statusWrap.childElementCount).toBe(0)
    const submitbutton = sut.getByRole('button') as HTMLButtonElement
    expect(submitbutton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should call validation with correct email', () => {
    const emailInput = sut.getByPlaceholderText('Digite seu e-mail')
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.validate).toHaveBeenCalledWith('email', email)
  })

  it('should call validation with correct email', () => {
    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.validate).toHaveBeenCalledWith('password', password)
  })

  it('should show email error if Validation fails', () => {
    const emailInput = sut.getByPlaceholderText('Digite seu e-mail')
    fireEvent.input(emailInput, { target: { value: email } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('should show password error if Validation fails', () => {
    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    fireEvent.input(passwordInput, { target: { value: password } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show valid email state if Validation succeeds', () => {
    validationSpy.validate.mockReturnValue('')
    const emailInput = sut.getByPlaceholderText('Digite seu e-mail')
    fireEvent.input(emailInput, { target: { value: email } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  it('should show valid password state if Validation succeeds', () => {
    validationSpy.validate.mockReturnValue('')
    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    fireEvent.input(passwordInput, { target: { value: password } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  it('should enable submit button if form is valid', () => {
    validationSpy.validate.mockReturnValue('')
    const emailInput = sut.getByPlaceholderText('Digite seu e-mail')
    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(passwordInput, { target: { value: password } })
    const submitButton = sut.getByRole('button') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  it('should show spinner on submit', async () => {
    validationSpy.validate.mockReturnValue('')
    const emailInput = sut.getByPlaceholderText('Digite seu e-mail')
    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(passwordInput, { target: { value: password } })
    const submitButton = sut.getByRole('button')
    fireEvent.click(submitButton)
    const spinner = sut.findByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  it('should call Authentication with correct values', async () => {
    validationSpy.validate.mockReturnValue('')
    const emailInput = sut.getByPlaceholderText('Digite seu e-mail')
    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(passwordInput, { target: { value: password } })
    const submitButton = sut.getByRole('button')
    fireEvent.click(submitButton)
    expect(authenticationSpy.auth).toHaveBeenCalledWith({ email, password })
  })
})
