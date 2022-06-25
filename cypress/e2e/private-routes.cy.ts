
const baseUrl: string = Cypress.config().baseUrl!

describe('Private Routes', () => {
  it('should not logout if survey-list has not token', () => {
    cy.visit('')
    cy.url().should('eq', `${baseUrl}/login`)
  })
})
