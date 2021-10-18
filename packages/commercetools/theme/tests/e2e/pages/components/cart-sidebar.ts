import { el } from '../utils/element';

class Cart {

  product(name?: string): Cypress.Chainable {
    const product = el('collected-product');
    return name === undefined ? product : product.contains(name).parents('[data-e2e="collected-product"]');
  }

  get productName(): Cypress.Chainable {
    return this.product().find('.sf-collected-product__title');
  }

  get goToCheckoutButton(): Cypress.Chainable {
    return cy.contains('Go to checkout');
  }

  get productProperties(): Cypress.Chainable {
    return this.product().find('.collected-product__properties');
  }

  get totalItems(): Cypress.Chainable {
    return el('sidebar-cart', '.cart-summary .sf-property__value');
  }

  get yourCartIsEmptyHeading(): Cypress.Chainable {
    return el('sidebar-cart', 'h2').contains('Your cart is empty');
  }

  propertyValue(collectedProduct: JQuery<HTMLElement>): Cypress.Chainable {
    return cy.wrap(collectedProduct).find('.sf-property__value');
  }

  productSizeProperty(collectedProduct: JQuery<HTMLElement>): Cypress.Chainable {
    return this.propertyValue(collectedProduct).eq(0);
  }

  productColorProperty(collectedProduct: JQuery<HTMLElement>): Cypress.Chainable {
    return this.propertyValue(collectedProduct).eq(1);
  }

  removeProductButton(name?: string): Cypress.Chainable {
    return this.product(name).find('.sf-collected-product__remove');
  }

  removeProduct(name?: string): Cypress.Chainable {
    return this.removeProductButton(name).first().click();
  }

  increaseQtyButton(name?: string): Cypress.Chainable {
    return this.product(name).find('button').contains('+');
  }

  decreaseQtyButton(name?: string): Cypress.Chainable {
    return this.product(name).find('button').contains('−');
  }

  quantity(name?: string): Cypress.Chainable {
    return this.product(name).find('input');
  }
}

export default new Cart();
