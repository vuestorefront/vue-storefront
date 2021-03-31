import Header from './components/header';

class Product {

  get addToCartBtn(): Cypress.Chainable {
    return cy.get('[data-e2e="product_add-to-cart"]');
  }

  get header() {
    return Header;
  }

}

export default new Product();
