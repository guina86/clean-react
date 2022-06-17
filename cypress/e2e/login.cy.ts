import { simulateValidSubmit, testInputStatus, testStatusWrap } from '../support/form-helper'
import { mockApiError, mockApiSuccess } from '../support/http-mock'

const baseUrl: string = Cypress.config().baseUrl!

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    testInputStatus('email', 'Campo obrigatório')
    testInputStatus('password', 'Campo obrigatório')
    cy.get('button').should('have.attr', 'disabled')
    cy.getByRole('status-wrap').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByRole('email-input').type('invalid_email')
    cy.getByRole('password-input').type('1234')
    testInputStatus('email', 'email inválido')
    testInputStatus('password', 'password deve ter pelo menos 5 caracteres')
    cy.get('button').should('have.attr', 'disabled')
    cy.getByRole('status-wrap').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    cy.getByRole('email-input').type('valid@email.com')
    cy.getByRole('password-input').type('12345')
    testInputStatus('email')
    testInputStatus('password')
    cy.get('button').should('not.have.attr', 'disabled')
    cy.getByRole('status-wrap').should('not.have.descendants')
  })

  it('should present InvalidCrednetialsError on 401', () => {
    mockApiError(/login/, 401)
    simulateValidSubmit()
    testStatusWrap('Credenciais inválidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present UnexpectedError on 400', () => {
    mockApiError(/login/, 400)
    simulateValidSubmit()
    testStatusWrap('Algo de errado aconteceu. Tente novamente em breve.')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present save accessToken if valid credentials are provided', () => {
    mockApiSuccess(/login/, 'POST', { accessToken: 'any_access_token' })
    simulateValidSubmit()
    testStatusWrap()
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })

  it('should present UnexpectedError if accessToken is undefined', () => {
    mockApiSuccess(/login/, 'POST')
    cy.getByRole('email-input').type('otto@mail.com')
    cy.getByRole('password-input').type('12345').type('{enter}')
    testStatusWrap('Algo de errado aconteceu. Tente novamente em breve.')
  })

  it('should prevent multiple submits', () => {
    mockApiSuccess(/login/, 'POST', { accessToken: 'any_access_token' }).as('request')
    cy.getByRole('email-input').type('otto@mail.com')
    cy.getByRole('password-input').type('12345')
    cy.get('button').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('should not call submit if form is invalid', () => {
    mockApiSuccess(/login/, 'POST', { accessToken: 'any_access_token' }).as('request')
    cy.getByRole('email-input').type('otto@mail.com').type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
