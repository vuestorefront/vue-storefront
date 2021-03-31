import page from '../pages/factory';

before(() => {
  cy.fixture('test-data/e2e-place-order').then((fixture) => {
    cy.fixtures = {
      data: fixture
    };
  });
});

context('Order placement', () => {
  it(['e2e', 'happypath'], 'Should successfully place an order', () => {
    const data = cy.fixtures.data;
    page.home.visit();
    page.home.header.categories.first().click();
    page.category.products.first().click();
    page.product.addToCartBtn.click();
    page.product.header.openCart();
    page.cart.goToCheckoutBtn.click();
    page.checkout.shipping.heading.should('be.visible');
    page.checkout.shipping.fillForm(data.customer);
    page.checkout.shipping.selectShippingBtn.click();
    page.checkout.shipping.shippingMethods.first().click();
    page.checkout.shipping.continueToBillingBtn.click();
    page.checkout.billing.heading.should('be.visible');
    page.checkout.billing.copyAddressLabel.click();
    page.checkout.billing.continueToPaymentBtn.click();
    page.checkout.payment.paymentMethods.first().click();
    page.checkout.payment.terms.click();
    page.checkout.payment.makeAnOrderBtn.click();
    page.checkout.thankyou.heading.should('be.visible');
  });
});
