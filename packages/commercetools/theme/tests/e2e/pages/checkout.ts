import { Customer } from '../types/customer';

class Checkout {

  get firstName(): Cypress.Chainable {
    return cy.get('[data-e2e="firstName"]');
  }

  get lastName(): Cypress.Chainable {
    return cy.get('[data-e2e="lastName"]');
  }

  get streetName(): Cypress.Chainable {
    return cy.get('[data-e2e="streetName"]');
  }

  get apartment(): Cypress.Chainable {
    return cy.get('[data-e2e="apartment"]');
  }

  get city(): Cypress.Chainable {
    return cy.get('[data-e2e="city"]');
  }

  get state(): Cypress.Chainable {
    return cy.get('[data-e2e="state"] select');
  }

  get country(): Cypress.Chainable {
    return cy.get('[data-e2e="country"] select');
  }

  get zipcode(): Cypress.Chainable {
    return cy.get('[  data-e2e="zipcode"]');
  }

  get phone(): Cypress.Chainable {
    return cy.get('[data-e2e="phone"]');
  }

}

class Shipping extends Checkout {

  get continueToBillingBtn(): Cypress.Chainable {
    return cy.get('[data-e2e="continue-to-billing"]');
  }

  get heading(): Cypress.Chainable {
    return cy.get('[data-e2e="heading-shipping"]');
  }

  get selectShippingBtn(): Cypress.Chainable {
    return cy.get('[data-e2e="select-shipping"]');
  }

  get shippingMethods(): Cypress.Chainable {
    return cy.get('[data-e2e="shipping-method-label"]');
  }

  fillForm(customer: Customer) {
    this.firstName.type(customer.firstName);
    this.lastName.type(customer.lastName);
    this.streetName.type(customer.address.shipping.streetName);
    this.apartment.type(customer.address.shipping.apartment);
    this.city.type(customer.address.shipping.city);
    this.country.select(customer.address.shipping.country);
    this.state.select(customer.address.shipping.state);
    this.zipcode.type(customer.address.shipping.zipcode);
    this.phone.type(customer.address.shipping.phone);
  }

}

class Billing extends Checkout {

  get continueToPaymentBtn(): Cypress.Chainable {
    return cy.get('[data-e2e="continue-to-payment"]');
  }

  get heading(): Cypress.Chainable {
    return cy.get('[data-e2e="heading-billing"]');
  }

  get copyAddressLabel(): Cypress.Chainable {
    return cy.get('[data-e2e="copy-address"] label');
  }

  fillForm(customer: Customer): void {
    this.firstName.type(customer.firstName);
    this.lastName.type(customer.lastName);
    this.streetName.type(customer.address.billing.streetName);
    this.apartment.type(customer.address.billing.apartment);
    this.city.type(customer.address.billing.city);
    this.country.select(customer.address.billing.country);
    this.state.select(customer.address.billing.state);
    this.zipcode.type(customer.address.billing.zipcode);
    this.phone.type(customer.address.billing.phone);
  }

}

class Payment extends Checkout {

  get makeAnOrderBtn(): Cypress.Chainable {
    return cy.get('[data-e2e="make-an-order"]');
  }

  get paymentMethods(): Cypress.Chainable {
    return cy.get('[data-e2e="payment-method"]');
  }

  get terms(): Cypress.Chainable {
    return cy.get('[data-e2e="terms"] label');
  }

}

class ThankYou {
  get heading(): Cypress.Chainable {
    return cy.get('[data-e2e="thank-you-banner"] h2');
  }
}

export {
  Shipping,
  Billing,
  Payment,
  ThankYou
};
