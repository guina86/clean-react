export const testInputStatus = (field: string, error?: string): void => {
  cy.getByRole(`${field}-wrap`).should('have.attr', 'data-status', error ? 'invalid' : 'valid')
  cy.getByRole(`${field}-input`).should('have.attr', 'title', error ?? '')
  cy.getByRole(`${field}-label`).should('have.attr', 'title', error ?? '')
}

export const testStatusWrap = (error?: string): void => {
  cy.getByRole('status-wrap')
    .getByRole('progressbar').should('exist')
    .getByRole('error-message').should('not.exist')
    .getByRole('progressbar').should('not.exist')
    .getByRole('error-message').should(error ? 'contain.text' : 'not.exist', error)
}

export const simulateValidSubmit = (): void => {
  cy.getByRole('email-input').type('valid@email.com')
  cy.getByRole('password-input').type('12345')
  cy.get('button').click()
}
