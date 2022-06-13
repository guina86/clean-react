import { Authentication } from '@domain/usecases'
import { faker } from '@faker-js/faker'
import { createMemoryHistory } from 'history'
import { Validation } from '@presentation/validation/protocols'
import { mock } from 'jest-mock-extended'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { SignUp } from '@presentation/pages'
import { Router } from 'react-router-dom'
import { arrangeName } from '@tests/presentation/pages/helpers'

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
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus).toHaveTextContent('🔴')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus).toHaveTextContent('🔴')
    expect(passwordConfirmationStatus.title).toBe('Campo obrigatório')
    expect(passwordConfirmationStatus).toHaveTextContent('🔴')
  })

  it('should call validation with correct name', () => {
    const name = arrangeName()

    expect(validationSpy.validate).toHaveBeenCalledWith('name', name)
  })
})
