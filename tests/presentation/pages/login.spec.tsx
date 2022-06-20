import React from 'react'
import { Router } from 'react-router-dom'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { ApiContext } from '@presentation/contexts'
import mock from 'jest-mock-extended/lib/Mock'
import { faker } from '@faker-js/faker'
import Login from '@presentation/pages/login'
import { Validation } from '@presentation/validation/protocols'
import { Authentication } from '@domain/usecases'
import { InvalidCredentialsError } from '@domain/errors'
import { actSubmit, arrangeEmail, arrangeLoginInputs, arrangePassword, testStatusForField } from '@tests/presentation/pages/helpers'

describe('Login Component', () => {
  const history = createMemoryHistory({ initialEntries: ['/login'] })
  const errorMessage = faker.random.words(2)
  const accessToken = faker.datatype.uuid()
  const name = faker.name.findName()
  const account = { accessToken, name }
  const validationSpy = mock<Validation>()
  const authenticationSpy = mock<Authentication>()
  const setCurrentAccountMock = jest.fn()

  beforeAll(() => {
    validationSpy.validate.mockReturnValue(errorMessage)
    authenticationSpy.auth.mockResolvedValue(account)
  })

  beforeEach(() => {
    jest.clearAllMocks()
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router location={history.location} navigator={history}>
          <Login
            validation={validationSpy}
            authentication={authenticationSpy}
          />
        </Router>
      </ApiContext.Provider>
    )
    validationSpy.validate.mockReturnValue('')
  })

  it('should start with initial state', async () => {
    const statusWrap = screen.getByRole('status-wrap')
    const submitbutton = await screen.findByRole('button')
    const emailInput = screen.getByRole('email-input')
    const emailLabel = screen.getByRole('email-label')
    const passwordInput = screen.getByRole('password-input')
    const passwordLabel = screen.getByRole('password-label')

    expect(statusWrap.childElementCount).toBe(0)
    expect(submitbutton).toBeDisabled()
    expect(emailInput.title).toBe(errorMessage)
    expect(emailLabel.title).toBe(errorMessage)
    expect(passwordInput.title).toBe(errorMessage)
    expect(passwordLabel.title).toBe(errorMessage)
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
    testStatusForField('email', errorMessage, 'invalid')
  })

  it('should show password error if Validation fails', () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    arrangePassword()
    testStatusForField('password', errorMessage, 'invalid')
  })

  it('should show valid email state if Validation succeeds', () => {
    arrangeEmail()
    testStatusForField('email', '', 'valid')
  })

  it('should show valid password state if Validation succeeds', () => {
    arrangePassword()
    testStatusForField('password', '', 'valid')
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

  it('should call SaveAccessToken on success', async () => {
    arrangeLoginInputs()
    actSubmit()
    await waitFor(async () => screen.getByRole('form'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(account)
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
