import { testUrl } from '../utils/helpers'

describe('Private Routes', () => {
  it('should not logout if survey-list has not token', () => {
    cy.visit('')
    testUrl('/login')
  })
})
