class Cart {
  get goToCheckoutButton(): Cypress.Chainable {
    return cy.contains('Go to checkout');
  }
}

export default new Cart();
