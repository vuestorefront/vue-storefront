import page from '../pages/factory';
import generator from '../utils/data-generator';
import intercept from '../utils/network';

context(['happypath', 'regression'], 'Order placement', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-place-order').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });

  it('Should successfully place an order as a guest', function() {
    const data = this.fixtures.data[this.test.title];
    const getProductReq = intercept.getProduct();
    page.home.visit();
    page.home.header.categories.first().click();
    page.category().products.first().click().then(() => {
      cy.wait([getProductReq, getProductReq]);
    });
    page.product().addToCartButton.click();
    page.product().header.openCart();
    page.components.cart.goToCheckoutButton.click();
    page.checkout.shipping.heading.should('be.visible');
    page.checkout.shipping.fillForm(data.customer);
    page.checkout.shipping.selectShippingButton.click();
    page.checkout.shipping.shippingMethods.first().click();
    page.checkout.shipping.continueToBillingButton.click();
    page.checkout.billing.heading.should('be.visible');
    page.checkout.billing.copyAddressLabel.click();
    page.checkout.billing.continueToPaymentButton.click();
    page.checkout.payment.paymentMethods.first().click();
    page.checkout.payment.terms.click();
    page.checkout.payment.makeAnOrderButton.click();
    page.checkout.thankyou.heading.should('be.visible');
  });

  it('Should successfully place an order as a registered customer', function() {
    const data = this.fixtures.data[this.test.title];
    const getProductReq = intercept.getProduct();
    data.customer.email = generator.email;
    page.home.visit();
    page.home.header.openLoginModal();
    page.components.loginModal.fillForm(data.customer);
    page.components.loginModal.iWantToCreateAccountCheckbox.click();
    page.components.loginModal.createAccountButton.click();
    page.home.header.categories.first().click();
    page.category().products.first().click().then(() => {
      cy.wait([getProductReq, getProductReq]);
    });
    page.product().addToCartButton.click();
    page.product().header.openCart();
    page.components.cart.goToCheckoutButton.click();
    page.checkout.shipping.heading.should('be.visible');
    page.checkout.shipping.addresses.first().click();
    page.checkout.shipping.selectShippingButton.click();
    page.checkout.shipping.shippingMethods.first().click();
    page.checkout.shipping.continueToBillingButton.click();
    page.checkout.billing.heading.should('be.visible');
    page.checkout.billing.copyAddressLabel.click();
    page.checkout.billing.continueToPaymentButton.click();
    page.checkout.payment.paymentMethods.first().click();
    page.checkout.payment.terms.click();
    page.checkout.payment.makeAnOrderButton.click();
    page.checkout.thankyou.heading.should('be.visible');
    page.checkout.thankyou.orderNumber.then(($order) => {
      page.myAccount.orderHistory.visit();
      page.myAccount.orderHistory.orderNumber.should('have.text', $order.text().substring(1));
    });
  });
});
