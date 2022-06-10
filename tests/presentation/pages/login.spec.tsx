import React from 'react'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import Login from '@presentation/pages/login'
import mock from 'jest-mock-extended/lib/Mock'
import { Validation } from '@presentation/protocols/validation'
import { faker } from '@faker-js/faker'
import { Authentication } from '@domain/usecases'
import { InvalidCredentialsError } from '@domain/errors'
import 'jest-localstorage-mock'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

describe('Login Component', () => {
  let sut: RenderResult
  const history = createMemoryHistory({ initialEntries: ['/login'] })
  const errorMessage = faker.random.words(2)
  const accessToken = faker.datatype.uuid()
  const validationSpy = mock<Validation>()
  const authenticationSpy = mock<Authentication>()
  const arrangeEmail = (sut: RenderResult, email = faker.internet.email()): string => {
    const emailInput = sut.getByPlaceholderText('Digite seu e-mail')
    fireEvent.input(emailInput, { target: { value: email } })
    return email
  }
  const arrangePassword = (sut: RenderResult, password = faker.internet.password()): string => {
    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    fireEvent.input(passwordInput, { target: { value: password } })
    return password
  }
  const arrangeInputs = (sut: RenderResult, emailInput?: string, passwordInput?: string): {email: string, password: string} => {
    const email = arrangeEmail(sut, emailInput)
    const password = arrangePassword(sut, passwordInput)
    return { email, password }
  }
  const actSubmit = (sut: RenderResult): void => {
    const submitButton = sut.getByRole('button')
    fireEvent.click(submitButton)
  }

  beforeAll(() => {
    validationSpy.validate.mockReturnValue(errorMessage)
    authenticationSpy.auth.mockResolvedValue({ accessToken })
  })

  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    sut = render(
      <Router location={history.location} navigator={history}>
        <Login validation={validationSpy} authentication={authenticationSpy}/>
      </Router>
    )
    validationSpy.validate.mockReturnValue('')
  })

  it('should start with initial state', async () => {
    const statusWrap = sut.getByRole('status-wrap')
    expect(statusWrap.childElementCount).toBe(0)
    const submitbutton = await sut.findByRole('button')
    expect(submitbutton).toBeDisabled()
    const emailStatus = sut.getByRole('email-status')
    expect(emailStatus.title).toBe(errorMessage)
    expect(emailStatus).toHaveTextContent('🔴')
    const passwordStatus = sut.getByRole('password-status')
    expect(passwordStatus.title).toBe(errorMessage)
    expect(passwordStatus).toHaveTextContent('🔴')
  })

  it('should call validation with correct email', () => {
    const email = arrangeEmail(sut)
    expect(validationSpy.validate).toHaveBeenCalledWith('email', email)
  })

  it('should call validation with correct email', () => {
    const password = arrangePassword(sut)
    expect(validationSpy.validate).toHaveBeenCalledWith('password', password)
  })

  it('should show email error if Validation fails', () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    arrangeEmail(sut)
    const emailStatus = sut.getByRole('email-status')
    expect(emailStatus.title).toBe(errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('should show password error if Validation fails', () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    arrangePassword(sut)
    const passwordStatus = sut.getByRole('password-status')
    expect(passwordStatus.title).toBe(errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show valid email state if Validation succeeds', () => {
    arrangeEmail(sut)
    const emailStatus = sut.getByRole('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  it('should show valid password state if Validation succeeds', () => {
    arrangePassword(sut)
    const passwordStatus = sut.getByRole('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  it('should enable submit button if form is valid', () => {
    arrangeInputs(sut)
    const submitButton = sut.getByRole('button')
    expect(submitButton).toBeEnabled()
  })

  it('should show spinner on submit', async () => {
    arrangeInputs(sut)
    actSubmit(sut)
    const spinner = await sut.findByRole('progressbar')
    expect(spinner).toBeTruthy()
  })

  it('should call Authentication with correct values', async () => {
    const params = arrangeInputs(sut)
    actSubmit(sut)
    expect(authenticationSpy.auth).toHaveBeenCalledWith(params)
  })

  it('should call Authentication only once', async () => {
    arrangeInputs(sut)
    actSubmit(sut)
    actSubmit(sut)
    expect(authenticationSpy.auth).toHaveBeenCalledTimes(1)
  })

  it('should not call Authentication if form is not valid', async () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    arrangeEmail(sut)
    fireEvent.submit(sut.getByRole('form'))
    expect(authenticationSpy.auth).toHaveBeenCalledTimes(0)
  })

  it('should present error if Authentication fails', async () => {
    const error = new InvalidCredentialsError()
    authenticationSpy.auth.mockRejectedValueOnce(error)
    arrangeInputs(sut)
    actSubmit(sut)
    const statusWrap = sut.getByRole('status-wrap')
    const mainError = await sut.findByRole('error-message')
    expect(mainError).toHaveTextContent(error.message)
    expect(statusWrap.childElementCount).toBe(1)
  })

  it('should add accessToken to localstorage on success', async () => {
    arrangeInputs(sut)
    actSubmit(sut)
    await waitFor(async () => sut.getByRole('form'))
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', accessToken)
    expect(history.index).toBe(0)
    expect(history.location.pathname).toBe('/')
  })

  it('should got to signup page', async () => {
    const register = sut.getByRole('register-link')
    fireEvent.click(register)
    expect(history.index).toBe(1)
    expect(history.location.pathname).toBe('/signup')
  })
})
