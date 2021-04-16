import { contains } from './utils/element';

class Sidebar {
  get heading(): Cypress.Chainable {
    return contains('my-account-content-pages', 'My Account');
  }
}

export {
  Sidebar
};
