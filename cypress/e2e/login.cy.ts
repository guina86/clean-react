describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    cy.getByRole('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByRole('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.get('button').should('have.attr', 'disabled')
    cy.getByRole('status-wrap').should('not.have.descendants')
  })
})
