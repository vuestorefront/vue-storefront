import Base from './base';
import { contains, el } from './utils/element';

class MyAccount extends Base {

  get path(): string {
    return '/my-account';
  }

  get heading(): Cypress.Chainable {
    return contains('my-account-content-pages', 'My Account');
  }
}

class MyProfile extends MyAccount {

  get firstName(): Cypress.Chainable {
    return el('myaccount-firstName').find('input');
  }

  get lastName(): Cypress.Chainable {
    return el('myaccount-lastName').find('input');
  }

  get email(): Cypress.Chainable {
    return el('myaccount-email').find('input');
  }

  get updatePersonalDataButton(): Cypress.Chainable {
    return el('myaccount-update-personal-data-button');
  }

}

export {
  MyAccount,
  MyProfile
};
