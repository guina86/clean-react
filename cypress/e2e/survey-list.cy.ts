import { setLocalStorageItem } from '../support/helpers'
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
})
