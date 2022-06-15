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

  it('should present error state if form is invalid', () => {
    cy.getByPlaceholder('Digite seu e-mail').type('invalid_email')
    cy.getByPlaceholder('Digite sua senha').type('1234')
    cy.getByRole('email-status')
      .should('have.attr', 'title', 'email inválido')
      .should('contain.text', '🔴')
    cy.getByRole('password-status')
      .should('have.attr', 'title', 'password deve ter pelo menos 5 caracteres')
      .should('contain.text', '🔴')
    cy.get('button').should('have.attr', 'disabled')
    cy.getByRole('status-wrap').should('not.have.descendants')
  })
})
