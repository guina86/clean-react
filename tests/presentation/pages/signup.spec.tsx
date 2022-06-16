import { AddAccount, SaveAccessToken } from '@domain/usecases'
import { faker } from '@faker-js/faker'
import { createMemoryHistory } from 'history'
import { Validation } from '@presentation/validation/protocols'
import { mock } from 'jest-mock-extended'
import React from 'react'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SignUp } from '@presentation/pages'
import { Router } from 'react-router-dom'
import { actSubmit, arrangeEmail, arrangeName, arrangePassword, arrangePasswordConfirmation, arrangeSignUpInputs, testStatusForField } from '@tests/presentation/pages/helpers'
import { EmailInUseError } from '@domain/errors'

describe('Login Component', () => {
  const history = createMemoryHistory({ initialEntries: ['/signup'] })
  const errorMessage = faker.random.words(2)
  const accessToken = faker.datatype.uuid()
  const validationSpy = mock<Validation>()
  const addAccountSpy = mock<AddAccount>()
  const saveAccessTokenSpy = mock<SaveAccessToken>()

  beforeAll(() => {
    validationSpy.validate.mockReturnValue(errorMessage)
    addAccountSpy.add.mockResolvedValue({ accessToken })
  })

  beforeEach(() => {
    jest.clearAllMocks()
    cleanup()
    render(
      <Router location={history.location} navigator={history}>
        <SignUp
          validation={validationSpy}
          addAccount={addAccountSpy}
          saveAccessToken={saveAccessTokenSpy}
        />
      </Router>
    )
    validationSpy.validate.mockReturnValue('')
  })

  afterEach(cleanup)

  it('should start with initial state', async () => {
    const statusWrap = screen.getByRole('status-wrap')
    const submitbutton = await screen.findByRole('button')
    const nameInput = screen.getByRole('name-input')
    const nameLabel = screen.getByRole('name-label')
    const emailInput = screen.getByRole('email-input')
    const emailLabel = screen.getByRole('email-label')
    const passwordInput = screen.getByRole('password-input')
    const passwordLabel = screen.getByRole('password-label')
    const passwordConfirmationInput = screen.getByRole('password-input')
    const passwordConfirmationLabel = screen.getByRole('password-label')

    expect(statusWrap.childElementCount).toBe(0)
    expect(submitbutton).toBeDisabled()
    expect(nameInput.title).toBe(errorMessage)
    expect(nameLabel.title).toBe(errorMessage)
    expect(emailInput.title).toBe(errorMessage)
    expect(emailLabel.title).toBe(errorMessage)
    expect(passwordInput.title).toBe(errorMessage)
    expect(passwordLabel.title).toBe(errorMessage)
    expect(passwordConfirmationInput.title).toBe(errorMessage)
    expect(passwordConfirmationLabel.title).toBe(errorMessage)
  })

  it('should call validation with correct name', () => {
    const name = arrangeName()
    const input = { name, email: '', password: '', passwordConfirmation: '' }

    expect(validationSpy.validate).toHaveBeenCalledWith('name', input)
  })

  it('should call validation with correct email', () => {
    const email = arrangeEmail()
    const input = { name: '', email, password: '', passwordConfirmation: '' }

    expect(validationSpy.validate).toHaveBeenCalledWith('email', input)
  })

  it('should call validation with correct password', () => {
    const password = arrangePassword()
    const input = { name: '', email: '', password, passwordConfirmation: '' }

    expect(validationSpy.validate).toHaveBeenCalledWith('password', input)
  })

  it('should call validation with correct passwordConfirmation', () => {
    const password = arrangePassword()
    arrangePasswordConfirmation(password)
    const input = { name: '', email: '', password: password, passwordConfirmation: password }

    expect(validationSpy.validate).toHaveBeenCalledWith('passwordConfirmation', input)
  })

  it('should show name error if Validation fails', () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    arrangeName()
    testStatusForField('name', errorMessage, 'invalid')
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

  it('should show passwordConfirmation error if Validation fails', () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    arrangePasswordConfirmation()
    testStatusForField('passwordConfirmation', errorMessage, 'invalid')
  })

  it('should show valid name state if Validation succeeds', () => {
    arrangeName()
    testStatusForField('name', '', 'valid')
  })

  it('should show valid email state if Validation succeeds', () => {
    arrangeEmail()
    testStatusForField('email', '', 'valid')
  })

  it('should show valid password state if Validation succeeds', () => {
    arrangePassword()
    testStatusForField('password', '', 'valid')
  })

  it('should show valid passwordConfirmation state if Validation succeeds', () => {
    arrangePasswordConfirmation()
    testStatusForField('passwordConfirmation', '', 'valid')
  })

  it('should enable submit button if form is valid', () => {
    arrangeSignUpInputs()
    const submitButton = screen.getByRole('button')

    expect(submitButton).toBeEnabled()
  })

  it('should show spinner on submit', async () => {
    arrangeSignUpInputs()
    actSubmit()
    const spinner = await screen.findByRole('progressbar')

    expect(spinner).toBeTruthy()
  })

  it('should call AddAccount with correct values', async () => {
    const params = arrangeSignUpInputs()
    actSubmit()

    expect(addAccountSpy.add).toHaveBeenCalledWith(params)
  })

  it('should call Authentication only once', async () => {
    arrangeSignUpInputs()
    actSubmit()
    actSubmit()

    expect(addAccountSpy.add).toHaveBeenCalledTimes(1)
  })

  it('should not call Authentication if form is not valid', async () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    arrangeEmail()
    fireEvent.submit(screen.getByRole('form'))

    expect(addAccountSpy.add).toHaveBeenCalledTimes(0)
  })

  it('should present error if Authentication fails', async () => {
    const error = new EmailInUseError()
    addAccountSpy.add.mockRejectedValueOnce(error)
    arrangeSignUpInputs()
    actSubmit()
    const statusWrap = screen.getByRole('status-wrap')
    const mainError = await screen.findByRole('error-message')

    expect(mainError).toHaveTextContent(error.message)
    expect(statusWrap.childElementCount).toBe(1)
  })

  it('should present error if SaveAccessToken fails', async () => {
    const error = new Error('save_access_token_error')
    saveAccessTokenSpy.save.mockRejectedValueOnce(error)
    arrangeSignUpInputs()
    actSubmit()
    const statusWrap = screen.getByRole('status-wrap')
    const mainError = await screen.findByRole('error-message')

    expect(mainError).toHaveTextContent(error.message)
    expect(statusWrap.childElementCount).toBe(1)
  })

  it('should call SaveAccessToken on success', async () => {
    arrangeSignUpInputs()
    actSubmit()
    await waitFor(async () => screen.getByRole('form'))

    expect(saveAccessTokenSpy.save).toHaveBeenCalledWith(accessToken)
    expect(history.index).toBe(0)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to login page', async () => {
    const register = screen.getByRole('login-link')
    fireEvent.click(register)

    expect(history.index).toBe(0)
    expect(history.location.pathname).toBe('/login')
  })
})
