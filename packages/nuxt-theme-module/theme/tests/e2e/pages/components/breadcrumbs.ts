class Breadcrumbs {

  get container(): Cypress.Chainable {
    return cy.get('.breadcrumbs');
  }

  get listItems(): Cypress.Chainable {
    return this.container.get('.sf-breadcrumbs__list-item');
  }
}

export default new Breadcrumbs();
