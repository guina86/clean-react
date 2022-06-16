const baseUrl: string = Cypress.config().baseUrl!

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
    cy.getByRole('email-input').type('invalid_email')
    cy.getByRole('password-input').type('1234')
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
    cy.getByRole('email-input').type('valid@email.com')
    cy.getByRole('password-input').type('12345')
    cy.getByRole('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
    cy.getByRole('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
    cy.get('button').should('not.have.attr', 'disabled')
    cy.getByRole('status-wrap').should('not.have.descendants')
  })

  it('should present InvalidCrednetialsError on 401', () => {
    cy.intercept({
      method: 'POST',
      url: /login/
    }, {
      statusCode: 401,
      body: {
        error: 'any_error_message'
      },
      delay: 250
    })
    cy.getByRole('email-input').type('valid@email.com')
    cy.getByRole('password-input').type('12345')
    cy.get('button').click()
    cy.getByRole('status-wrap')
      .getByRole('progressbar').should('exist')
      .getByRole('error-message').should('not.exist')
      .getByRole('progressbar').should('not.exist')
      .getByRole('error-message').should('contain.text', 'Credenciais inválidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present UnexpectedError on 400', () => {
    cy.intercept({
      method: 'POST',
      url: /login/
    }, {
      statusCode: 400,
      body: {
        error: 'any_error_message'
      },
      delay: 250
    })
    cy.getByRole('email-input').type('valid@email.com')
    cy.getByRole('password-input').type('12345')
    cy.get('button').click()
    cy.getByRole('status-wrap')
      .getByRole('progressbar').should('exist')
      .getByRole('error-message').should('not.exist')
      .getByRole('progressbar').should('not.exist')
      .getByRole('error-message').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present save accessToken if valid credentials are provided', () => {
    cy.intercept({
      method: 'POST',
      url: /login/
    }, {
      statusCode: 200,
      body: {
        accessToken: 'any_access_token'
      },
      delay: 250
    })
    cy.getByRole('email-input').type('otto@mail.com')
    cy.getByRole('password-input').type('12345')
    cy.get('button').click()
    cy.getByRole('status-wrap')
      .getByRole('progressbar').should('exist')
      .getByRole('error-message').should('not.exist')
      .getByRole('progressbar').should('not.exist')
      .getByRole('error-message').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })

  it('should present UnexpectedError if accessToken is undefined', () => {
    cy.intercept({
      method: 'POST',
      url: /login/
    }, {
      statusCode: 200,
      body: {
        invalidProperty: 'any_access_token'
      },
      delay: 250
    })
    cy.getByRole('email-input').type('otto@mail.com')
    cy.getByRole('password-input').type('12345')
    cy.get('button').click()
    cy.getByRole('status-wrap')
      .getByRole('progressbar').should('exist')
      .getByRole('error-message').should('not.exist')
      .getByRole('progressbar').should('not.exist')
      .getByRole('error-message').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
  })
})
