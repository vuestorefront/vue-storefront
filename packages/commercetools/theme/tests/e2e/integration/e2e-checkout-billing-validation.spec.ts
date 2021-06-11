import requests, { CreateCartResponse } from '../api/requests';
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
    page.home.visit();
    requests.createCart().then((response: CreateCartResponse) => {
      requests.addToCart(response.body.data.cart.id, data.product);
      requests.updateCart(response.body.data.cart.id, { addresses: { shipping: data.customer.address.shipping }});
    });
    page.checkout.shipping.visit();
    page.checkout.shipping.selectShippingButton.click();
    page.checkout.shipping.shippingMethods.contains(data.shippingMethod).click();
    page.checkout.shipping.continueToBillingButton.click();
    page.checkout.billing.heading.should('be.visible');
    page.checkout.billing.fillForm(data.customer);
    page.checkout.billing.continueToPaymentButton.click();
    page.checkout.payment.heading.should('be.visible');
  });
});
