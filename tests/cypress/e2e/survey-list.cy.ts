import { getLocalStorageItem, setLocalStorageItem, testUrl } from '../utils/helpers'
import { mockApiError, mockApiSuccess } from '../utils/http-mock'

describe('SurveyList', () => {
  let list: any
  beforeEach(function () {
    cy.fixture('survey-list').then((data) => { list = data })
    setLocalStorageItem('account', { accessToken: 'any_token', name: 'any_name' })
  })

  it('should present error on UnexpectedError', () => {
    mockApiError(/surveys/, 'GET', 400)
    cy.visit('')
    cy.getByRole('error-message').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
  })

  it('should reload on button click', () => {
    mockApiError(/surveys/, 'GET', 400)
    cy.visit('')
    cy.getByRole('error-message').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    mockApiSuccess(/surveys/, 'GET', list)
    cy.get('button').click()
    cy.getByRole('survey-item').should('have.length', 2)
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

  it('should present survey items', () => {
    mockApiSuccess(/surveys/, 'GET', list)
    cy.visit('')
    cy.getByRole('empty-item').should('exist')
    cy.getByRole('survey-item').should('have.length', 2)
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[role="date-day"]').text(), '03')
      assert.equal(li.find('[role="date-month"]').text(), 'fev')
      assert.equal(li.find('[role="date-year"]').text(), '2021')
      assert.equal(li.find('[role="question-text"]').text(), 'Question 1')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[role="image-icon"]').attr('src'), icon.thumbUp)
      })
    })
    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[role="date-day"]').text(), '04')
      assert.equal(li.find('[role="date-month"]').text(), 'mar')
      assert.equal(li.find('[role="date-year"]').text(), '2022')
      assert.equal(li.find('[role="question-text"]').text(), 'Question 2')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[role="image-icon"]').attr('src'), icon.thumbDown)
      })
    })
  })
})
