import requests, { CreateCartResponse, GetShippingMethodsResponse } from '../api/requests';
import page from '../pages/factory';

const assertDataInProductRow = (productData, expectedData) => {
  const data = productData.text().split('\n').map(e => e.trim()).filter(e => e);
  data.forEach((line, index) => {
    expect(line).to.contain(expectedData[index]);
  });
};

const assertPrices = (data) => {
  page.checkout.payment.summaryValues.each((price, index) => {
    expect(price.text().trim()).to.be.equal(data.expected.prices[index]);
  });
};

const assertCartPreview = (data) => {
  page.checkout.payment.cartPreviewValues.each((property, index) => {
    expect(property.text().trim()).to.be.equal(data.expected.cartPreview[index]);
  });
};

const assertAddresses = (data) => {
  page.checkout.payment.shippingAddress.then((address) => {
    address.text().split('\n').map(e => e.trim()).filter(e => e).forEach((line, index) => {
      expect(line).to.be.equal(data.expected.shippingAddress[index]);
    });
  });
  page.checkout.payment.billingAddressHeader.click();
  page.checkout.payment.billingAddress.then((address) => {
    address.text().split('\n').map(e => e.trim()).filter(e => e).forEach((line, index) => {
      expect(line).to.be.equal(data.expected.billingAddress[index]);
    });
  });
};

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
      assertDataInProductRow(row, data.expected.products[index]);
    });
  });

  it('Should display correct prices - bottom summary', function () {
    const data = this.fixtures.data[this.test.title];
    page.checkout.payment.visit();
    assertPrices(data);
  });

  it('Should display correct data - cart preview summary', function () {
    const data = this.fixtures.data[this.test.title];
    page.checkout.payment.visit();
    assertCartPreview(data);
  });

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
