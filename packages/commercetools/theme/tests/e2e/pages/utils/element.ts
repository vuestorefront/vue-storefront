export function el(selector: string, children?: string): Cypress.Chainable {
  return children ? cy.get(`[data-e2e="${selector}"] ${children}`) : cy.get(`[data-e2e="${selector}"]`);
}

export function contains(selector: string, text: string): Cypress.Chainable {
  return cy.contains(`[data-e2e="${selector}"]`, text);
}
