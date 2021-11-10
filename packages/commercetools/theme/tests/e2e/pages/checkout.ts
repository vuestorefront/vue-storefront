import { Customer, Address } from '../types/types';
import Base from './base';
import { el } from './utils/element';

class Checkout extends Base {

  protected step = ''

  get addNewAddressButton(): Cypress.Chainable {
    return cy.contains('Add new address');
  }

  get firstName(): Cypress.Chainable {
    return el(`${this.step}-firstName`, 'input');
  }

  get lastName(): Cypress.Chainable {
    return el(`${this.step}-lastName`, 'input');
  }

  get streetName(): Cypress.Chainable {
    return el(`${this.step}-streetName`, 'input');
  }

  get streetNumber(): Cypress.Chainable {
    return el(`${this.step}-streetNumber`, 'input');
  }

  get city(): Cypress.Chainable {
    return el(`${this.step}-city`, 'input');
  }

  get state(): Cypress.Chainable {
    return el(`${this.step}-state`, 'select');
  }

  get country(): Cypress.Chainable {
    return el(`${this.step}-country`, 'select');
  }

  get postalCode(): Cypress.Chainable {
    return el(`${this.step}-zipcode`, 'input');
  }

  get phone(): Cypress.Chainable {
    return el(`${this.step}-phone`, 'input');
  }

  public fillForm(address: Address) {
    if (address.firstName !== undefined) this.firstName.clear().type(address.firstName);
    if (address.lastName !== undefined) this.lastName.clear().type(address.lastName);
    if (address.streetName !== undefined) this.streetName.clear().type(address.streetName);
    if (address.streetNumber !== undefined) {
      this.streetNumber.parent().click();
      this.streetNumber.clear().type(address.streetNumber);
    }
    if (address.city !== undefined) this.city.clear().type(address.city);
    if (address.country !== undefined) this.country.select(address.country);
    if (address.state !== undefined) this.state.select(address.state);
    if (address.postalCode !== undefined) this.postalCode.clear().type(address.postalCode);
    if (address.phone !== undefined) this.phone.clear().type(address.phone);
  }
}

class Shipping extends Checkout {

  constructor() {
    super();
    this.step = 'shipping';
  }

  get path(): string {
    return '/checkout/shipping';
  }

  get addresses(): Cypress.Chainable {
    return el('shipping-addresses', '.sf-radio label');
  }

  get continueToBillingButton(): Cypress.Chainable {
    return cy.contains('Continue to billing');
  }

  get heading(): Cypress.Chainable {
    return cy.contains('Shipping details');
  }

  get selectShippingButton(): Cypress.Chainable {
    return cy.contains('Select shipping method');
  }

  get shippingMethods(): Cypress.Chainable {
    return el('shipping-method-label');
  }

  public fillForm(customer: Customer) {
    super.fillForm(customer.address.shipping);
  }

}

class Billing extends Checkout {

  constructor() {
    super();
    this.step = 'billing';
  }

  get path(): string {
    return '/checkout/billing';
  }

  get continueToPaymentButton(): Cypress.Chainable {
    return cy.contains('Continue to payment');
  }

  get heading(): Cypress.Chainable {
    return cy.contains('Billing address');
  }

  get copyAddressLabel(): Cypress.Chainable {
    return el('copy-address', 'label');
  }

  public fillForm(customer: Customer) {
    super.fillForm(customer.address.billing);
  }
}

class Payment extends Base {

  get path(): string {
    return '/checkout/payment';
  }

  get heading(): Cypress.Chainable {
    return cy.get('h3:contains("Payment")');
  }

  get shippingAddress(): Cypress.Chainable {
    return el('payment-shipping-address');
  }

  get billingAddressHeader(): Cypress.Chainable {
    return el('payment-billing-address-header');
  }

  get billingAddress(): Cypress.Chainable {
    return el('payment-billing-address');
  }

  get makeAnOrderButton(): Cypress.Chainable {
    return el('payment-summary-buttons').contains('Make an order');
  }

  get paymentMethods(): Cypress.Chainable {
    return el('payment-method');
  }

  get terms(): Cypress.Chainable {
    return el('terms', 'label');
  }

  get productRow(): Cypress.Chainable {
    return el('product-row');
  }

  get summaryValues(): Cypress.Chainable {
    return el('payment-summary', '.sf-property__value');
  }

  get cartPreviewValues(): Cypress.Chainable {
    return el('cart-preview-summary', '.sf-property__value');
  }

}

class ThankYou {
  get heading(): Cypress.Chainable {
    return el('thank-you-banner', 'h2');
  }

  get orderNumber(): Cypress.Chainable {
    return el('order-number');
  }

  get path(): string {
    return '/checkout/thank-you';
  }
}

export {
  Shipping,
  Billing,
  Payment,
  ThankYou
};
