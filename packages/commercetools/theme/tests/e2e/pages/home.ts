import header from './components/header';

const home = {

  get header() {
    return header;
  },

  visit(): Cypress.Chainable {
    return cy.visit('/');
  }

};

export default home;
