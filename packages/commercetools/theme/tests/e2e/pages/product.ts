import header from './components/header';

const product = {

  get addToCartBtn(): Cypress.Chainable {
    return cy.get('[data-e2e="product_add-to-cart"]');
  },

  get header() {
    return header;
  }

};

export default product;
