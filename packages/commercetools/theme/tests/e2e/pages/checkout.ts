import { Customer } from '../types/types';
import Base from './base';
import { el } from './utils/element';

class Checkout extends Base {

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

  public fillForm(customer: Customer) {
    if (customer.firstName !== undefined) this.firstName.type(customer.firstName);
    if (customer.lastName !== undefined) this.lastName.type(customer.lastName);
    if (customer.address.shipping.streetName !== undefined) this.streetName.type(customer.address.shipping.streetName);
    if (customer.address.shipping.apartment !== undefined) this.apartment.click().type(customer.address.shipping.apartment);
    if (customer.address.shipping.city !== undefined) this.city.type(customer.address.shipping.city);
    if (customer.address.shipping.country !== undefined) this.country.select(customer.address.shipping.country);
    if (customer.address.shipping.state !== undefined) this.state.select(customer.address.shipping.state);
    if (customer.address.shipping.postalCode !== undefined) this.zipcode.type(customer.address.shipping.postalCode);
    if (customer.address.shipping.phone !== undefined) this.phone.type(customer.address.shipping.phone);
  }
}

class Shipping extends Checkout {
  get path(): string {
    return '/checkout/shipping';
  }

  get addresses(): Cypress.Chainable {
    return el('shipping-addresses', '.sf-radio label');
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

}

class Billing extends Checkout {
  get path(): string {
    return '/checkout/billing';
  }

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
  get heading(): Cypress.Chainable {
    return el('heading-payment');
  }

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
