import { el } from '../utils/element';

class Cart {

  product(name?: string): Cypress.Chainable {
    const product = el('collected-product');
    return name === undefined ? product : product.contains(name);
  }

  get productName(): Cypress.Chainable {
    return this.product().find('.sf-collected-product__title');
  }

  get quantityInput(): Cypress.Chainable {
    return this.product().find('input');
  }

  get goToCheckoutButton(): Cypress.Chainable {
    return el('go-to-checkout-btn');
  }

  get productProperties(): Cypress.Chainable {
    return this.product().find('.collected-product__properties');
  }

  get totalItems(): Cypress.Chainable {
    return el('sidebar-cart', '.cart-summary .sf-property__value');
  }

  getPropertyValue(collectedProduct: JQuery<HTMLElement>): Cypress.Chainable {
    return cy.wrap(collectedProduct).find('.sf-property__value');
  }

  getProductSizeProperty(collectedProduct: JQuery<HTMLElement>): Cypress.Chainable {
    return this.getPropertyValue(collectedProduct).eq(0);
  }

  getProductColorProperty(collectedProduct: JQuery<HTMLElement>): Cypress.Chainable {
    return this.getPropertyValue(collectedProduct).eq(1);
  }
}

export default new Cart();
