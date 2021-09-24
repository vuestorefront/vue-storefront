import requests, { CreateCartResponse } from '../api/requests';
import page from '../pages/factory';

context(['regression'], 'Remove from cart', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-remove-from-cart').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });

  it('Should remove all products from cart', function () {
    const data = this.fixtures.data[this.test.title];
    requests.createCart().then((response: CreateCartResponse) => {
      requests.addToCart(response.body.data.cart.id, data.product, data.product.quantity);
    });
    page.home.visit();
    page.home.header.openCart();
    page.components.cart.product(data.product.name).should('be.visible');
    page.components.cart.removeProduct(data.product.name);
    page.components.cart.product(data.product.name).should('not.exist');
    page.components.cart.yourCartIsEmptyHeading.should('be.visible');
  });

  it('Should remove single product from cart', function () {
    const data = this.fixtures.data[this.test.title];
    requests.createCart().then((response: CreateCartResponse) => {
      data.products.forEach(product => {
        requests.addToCart(response.body.data.cart.id, product, product.quantity);
      });
    });
    page.home.visit();
    page.home.header.openCart();
    page.components.cart.product(data.productToRemove.name).should('be.visible');
    page.components.cart.removeProduct(data.productToRemove.name);
    page.components.cart.product(data.productToRemove.name).should('not.exist');
    data.expectedCart.forEach(product => {
      page.components.cart.product(product.name).should('be.visible');
    });
  });

});
