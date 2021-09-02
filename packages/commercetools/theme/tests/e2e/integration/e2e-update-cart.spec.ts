import requests, { CreateCartResponse } from '../api/requests';
import page from '../pages/factory';
import intercept from '../utils/network';

context(['regression'], 'Update cart', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-update-cart').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });

  it('Should increase product quantity', function () {
    const data = this.fixtures.data[this.test.title];
    requests.createCart().then((response: CreateCartResponse) => {
      data.products.forEach(product => {
        requests.addToCart(response.body.data.cart.id, product, product.quantity);
      });
    });
    page.home.visit();
    page.home.header.openCart();
    page.components.cart.product(data.productToUpdate.name).should('be.visible');
    const updateCartRequest = intercept.updateCartQuantity();
    page.components.cart.increaseQtyButton(data.productToUpdate.name).click().then(() => {
      cy.wait(updateCartRequest);
    });
    page.components.cart.productName.each((name, index) => {
      cy.wrap(name).should('contain', data.expectedCart[index].name);
    });
    page.components.cart.quantity().each((input, index) => {
      cy.wrap(input).should('have.value', data.expectedCart[index].quantity);
    });
  });

  it('Should decrease product quantity', function () {
    const data = this.fixtures.data[this.test.title];
    requests.createCart().then((response: CreateCartResponse) => {
      data.products.forEach(product => {
        requests.addToCart(response.body.data.cart.id, product, product.quantity);
      });
    });
    page.home.visit();
    page.home.header.openCart();
    page.components.cart.product(data.productToUpdate.name).should('be.visible');
    const updateCartRequest = intercept.updateCartQuantity();
    page.components.cart.decreaseQtyButton(data.productToUpdate.name).click().then(() => {
      cy.wait(updateCartRequest);
    });
    page.components.cart.productName.each((name, index) => {
      cy.wrap(name).should('contain', data.expectedCart[index].name);
    });
    page.components.cart.quantity().each((input, index) => {
      cy.wrap(input).should('have.value', data.expectedCart[index].quantity);
    });
  });
});
