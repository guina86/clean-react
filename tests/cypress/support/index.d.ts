declare namespace Cypress {
  interface Chainable {
    getByRole: (role: string) => Chainable<Element>
    getByPlaceholder: (placeholder: string) => Chainable<Element>
  }
}
