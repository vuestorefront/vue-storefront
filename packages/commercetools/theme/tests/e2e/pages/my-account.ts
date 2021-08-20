import Base from './base';
import { contains, el } from './utils/element';

export enum MyAccountTab {
  PersonalData = 'Personal data',
  PasswordChange = 'Password change'
}

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
    return el('myaccount-update-personal-data-btn');
  }

  get currentPassword(): Cypress.Chainable {
    return el('myaccount-current-password');
  }

  get newPassword(): Cypress.Chainable {
    return el('myaccount-new-password');
  }

  get repeatPassword(): Cypress.Chainable {
    return el('myaccount-repeat-password');
  }

  get updatePasswordButton(): Cypress.Chainable {
    return el('myaccount-update-password-btn');
  }

  tab(tab: MyAccountTab): Cypress.Chainable {
    return cy.contains('.sf-tabs__title', tab);
  }

  switchTab(tab: MyAccountTab) {
    const click = $tab => cy.wrap($tab).click();
    return this.tab(tab).pipe(click).should('have.class', 'is-active');
  }

}

export {
  MyAccount,
  MyProfile
};
