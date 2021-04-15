import { Customer } from '../types/customer';
import { el } from './utils/element';

class Shipping {

  get firstName(): Cypress.Chainable {
    return el('firstName');
  }

  get lastName(): Cypress.Chainable {
    return el('lastName');
  }

  get streetName(): Cypress.Chainable {
    return el('streetName');
  }

  get apartment(): Cypress.Chainable {
    return el('apartment');
  }

  get city(): Cypress.Chainable {
    return el('city');
  }

  get state(): Cypress.Chainable {
    return el('state', 'select');
  }

  get country(): Cypress.Chainable {
    return el('country', 'select');
  }

  get zipcode(): Cypress.Chainable {
    return el('zipcode');
  }

  get phone(): Cypress.Chainable {
    return el('phone');
  }

  get continueToBillingButton(): Cypress.Chainable {
    return el('continue-to-billing');
  }

  get heading(): Cypress.Chainable {
    return el('heading-shipping');
  }

  get selectShippingButton(): Cypress.Chainable {
    return el('select-shipping');
  }

  get shippingMethods(): Cypress.Chainable {
    return el('shipping-method-label');
  }

  public fillForm(customer: Customer) {
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

class Billing {
  get continueToPaymentButton(): Cypress.Chainable {
    return el('continue-to-payment');
  }

  get heading(): Cypress.Chainable {
    return el('heading-billing');
  }

  get copyAddressLabel(): Cypress.Chainable {
    return el('copy-address', 'label');
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
