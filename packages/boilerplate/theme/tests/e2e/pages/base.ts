import Header from './components/header';

export default class Base {
  get path(): string {
    return '/';
  }

  get header() {
    return Header;
  }

  visit(): Cypress.Chainable {
    return cy.visit(this.path);
  }
}
