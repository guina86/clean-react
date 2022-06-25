const baseUrl: string = Cypress.config().baseUrl!

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}

export const setLocalStorageItem = (key: string, value: object): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorageItem = (key: string): any => {
  return JSON.parse(localStorage.getItem(key))
}
