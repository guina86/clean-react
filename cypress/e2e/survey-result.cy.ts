import { setLocalStorageItem, testUrl } from '../utils/helpers'
import { mockApiError, mockApiSuccess } from '../utils/http-mock'

describe('SurveyResult', () => {
  let surveyResult: any
  beforeEach(function () {
    cy.fixture('survey-result').then((data) => { surveyResult = data })
    setLocalStorageItem('account', { accessToken: 'any_token', name: 'any_name' })
  })

  it('Should present error on UnexpectedError', () => {
    mockApiError(/api\/surveys/, 'GET', 400)
    cy.visit('/surveys/any_id')
    cy.getByRole('error-message').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
  })

  it('should reload on button click', () => {
    mockApiError(/api\/surveys/, 'GET', 400)
    cy.visit('/surveys/any_id')
    cy.getByRole('error-message').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    mockApiSuccess(/api\/surveys/, 'GET', surveyResult)
    cy.get('button').click()
    cy.getByRole('question').should('exist')
  })

  it('Should present error on UnexpectedError', () => {
    mockApiError(/api\/surveys/, 'GET', 403)
    cy.visit('/surveys/any_id')
    testUrl('/login')
  })
})
