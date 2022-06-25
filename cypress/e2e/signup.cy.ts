import { simulateValidSignUpSubmit, testInputStatus, testStatusWrap } from '../support/form-helper'
import { mockApiError, mockApiSuccess } from '../support/http-mock'

const baseUrl: string = Cypress.config().baseUrl!

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

  it('should present error state if form is invalid', () => {
    cy.getByRole('name-input').type('na')
    cy.getByRole('email-input').type('invalid_email')
    cy.getByRole('password-input').type('1234')
    cy.getByRole('passwordConfirmation-input').type('4321')
    testInputStatus('name', 'name deve ter pelo menos 3 caracteres')
    testInputStatus('email', 'email inválido')
    testInputStatus('password', 'password deve ter pelo menos 5 caracteres')
    testInputStatus('passwordConfirmation', 'passwordConfirmation deve ter pelo menos 5 caracteres')
    cy.get('button').should('have.attr', 'disabled')
    cy.getByRole('status-wrap').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    cy.getByRole('name-input').type('valid_name')
    cy.getByRole('email-input').type('valid@email.com')
    cy.getByRole('password-input').type('12345')
    cy.getByRole('passwordConfirmation-input').type('12345')
    testInputStatus('name')
    testInputStatus('email')
    testInputStatus('password')
    testInputStatus('passwordConfirmation')
    cy.get('button').should('not.have.attr', 'disabled')
    cy.getByRole('status-wrap').should('not.have.descendants')
  })

  it('should present EmailInUseError on 403', () => {
    mockApiError(/signup/, 403)
    simulateValidSignUpSubmit()
    testStatusWrap('Email já cadastrado')
    cy.url().should('eq', `${baseUrl}/signup`)
  })

  it('should present UnexpectedError on 400', () => {
    mockApiError(/signup/, 400)
    simulateValidSignUpSubmit()
    testStatusWrap('Algo de errado aconteceu. Tente novamente em breve.')
    cy.url().should('eq', `${baseUrl}/signup`)
  })

  it('should present update account if valid credentials are provided', () => {
    mockApiSuccess(/signup/, 'POST', { accessToken: 'any_access_token', name: 'any_name' })
    simulateValidSignUpSubmit()
    testStatusWrap()
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('account')))
  })

  it('should prevent multiple submits', () => {
    mockApiSuccess(/signup/, 'POST', { accessToken: 'any_access_token' }).as('request')
    cy.getByRole('name-input').type('any_name')
    cy.getByRole('email-input').type('valie@email.com')
    cy.getByRole('password-input').type('12345')
    cy.getByRole('passwordConfirmation-input').type('12345')
    cy.get('button').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('should not call submit if form is invalid', () => {
    mockApiSuccess(/signup/, 'POST', { accessToken: 'any_access_token' }).as('request')
    cy.getByRole('email-input').type('otto@mail.com').type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
