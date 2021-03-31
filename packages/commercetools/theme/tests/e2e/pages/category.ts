import { el } from './utils/element';

class Category {
  get products(): Cypress.Chainable {
    return el('category-product-card', 'a');
  }
}

export default new Category();
