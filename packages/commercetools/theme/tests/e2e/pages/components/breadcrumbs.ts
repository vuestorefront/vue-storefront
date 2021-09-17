import { el } from '../utils/element';

class Breadcrumbs {

  get container(): Cypress.Chainable {
    return el('breadcrumbs');
  }

  get listItems(): Cypress.Chainable {
    return el('breadcrumbs', '.sf-breadcrumbs__list-item');
  }
}

export default new Breadcrumbs();
