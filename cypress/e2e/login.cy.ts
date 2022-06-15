const baseUrl: string = Cypress.config().baseUrl

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

  it('should present error state if form is invalid', () => {
    cy.getByPlaceholder('Digite seu e-mail').type('valid@email.com')
    cy.getByPlaceholder('Digite sua senha').type('12345')
    cy.getByRole('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
    cy.getByRole('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
    cy.get('button').should('not.have.attr', 'disabled')
    cy.getByRole('status-wrap').should('not.have.descendants')
  })

  it('should present error if invalid credentials are provided', () => {
    cy.getByPlaceholder('Digite seu e-mail').type('valid@email.com')
    cy.getByPlaceholder('Digite sua senha').type('12345')
    cy.get('button').click()
    cy.getByRole('status-wrap')
      .getByRole('progressbar').should('exist')
      .getByRole('error-message').should('not.exist')
      .getByRole('progressbar').should('not.exist')
      .getByRole('error-message').should('contain.text', 'Credenciais inválidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })
})
