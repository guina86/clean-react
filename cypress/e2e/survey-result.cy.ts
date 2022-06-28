import { setLocalStorageItem } from '../utils/helpers'
import { mockApiError } from '../utils/http-mock'

describe('SurveyResult', () => {
  beforeEach(function () {
    setLocalStorageItem('account', { accessToken: 'any_token', name: 'any_name' })
  })

  it('Should present error on UnexpectedError', () => {
    mockApiError(/api\/surveys/, 'GET', 400)
    cy.visit('/surveys/any_id')
    cy.getByRole('error-message').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
  })
})
