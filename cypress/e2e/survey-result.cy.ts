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

  it('should present survey result', () => {
    mockApiSuccess(/api\/surveys/, 'GET', surveyResult)
    cy.visit('/surveys/any_id')
    cy.getByRole('question').should('have.text', 'any_question')
    cy.getByRole('date-day').should('have.text', '03')
    cy.getByRole('date-month').should('have.text', 'fev')
    cy.getByRole('date-year').should('have.text', '2021')
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[role="answer"]').text(), 'any_answer')
      assert.equal(li.find('[role="answer-percent"]').text(), '75%')
      assert.equal(li.find('[role="answer-image"]').attr('src'), 'any_image')
      assert.equal(li.css('box-shadow'), 'rgb(188, 71, 123) 0px 0px 3px 2px')
    })
    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[role="answer"]').text(), 'any_answer_2')
      assert.equal(li.find('[role="answer-percent"]').text(), '25%')
      assert.notExists(li.find('[role="answer-image"]'))
    })
  })

  it('Should go to SurveyList on back button click', () => {
    cy.visit('')
    mockApiSuccess(/api\/surveys/, 'GET', surveyResult)
    cy.visit('/surveys/any_id')
    cy.getByRole('back-button').click()
    testUrl('/')
  })
})
