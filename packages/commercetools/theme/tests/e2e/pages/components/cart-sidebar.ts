import { el } from '../utils/element';

class Cart {

  get product(): Cypress.Chainable {
    return el('collected-product');
  }

  get productName(): Cypress.Chainable {
    return this.product.find('.sf-collected-product__title');
  }

  get quantityInput(): Cypress.Chainable {
    return this.product.find('input');
  }

  get goToCheckoutButton(): Cypress.Chainable {
    return el('go-to-checkout-btn');
  }

  get productProperties(): Cypress.Chainable {
    return this.product.find('.collected-product__properties');
  }

}

export default new Cart();
