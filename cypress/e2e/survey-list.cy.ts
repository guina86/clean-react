import { getLocalStorageItem, setLocalStorageItem, testUrl } from '../support/helpers'
import { mockApiError } from '../support/http-mock'

describe('SurveyList', () => {
  beforeEach(() => {
    setLocalStorageItem('account', { accessToken: 'any_token', name: 'any_name' })
  })

  it('should present error on UnexpectedError', () => {
    mockApiError(/surveys/, 'GET', 400)
    cy.visit('')
    cy.getByRole('error-message').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
  })

  it('should logout on AccessDeniedError', () => {
    mockApiError(/surveys/, 'GET', 403)
    cy.visit('')
    testUrl('/login')
  })

  it('should show correct username', () => {
    mockApiError(/surveys/, 'GET', 400)
    cy.visit('')
    const { name } = getLocalStorageItem('account')
    cy.getByRole('username').should('contain.text', name)
  })

  it('should logou when sair is clicked', () => {
    mockApiError(/surveys/, 'GET', 400)
    cy.visit('')
    cy.getByRole('logout').click()
    testUrl('/login')
  })
})
