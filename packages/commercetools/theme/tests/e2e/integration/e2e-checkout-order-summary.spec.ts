import requests, { CreateCartResponse, GetShippingMethodsResponse } from '../api/requests';
import page from '../pages/factory';

context(['regression'], 'Checkout - Order Summary', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-checkout-order-summary').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    }).then(() => {
      const data = this.fixtures.data[this.currentTest.title];
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
    });
  });

  it('Should contain correct product data in Order Summary', function () {
    const data = this.fixtures.data[this.test.title];
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

  const assertAddresses = (data) => {
    page.checkout.payment.shippingAddress.then((address) => {
      address.text().split('\n').forEach((line, index) => {
        expect(line.trim()).to.be.equal(data.expected.shippingAddress[index]);
      });
    });
    page.checkout.payment.billingAddressHeader.click();
    page.checkout.payment.billingAddress.then((address) => {
      address.text().split('\n').forEach((line, index) => {
        expect(line.trim()).to.be.equal(data.expected.billingAddress[index]);
      });
    });
  };

  it('Should display correct addresses', function () {
    const data = this.fixtures.data[this.test.title];
    page.checkout.payment.visit();
    assertAddresses(data);
  });

  it('Should display "Same as shipping address" for billing address', function () {
    const data = this.fixtures.data[this.test.title];
    page.checkout.payment.visit();
    assertAddresses(data);
  });

});
