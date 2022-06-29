import { SignUp } from '@presentation/pages'
import { ApiContext } from '@presentation/contexts'
import { Validation } from '@presentation/validation/protocols'
import { AddAccount } from '@domain/usecases'
import { EmailInUseError } from '@domain/errors'
import * as helper from '@tests/presentation/pages/helpers'
import { fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { createMemoryHistory, MemoryHistory } from 'history'
import { mock } from 'jest-mock-extended'
import { Router } from 'react-router-dom'
import React from 'react'

describe('SignUp Component', () => {
  const renderSut = (): RenderResult => render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router location={history.location} navigator={history}>
        <SignUp
          validation={validationSpy}
          addAccount={addAccountSpy}
        />
      </Router>
    </ApiContext.Provider>
  )
  let history: MemoryHistory
  const validationSpy = mock<Validation>()
  const addAccountSpy = mock<AddAccount>()
  const errorMessage = faker.random.words(2)
  const account = { accessToken: faker.datatype.uuid(), name: faker.name.findName() }
  const setCurrentAccountMock = jest.fn()

  beforeAll(() => {
    addAccountSpy.add.mockResolvedValue(account)
  })

  beforeEach(() => {
    jest.clearAllMocks()
    validationSpy.validate.mockReturnValue('')
    history = createMemoryHistory({ initialEntries: ['/signup'] })
  })

  it('should start with initial state', async () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    renderSut()

    expect(screen.getByRole('status-wrap').childElementCount).toBe(0)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByRole('name-input')).toHaveAttribute('title', errorMessage)
    expect(screen.getByRole('name-label')).toHaveAttribute('title', errorMessage)
    expect(screen.getByRole('email-input')).toHaveAttribute('title', errorMessage)
    expect(screen.getByRole('email-label')).toHaveAttribute('title', errorMessage)
    expect(screen.getByRole('password-input')).toHaveAttribute('title', errorMessage)
    expect(screen.getByRole('password-label')).toHaveAttribute('title', errorMessage)
    expect(screen.getByRole('password-input')).toHaveAttribute('title', errorMessage)
    expect(screen.getByRole('password-label')).toHaveAttribute('title', errorMessage)
  })

  it('should call validation with correct name', () => {
    renderSut()

    const name = helper.arrangeName()
    const input = { name, email: '', password: '', passwordConfirmation: '' }

    expect(validationSpy.validate).toHaveBeenCalledWith('name', input)
  })

  it('should call validation with correct email', () => {
    renderSut()

    const email = helper.arrangeEmail()
    const input = { name: '', email, password: '', passwordConfirmation: '' }

    expect(validationSpy.validate).toHaveBeenCalledWith('email', input)
  })

  it('should call validation with correct password', () => {
    renderSut()

    const password = helper.arrangePassword()
    const input = { name: '', email: '', password, passwordConfirmation: '' }

    expect(validationSpy.validate).toHaveBeenCalledWith('password', input)
  })

  it('should call validation with correct passwordConfirmation', () => {
    renderSut()

    const password = helper.arrangePassword()
    helper.arrangePasswordConfirmation(password)
    const input = { name: '', email: '', password: password, passwordConfirmation: password }

    expect(validationSpy.validate).toHaveBeenCalledWith('passwordConfirmation', input)
  })

  it('should show name error if Validation fails', () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    renderSut()

    helper.arrangeName()

    helper.testStatusForField('name', errorMessage, 'invalid')
  })

  it('should show email error if Validation fails', () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    renderSut()

    helper.arrangeEmail()

    helper.testStatusForField('email', errorMessage, 'invalid')
  })

  it('should show password error if Validation fails', () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    renderSut()

    helper.arrangePassword()

    helper.testStatusForField('password', errorMessage, 'invalid')
  })

  it('should show passwordConfirmation error if Validation fails', () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    renderSut()

    helper.arrangePasswordConfirmation()

    helper.testStatusForField('passwordConfirmation', errorMessage, 'invalid')
  })

  it('should show valid name state if Validation succeeds', () => {
    renderSut()

    helper.arrangeName()

    helper.testStatusForField('name', '', 'valid')
  })

  it('should show valid email state if Validation succeeds', () => {
    renderSut()

    helper.arrangeEmail()

    helper.testStatusForField('email', '', 'valid')
  })

  it('should show valid password state if Validation succeeds', () => {
    renderSut()

    helper.arrangePassword()

    helper.testStatusForField('password', '', 'valid')
  })

  it('should show valid passwordConfirmation state if Validation succeeds', () => {
    renderSut()

    helper.arrangePasswordConfirmation()

    helper.testStatusForField('passwordConfirmation', '', 'valid')
  })

  it('should enable submit button if form is valid', () => {
    renderSut()

    helper.arrangeSignUpInputs()

    expect(screen.getByRole('button')).toBeEnabled()
  })

  it('should show spinner on submit', async () => {
    renderSut()

    helper.arrangeSignUpInputs()
    helper.actSubmit()

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should call AddAccount with correct values', async () => {
    renderSut()

    const params = helper.arrangeSignUpInputs()
    helper.actSubmit()

    expect(addAccountSpy.add).toHaveBeenCalledWith(params)
  })

  it('should call Authentication only once', async () => {
    renderSut()

    helper.arrangeSignUpInputs()
    helper.actSubmit()
    helper.actSubmit()

    expect(addAccountSpy.add).toHaveBeenCalledTimes(1)
  })

  it('should not call Authentication if form is not valid', async () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    renderSut()

    helper.arrangeEmail()
    fireEvent.submit(screen.getByRole('form'))

    expect(addAccountSpy.add).toHaveBeenCalledTimes(0)
  })

  it('should present error if Authentication fails', async () => {
    const error = new EmailInUseError()
    addAccountSpy.add.mockRejectedValueOnce(error)
    renderSut()

    helper.arrangeSignUpInputs()
    helper.actSubmit()

    expect(await screen.findByRole('error-message')).toHaveTextContent(error.message)
    expect(screen.getByRole('status-wrap').children).toHaveLength(1)
  })

  it('should call SaveAccessToken on success', async () => {
    renderSut()

    helper.arrangeSignUpInputs()
    helper.actSubmit()

    await waitFor(() => expect(history.location.pathname).toBe('/'))
    expect(history.index).toBe(0)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(account)
  })

  it('should go to login page', async () => {
    renderSut()

    fireEvent.click(screen.getByRole('login-link'))

    expect(history.index).toBe(0)
    expect(history.location.pathname).toBe('/login')
  })
})
