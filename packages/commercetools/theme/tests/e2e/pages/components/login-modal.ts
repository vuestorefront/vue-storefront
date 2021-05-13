import { Customer } from '../../types/types';
import { el } from '../utils/element';

class LoginModal {

  get container(): Cypress.Chainable {
    return el('login-modal', '.sf-modal__container');
  }

  get email(): Cypress.Chainable {
    return el('login-modal-email');
  }

  get firstName(): Cypress.Chainable {
    return el('login-modal-firstName');
  }

  get lastName(): Cypress.Chainable {
    return el('login-modal-lastName');
  }

  get password(): Cypress.Chainable {
    return el('login-modal-password');
  }

  get iWantToCreateAccountCheckbox(): Cypress.Chainable {
    return el('login-modal-create-account');
  }

  get submitButton(): Cypress.Chainable {
    return el('login-modal-submit');
  }

  get loginToAccountButton(): Cypress.Chainable {
    return el('login-modal-login-to-your-account');
  }

  get loginBtn(): Cypress.Chainable {
    return el('login-modal-submit');
  }

  fillForm(customer: Customer): void {
    if (customer.email) this.email.type(customer.email);
    if (customer.firstName) this.firstName.type(customer.firstName);
    if (customer.lastName) this.lastName.type(customer.lastName);
    if (customer.password) this.password.type(customer.password);
  }

}

export default new LoginModal();
