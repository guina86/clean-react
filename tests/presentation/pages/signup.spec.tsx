import { Authentication } from '@domain/usecases'
import { faker } from '@faker-js/faker'
import { createMemoryHistory } from 'history'
import { Validation } from '@presentation/validation/protocols'
import { mock } from 'jest-mock-extended'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { SignUp } from '@presentation/pages'
import { Router } from 'react-router-dom'
import { arrangeEmail, arrangeName, arrangePassword, arrangePasswordConfirmation } from '@tests/presentation/pages/helpers'

describe('Login Component', () => {
  const history = createMemoryHistory({ initialEntries: ['/signup'] })
  const errorMessage = faker.random.words(2)
  const accessToken = faker.datatype.uuid()
  const validationSpy = mock<Validation>()
  const authenticationSpy = mock<Authentication>()

  beforeAll(() => {
    validationSpy.validate.mockReturnValue(errorMessage)
    authenticationSpy.auth.mockResolvedValue({ accessToken })
  })

  beforeEach(() => {
    jest.clearAllMocks()
    render(
      <Router location={history.location} navigator={history}>
        <SignUp
          validation={validationSpy}
        />
      </Router>
    )
    validationSpy.validate.mockReturnValue('')
  })

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
})
