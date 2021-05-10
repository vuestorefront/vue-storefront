import { el } from '../utils/element';

class Header {
  get cart(): Cypress.Chainable {
    return el('app-header-cart');
  }

  get categories(): Cypress.Chainable {
    return cy.get('[data-e2e*="app-header"]');
  }

  get category() {
    return {
      women: () => el('app-header-url_women'),
      men: () => el('app-header-url_men')
    };
  }

  openCart(): Cypress.Chainable {
    const click = $el => $el.click();
    return this.cart.pipe(click).should(() => {
      expect(Cypress.$('[data-e2e="sidebar-cart"]')).to.exist;
    });
  }
}

export default new Header();
