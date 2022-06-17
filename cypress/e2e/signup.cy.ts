import { testInputStatus } from '../support/form-helper'

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('should load with correct initial state', () => {
    testInputStatus('name', 'Campo obrigatório')
    testInputStatus('email', 'Campo obrigatório')
    testInputStatus('password', 'Campo obrigatório')
    testInputStatus('passwordConfirmation', 'Campo obrigatório')
    cy.get('button').should('have.attr', 'disabled')
    cy.getByRole('status-wrap').should('not.have.descendants')
  })
})
