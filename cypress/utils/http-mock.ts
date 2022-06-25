export const mockApiError = (url: RegExp, method: string, statusCode: number): void => {
  cy.intercept({
    method,
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
  console.log(body)
  return cy.intercept({
    method,
    url: url
  }, {
    statusCode: 200,
    body: body,
    delay: 250
  })
}
