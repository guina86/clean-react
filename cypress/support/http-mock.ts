export const mockApiError = (url: RegExp, statusCode: number): void => {
  cy.intercept({
    method: 'POST',
    url: url
  }, {
    statusCode: statusCode,
    body: {
      error: 'any_error_message'
    },
    delay: 250
  })
}

export const mockApiSuccess = (url: RegExp, method: string, body?: any): Cypress.Chainable<null> => {
  return cy.intercept({
    method: method,
    url: url
  }, {
    statusCode: 200,
    body: body,
    delay: 250
  })
}
