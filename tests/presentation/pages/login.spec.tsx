import React from 'react'
import { Router } from 'react-router-dom'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import mock from 'jest-mock-extended/lib/Mock'
import { faker } from '@faker-js/faker'
import Login from '@presentation/pages/login'
import { Validation } from '@presentation/validation/protocols'
import { Authentication, SaveAccessToken } from '@domain/usecases'
import { InvalidCredentialsError } from '@domain/errors'
import { actSubmit, arrangeEmail, arrangeLoginInputs, arrangePassword } from '@tests/presentation/pages/helpers'

describe('Login Component', () => {
  const history = createMemoryHistory({ initialEntries: ['/login'] })
  const errorMessage = faker.random.words(2)
  const accessToken = faker.datatype.uuid()
  const validationSpy = mock<Validation>()
  const authenticationSpy = mock<Authentication>()
  const saveAccessTokenSpy = mock<SaveAccessToken>()

  beforeAll(() => {
    validationSpy.validate.mockReturnValue(errorMessage)
    authenticationSpy.auth.mockResolvedValue({ accessToken })
  })

  beforeEach(() => {
    jest.clearAllMocks()
    render(
      <Router location={history.location} navigator={history}>
        <Login
          validation={validationSpy}
          authentication={authenticationSpy}
          saveAccessToken={saveAccessTokenSpy}
        />
      </Router>
    )
    validationSpy.validate.mockReturnValue('')
  })

  it('should start with initial state', async () => {
    const statusWrap = screen.getByRole('status-wrap')
    const submitbutton = await screen.findByRole('button')
    const emailStatus = screen.getByRole('email-status')
    const passwordStatus = screen.getByRole('password-status')

    expect(statusWrap.childElementCount).toBe(0)
    expect(submitbutton).toBeDisabled()
    expect(emailStatus.title).toBe(errorMessage)
    expect(emailStatus).toHaveTextContent('🔴')
    expect(passwordStatus.title).toBe(errorMessage)
    expect(passwordStatus).toHaveTextContent('🔴')
  })

  it('should call validation with correct email', () => {
    const email = arrangeEmail()
    const input = { email: email, password: '' }

    expect(validationSpy.validate).toHaveBeenCalledWith('email', input)
  })

  it('should call validation with correct password', () => {
    const password = arrangePassword()
    const input = { email: '', password: password }

    expect(validationSpy.validate).toHaveBeenCalledWith('password', input)
  })

  it('should show email error if Validation fails', () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    arrangeEmail()
    const emailStatus = screen.getByRole('email-status')

    expect(emailStatus.title).toBe(errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('should show password error if Validation fails', () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    arrangePassword()
    const passwordStatus = screen.getByRole('password-status')

    expect(passwordStatus.title).toBe(errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show valid email state if Validation succeeds', () => {
    arrangeEmail()
    const emailStatus = screen.getByRole('email-status')

    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  it('should show valid password state if Validation succeeds', () => {
    arrangePassword()
    const passwordStatus = screen.getByRole('password-status')

    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  it('should enable submit button if form is valid', () => {
    arrangeLoginInputs()
    const submitButton = screen.getByRole('button')

    expect(submitButton).toBeEnabled()
  })

  it('should show spinner on submit', async () => {
    arrangeLoginInputs()
    actSubmit()
    const spinner = await screen.findByRole('progressbar')

    expect(spinner).toBeTruthy()
  })

  it('should call Authentication with correct values', async () => {
    const params = arrangeLoginInputs()
    actSubmit()

    expect(authenticationSpy.auth).toHaveBeenCalledWith(params)
  })

  it('should call Authentication only once', async () => {
    arrangeLoginInputs()
    actSubmit()
    actSubmit()

    expect(authenticationSpy.auth).toHaveBeenCalledTimes(1)
  })

  it('should not call Authentication if form is not valid', async () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    arrangeEmail()
    fireEvent.submit(screen.getByRole('form'))

    expect(authenticationSpy.auth).toHaveBeenCalledTimes(0)
  })

  it('should present error if Authentication fails', async () => {
    const error = new InvalidCredentialsError()
    authenticationSpy.auth.mockRejectedValueOnce(error)
    arrangeLoginInputs()
    actSubmit()
    const statusWrap = screen.getByRole('status-wrap')
    const mainError = await screen.findByRole('error-message')

    expect(mainError).toHaveTextContent(error.message)
    expect(statusWrap.childElementCount).toBe(1)
  })

  it('should present error if SaveAccessToken fails', async () => {
    const error = new Error('save_access_token_error')
    saveAccessTokenSpy.save.mockRejectedValueOnce(error)
    arrangeLoginInputs()
    actSubmit()
    const statusWrap = screen.getByRole('status-wrap')
    const mainError = await screen.findByRole('error-message')

    expect(mainError).toHaveTextContent(error.message)
    expect(statusWrap.childElementCount).toBe(1)
  })

  it('should call SaveAccessToken on success', async () => {
    arrangeLoginInputs()
    actSubmit()
    await waitFor(async () => screen.getByRole('form'))

    expect(saveAccessTokenSpy.save).toHaveBeenCalledWith(accessToken)
    expect(history.index).toBe(0)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to signup page', async () => {
    const register = screen.getByRole('register-link')
    fireEvent.click(register)

    expect(history.index).toBe(0)
    expect(history.location.pathname).toBe('/signup')
  })
})
