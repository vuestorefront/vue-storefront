import requests, { CreateCartResponse, GetShippingMethodsResponse } from '../api/requests';
import page from '../pages/factory';

context([], 'Checkout - Order Summary', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-checkout-order-summary').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });

  it('Should contain correct data in Order Summary', function () {
    const data = this.fixtures.data[this.test.title];
    requests.createCart().then((response: CreateCartResponse) => {
      data.products.forEach((product) => {
        requests.addToCart(response.body.data.cart.id, product, product.quantity);
      });
      requests.updateCart(response.body.data.cart.id, { addresses: { shipping: data.customer.address.shipping }});
      requests.getShippingMethods(response.body.data.cart.id).then((res: GetShippingMethodsResponse) => {
        const shippingMethod = res.body.data.shippingMethods.find((method) => {
          return method.name === data.shippingMethod;
        });
        requests.updateCart(response.body.data.cart.id, { shippingMethodId: shippingMethod.id });
      });
      requests.updateCart(response.body.data.cart.id, { addresses: { billing: data.customer.address.billing }});
    });
    page.checkout.payment.visit();
    page.checkout.payment.productRow.each((row, index) => {
      cy.wrap(row).within(() => {
        page.checkout.payment.productTitleSku.within(() => {
          cy.contains(data.expectedCartSummary.products[index].name).should('be.visible');
        });
        page.checkout.payment.productTitleSku.within(() => {
          cy.contains(data.expectedCartSummary.products[index].sku).should('be.visible');
        });
        page.checkout.payment.productAttributes.within(() => {
          cy.contains(data.expectedCartSummary.products[index].size).should('be.visible');
        });
        page.checkout.payment.productAttributes.within(() => {
          cy.contains(data.expectedCartSummary.products[index].color).should('be.visible');
        });
        page.checkout.payment.productQuantity.within(() => {
          cy.contains(data.expectedCartSummary.products[index].quantity).should('be.visible');
        });
        page.checkout.payment.productPrice.within(() => {
          cy.contains(data.expectedCartSummary.products[index].amount).should('be.visible');
        });
      });
    });
    page.checkout.payment.discountedPrice.within(() => {
      cy.contains(data.expectedCartSummary.discountedPrice).should('be.visible');
    });
    page.checkout.payment.specialPrice.within(() => {
      cy.contains(data.expectedCartSummary.specialPrice).should('be.visible');
    });
    page.checkout.payment.totalPrice.within(() => {
      cy.contains(data.expectedCartSummary.totalPrice).should('be.visible');
    });
  });

});
