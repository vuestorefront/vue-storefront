import Base from './base';
import { contains, el } from './utils/element';

class Sidebar {
  get heading(): Cypress.Chainable {
    return contains('my-account-content-pages', 'My Account');
  }
}

class OrderHistory extends Base {

  get path(): string {
    return '/my-account/order-history';
  }

  get orderNumber(): Cypress.Chainable {
    return el('order-number');
  }

}

export {
  Sidebar,
  OrderHistory
};
