import { Login } from '@presentation/pages'
import { ApiContext } from '@presentation/contexts'
import { Validation } from '@presentation/validation/protocols'
import { Authentication } from '@domain/usecases'
import { InvalidCredentialsError } from '@domain/errors'
import * as helper from '@tests/presentation/pages/helpers'
import { render, fireEvent, waitFor, screen, RenderResult } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { createMemoryHistory, MemoryHistory } from 'history'
import { mock } from 'jest-mock-extended'
import { Router } from 'react-router-dom'
import React from 'react'

describe('Login Component', () => {
  const renderSut = (): RenderResult => render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router location={history.location} navigator={history}>
        <Login
          validation={validationSpy}
          authentication={authenticationSpy}
        />
      </Router>
    </ApiContext.Provider>
  )
  let history: MemoryHistory
  const validationSpy = mock<Validation>()
  const authenticationSpy = mock<Authentication>()
  const errorMessage = faker.random.words(2)
  const account = { accessToken: faker.datatype.uuid(), name: faker.name.findName() }
  const setCurrentAccountMock = jest.fn()

  beforeAll(() => {
    authenticationSpy.auth.mockResolvedValue(account)
  })

  beforeEach(() => {
    jest.clearAllMocks()
    validationSpy.validate.mockReturnValue('')
    history = createMemoryHistory({ initialEntries: ['/login'] })
  })

  it('should start with initial state', async () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    renderSut()

    expect(screen.getByRole('status-wrap').childElementCount).toBe(0)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByRole('email-input')).toHaveAttribute('title', errorMessage)
    expect(screen.getByRole('email-label')).toHaveAttribute('title', errorMessage)
    expect(screen.getByRole('password-input')).toHaveAttribute('title', errorMessage)
    expect(screen.getByRole('password-label')).toHaveAttribute('title', errorMessage)
  })

  it('should call validation with correct email', () => {
    renderSut()

    const email = helper.arrangeEmail()
    const input = { email: email, password: '' }

    expect(validationSpy.validate).toHaveBeenCalledWith('email', input)
  })

  it('should call validation with correct password', () => {
    renderSut()

    const password = helper.arrangePassword()
    const input = { email: '', password: password }

    expect(validationSpy.validate).toHaveBeenCalledWith('password', input)
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

  it('should enable submit button if form is valid', () => {
    renderSut()

    helper.arrangeLoginInputs()

    expect(screen.getByRole('button')).toBeEnabled()
  })

  it('should show spinner on submit', async () => {
    renderSut()

    helper.arrangeLoginInputs()
    helper.actSubmit()

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should call Authentication with correct values', async () => {
    renderSut()

    const params = helper.arrangeLoginInputs()
    helper.actSubmit()

    expect(authenticationSpy.auth).toHaveBeenCalledWith(params)
  })

  it('should call Authentication only once', async () => {
    renderSut()

    helper.arrangeLoginInputs()
    helper.actSubmit()
    helper.actSubmit()

    expect(authenticationSpy.auth).toHaveBeenCalledTimes(1)
  })

  it('should not call Authentication if form is not valid', async () => {
    validationSpy.validate.mockReturnValue(errorMessage)
    renderSut()

    helper.arrangeEmail()
    fireEvent.submit(screen.getByRole('form'))

    expect(authenticationSpy.auth).toHaveBeenCalledTimes(0)
  })

  it('should present error if Authentication fails', async () => {
    const error = new InvalidCredentialsError()
    authenticationSpy.auth.mockRejectedValueOnce(error)
    renderSut()

    helper.arrangeLoginInputs()
    helper.actSubmit()

    expect(await screen.findByRole('error-message')).toHaveTextContent(error.message)
    expect(screen.getByRole('status-wrap').children).toHaveLength(1)
  })

  it('should call SaveAccessToken on success', async () => {
    renderSut()

    helper.arrangeLoginInputs()
    helper.actSubmit()

    await waitFor(() => expect(history.location.pathname).toBe('/'))
    expect(history.index).toBe(0)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(account)
  })

  it('should go to signup page', async () => {
    renderSut()

    fireEvent.click(screen.getByRole('register-link'))

    expect(history.index).toBe(0)
    expect(history.location.pathname).toBe('/signup')
  })
})
