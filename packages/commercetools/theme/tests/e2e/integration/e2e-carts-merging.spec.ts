import requests from '../api/requests';
import page from '../pages/factory';
import { CreateCartResponse } from '../types/types';
import generator from '../utils/data-generator';

before(() => {
  cy.fixture('test-data/e2e-carts-merging').then((fixture) => {
    cy.fixtures = {
      data: fixture
    };
  });
});

context([], 'Carts merging', () => {

  it('Should merge guest cart with customer cart', function() {
    const data = cy.fixtures.data[this.test.title];
    data.customer.email = generator.email;
    requests.getMe();
    requests.createCart().then((response: CreateCartResponse) => {
      data.products.forEach(product => {
        requests.addToCart(response.body.data.cart.id, product, product.quantity);
      });
    });
    page.home.visit();
    cy.wait(5000);
  });

});
