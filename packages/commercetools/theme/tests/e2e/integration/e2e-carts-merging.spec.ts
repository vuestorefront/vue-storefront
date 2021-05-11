import requests, { CreateCartResponse } from '../api/requests';
import page from '../pages/factory';
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
    requests.customerSignMeUp(data.customer);
    page.home.visit();
    page.home.header.openCart();
    page.components.cart.productName.each((name, index) => {
      cy.wrap(name).should('contain', data.expectedCart[index].name);
    });
    page.components.cart.quantityInput.each((input, index) => {
      cy.wrap(input).should('have.value', data.expectedCart[index].quantity);
    });
    page.components.cart.productProperties.each((properties, index) => {
      cy.wrap(properties).find('.sf-property__value').eq(0).should('contain', data.expectedCart[index].size);
      cy.wrap(properties).find('.sf-property__value').eq(1).should('contain', data.expectedCart[index].color);
    });
  });

});
