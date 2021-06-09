import requests, { CreateCartResponse } from '../api/requests';
import page from '../pages/factory';

context(['regression'], 'Checkout - Shipping', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-checkout-shipping').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });
  // it('Should successfully save address - guest customer', function () {
  //   const data = this.fixtures.data[this.test.title];
  //   requests.createCart().then((response: CreateCartResponse) => {
  //     requests.addToCart(response.body.data.cart.id, data.product);
  //   });
  //   page.checkout.shipping.visit();
  //   page.checkout.shipping.fillForm(data.customer);
  //   page.checkout.shipping.selectShippingButton.click();
  //   page.checkout.shipping.shippingMethods.contains(data.shippingMethod).click();
  //   page.checkout.shipping.continueToBillingButton.click();
  //   page.checkout.billing.heading.should('be.visible');
  // });

  const requiredFields = [
    'First Name',
    'Last Name',
    'Street Name',
    'Apartment',
    'City',
    'Zipcode',
    'Phone'
  ];

  requiredFields.forEach(requiredField => {

    it(`Should display an error - ${requiredField} empty`, function () {
      const data = this.fixtures.data[this.test.title];
      requests.createCart().then((response: CreateCartResponse) => {
        requests.addToCart(response.body.data.cart.id, data.product);
      });
      page.checkout.shipping.visit();
      page.checkout.shipping.fillForm(data.customer);
      page.checkout.shipping.selectShippingButton.click();
      page.checkout.shipping[Cypress._.camelCase(requiredField)].within(() => {
        return cy.get('input').then(($input) => {
          expect($input[0].validationMessage).to.be.eq(data.errorMessage);
        });
      });
    });
  });

});
