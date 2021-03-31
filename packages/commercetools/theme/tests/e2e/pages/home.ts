import Header from './components/header';

class Home {
  get header() {
    return Header;
  }

  visit(): Cypress.Chainable {
    return cy.visit('/');
  }
}

export default new Home();
