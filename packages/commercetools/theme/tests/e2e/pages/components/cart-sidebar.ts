import { el } from '../utils/element';

class Cart {
  get goToCheckoutBtn(): Cypress.Chainable {
    return el('go-to-checkout-btn');
  }
}

export default new Cart();
