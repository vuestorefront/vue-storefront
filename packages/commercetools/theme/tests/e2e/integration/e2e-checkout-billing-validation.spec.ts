import requests, { CreateCartResponse, GetShippingMethodsResponse } from '../api/requests';
import page from '../pages/factory';

context(['regression'], 'Checkout - Billing', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-checkout-billing-validation').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });
  it('Should successfully save address - guest customer', function () {
    const data = this.fixtures.data[this.test.title];
    requests.createCart().then((response: CreateCartResponse) => {
      requests.addToCart(response.body.data.cart.id, data.product);
      requests.updateCart(response.body.data.cart.id, { addresses: { shipping: data.customer.address.shipping }});
      requests.getShippingMethods(response.body.data.cart.id).then((shippingMethods: GetShippingMethodsResponse) => {
        const shippingMethod = shippingMethods.body.data.shippingMethods.find((method) => {
          return method.name === data.shippingMethod;
        });
        requests.updateCart(response.body.data.cart.id, { shippingMethodId: shippingMethod.id });
      });
    });
    page.checkout.billing.visit();
    page.checkout.billing.fillForm(data.customer);
    page.checkout.billing.continueToPaymentButton.click();
    page.checkout.payment.heading.should('be.visible');
  });
});
