import { el } from '../utils/element';

class Cart {
  get goToCheckoutButton(): Cypress.Chainable {
    return el('go-to-checkout-btn');
  }
}

export default new Cart();
