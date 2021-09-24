import requests, { CreateCartResponse } from '../api/requests';
import page from '../pages/factory';

context(['regression'], 'Checkout - Access quard', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-checkout-access-guard').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });

  it('Should successfully redirect to home page - shipping and billing address are not set', function () {
    page.checkout.payment.visit();
    cy.url().should('equal', `${Cypress.config('baseUrl')}${page.home.path}`);
  });

  it('Should successfully visit payment page - shipping and billing address are set', function () {
    const data = this.fixtures.data[this.test.title];
    requests.createCart().then((response: CreateCartResponse) => {
      requests.addToCart(response.body.data.cart.id, data.product);
      requests.updateCart(response.body.data.cart.id, { addresses: { shipping: data.customer.address.shipping, billing: data.customer.address.billing }});
    });
    page.checkout.payment.visit();
    cy.url().should('contain', page.checkout.payment.path);
  });

  it('Should successfully visit thank you page - after successful order placement', function () {
    const data = this.fixtures.data[this.test.title];
    requests.createCart().then((response: CreateCartResponse) => {
      requests.addToCart(response.body.data.cart.id, data.product);
      requests.updateCart(response.body.data.cart.id, { addresses: { shipping: data.customer.address.shipping, billing: data.customer.address.billing }});
    });
    page.checkout.payment.visit();
    page.checkout.payment.paymentMethods.first().click();
    page.checkout.payment.terms.click();
    page.checkout.payment.makeAnOrderButton.click();
    cy.url().should('contain', page.checkout.thankyou.path);
  });
});
