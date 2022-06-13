import { AddAccount, SaveAccessToken } from '@domain/usecases'
import { faker } from '@faker-js/faker'
import { createMemoryHistory } from 'history'
import { Validation } from '@presentation/validation/protocols'
import { mock } from 'jest-mock-extended'
import React from 'react'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SignUp } from '@presentation/pages'
import { Router } from 'react-router-dom'
import { actSubmit, arrangeEmail, arrangeName, arrangePassword, arrangePasswordConfirmation, arrangeSignUpInputs } from '@tests/presentation/pages/helpers'
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
    const nameStatus = screen.getByRole('name-status')
    const emailStatus = screen.getByRole('email-status')
    const passwordStatus = screen.getByRole('password-status')
    const passwordConfirmationStatus = screen.getByRole('passwordConfirmation-status')

    expect(statusWrap.childElementCount).toBe(0)
    expect(submitbutton).toBeDisabled()
    expect(nameStatus.title).toBe(errorMessage)
    expect(nameStatus).toHaveTextContent('🔴')
    expect(emailStatus.title).toBe(errorMessage)
    expect(emailStatus).toHaveTextContent('🔴')
    expect(passwordStatus.title).toBe(errorMessage)
    expect(passwordStatus).toHaveTextContent('🔴')
    expect(passwordConfirmationStatus.title).toBe(errorMessage)
    expect(passwordConfirmationStatus).toHaveTextContent('🔴')
  })

  it('should call validation with correct name', () => {
    const name = arrangeName()

    expect(validationSpy.validate).toHaveBeenCalledWith('name', name)
  })

  it('should call validation with correct email', () => {
    const email = arrangeEmail()

    expect(validationSpy.validate).toHaveBeenCalledWith('email', email)
  })

  it('should call validation with correct password', () => {
    const password = arrangePassword()

    expect(validationSpy.validate).toHaveBeenCalledWith('password', password)
  })

  it('should call validation with correct passwordConfirmation', () => {
    const passwordConfirmation = arrangePasswordConfirmation()

    expect(validationSpy.validate).toHaveBeenCalledWith('passwordConfirmation', passwordConfirmation)
  })

  it('should show name error if Validation fails', () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    arrangeName()
    const nameStatus = screen.getByRole('name-status')

    expect(nameStatus.title).toBe(errorMessage)
    expect(nameStatus.textContent).toBe('🔴')
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

  it('should show passwordConfirmation error if Validation fails', () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    arrangePasswordConfirmation()
    const passwordConfirmation = screen.getByRole('passwordConfirmation-status')

    expect(passwordConfirmation.title).toBe(errorMessage)
    expect(passwordConfirmation.textContent).toBe('🔴')
  })

  it('should show valid name state if Validation succeeds', () => {
    arrangeName()
    const nameStatus = screen.getByRole('name-status')

    expect(nameStatus.title).toBe('Tudo certo!')
    expect(nameStatus.textContent).toBe('🟢')
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

  it('should show valid passwordConfirmation state if Validation succeeds', () => {
    arrangePasswordConfirmation()
    const passwordConfirmation = screen.getByRole('passwordConfirmation-status')

    expect(passwordConfirmation.title).toBe('Tudo certo!')
    expect(passwordConfirmation.textContent).toBe('🟢')
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
  })
})
