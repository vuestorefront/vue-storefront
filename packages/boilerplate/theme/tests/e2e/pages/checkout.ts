import { Customer } from '../types/customer';
import { el } from './utils/element';

class Shipping {

  get firstName(): Cypress.Chainable {
    return el('shipping-firstName', 'input');
  }

  get lastName(): Cypress.Chainable {
    return el('shipping-lastName');
  }

  get streetName(): Cypress.Chainable {
    return el('shipping-streetName');
  }

  get apartment(): Cypress.Chainable {
    return el('shipping-apartment');
  }

  get city(): Cypress.Chainable {
    return el('shipping-city');
  }

  get state(): Cypress.Chainable {
    return el('shipping-state', 'input');
  }

  get country(): Cypress.Chainable {
    return el('shipping-country', 'select');
  }

  get zipcode(): Cypress.Chainable {
    return el('shipping-zipcode');
  }

  get phone(): Cypress.Chainable {
    return el('shipping-phone');
  }

  get continueToBillingButton(): Cypress.Chainable {
    return el('continue-to-billing');
  }

  get heading(): Cypress.Chainable {
    return el('shipping-heading');
  }

  get selectShippingButton(): Cypress.Chainable {
    return el('select-shipping');
  }

  get shippingMethods(): Cypress.Chainable {
    return el('shipping-method', 'label');
  }

  public fillForm(customer: Customer) {
    this.firstName.type(customer.firstName);
    this.lastName.type(customer.lastName);
    this.streetName.type(customer.address.shipping.streetName);
    this.apartment.type(customer.address.shipping.apartment);
    this.city.type(customer.address.shipping.city);
    this.country.select(customer.address.shipping.country);
    this.state.type(customer.address.shipping.state);
    this.zipcode.type(customer.address.shipping.zipcode);
    this.phone.type(customer.address.shipping.phone);
  }
}

class Billing {
  get firstName(): Cypress.Chainable {
    return el('billing-firstName');
  }

  get lastName(): Cypress.Chainable {
    return el('billing-lastName');
  }

  get streetName(): Cypress.Chainable {
    return el('billing-streetName');
  }

  get apartment(): Cypress.Chainable {
    return el('billing-apartment');
  }

  get city(): Cypress.Chainable {
    return el('billing-city');
  }

  get state(): Cypress.Chainable {
    return el('billing-state', 'input');
  }

  get country(): Cypress.Chainable {
    return el('billing-country', 'select');
  }

  get zipcode(): Cypress.Chainable {
    return el('billing-zipcode');
  }

  get phone(): Cypress.Chainable {
    return el('billing-phone');
  }

  get continueToPaymentButton(): Cypress.Chainable {
    return el('continue-to-payment');
  }

  get heading(): Cypress.Chainable {
    return el('billing-heading');
  }

  public fillForm(customer: Customer) {
    this.firstName.type(customer.firstName);
    this.lastName.type(customer.lastName);
    this.streetName.type(customer.address.billing.streetName);
    this.apartment.type(customer.address.billing.apartment);
    this.city.type(customer.address.billing.city);
    this.country.select(customer.address.billing.country);
    this.state.type(customer.address.billing.state);
    this.zipcode.type(customer.address.billing.zipcode);
    this.phone.type(customer.address.billing.phone);
  }

}

class Payment {
  get makeAnOrderButton(): Cypress.Chainable {
    return el('make-an-order');
  }

  get paymentMethods(): Cypress.Chainable {
    return el('payment-method');
  }

  get terms(): Cypress.Chainable {
    return el('terms', 'label');
  }
}

class ThankYou {
  get heading(): Cypress.Chainable {
    return el('thank-you-banner', 'h2');
  }
}

export {
  Shipping,
  Billing,
  Payment,
  ThankYou
};
