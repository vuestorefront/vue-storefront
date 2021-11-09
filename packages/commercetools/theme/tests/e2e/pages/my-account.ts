import Base from './base';
import { contains, el } from './utils/element';

export enum MyAccountTab {
  PERSONAL_DATA = 'Personal data',
  PASSWORD_CHANGE = 'Password change'
}

export enum MenuItems {
  MY_PROFILE = 'My profile',
  SHIPPING_DETAILS = 'Shipping details',
  BILLING_DETAILS = 'Billing details',
  LOYALTY_CARD = 'Loyalty card',
  MY_NEWSLETTER = 'My newsletter',
  ORDER_HISTORY = 'Order history',
  MY_REVIEWS = 'My reviews',
  LOG_OUT = 'Log out'
}

class Menu {
  navigateTo(item: MenuItems): Cypress.Chainable {
    return cy.get('.sf-content-pages__list').contains(item).click();
  }
}

class MyAccount extends Base {

  get path(): string {
    return '/my-account';
  }

  get menu() {
    return new Menu();
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
    return cy.contains('Update personal data');
  }

  get messageEmail(): Cypress.Chainable {
    return el('myaccount-message-email');
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
    return cy.contains('Update password');
  }

  tab(tab: MyAccountTab): Cypress.Chainable {
    return cy.contains('.sf-tabs__title', tab);
  }

  switchTab(tab: MyAccountTab) {
    const click = $tab => cy.wrap($tab).click();
    return this.tab(tab).pipe(click).should('have.class', 'is-active');
  }
}
class OrderHistory extends Base {
  get path(): string {
    return '/my-account/order-history';
  }

  get orderNumber(): Cypress.Chainable {
    return el('order-number');
  }

  get orderDate(): Cypress.Chainable {
    return el('order-date');
  }

  get orderAmount(): Cypress.Chainable {
    return el('order-amount');
  }

  get orderStatus(): Cypress.Chainable {
    return el('order-status');
  }

  get viewDetails(): Cypress.Chainable {
    return cy.contains('View details');
  }

  get orderDetailsId(): Cypress.Chainable {
    return this.orderDetails.eq(0);
  }

  get orderDetailsDate(): Cypress.Chainable {
    return this.orderDetails.eq(1);
  }

  get orderDetailsStatus(): Cypress.Chainable {
    return this.orderDetails.eq(2);
  }

  get orderDetailsTotal(): Cypress.Chainable {
    return this.orderDetails.eq(3);
  }

  get paginationCount(): Cypress.Chainable {
    return el('order-history-pagination-count');
  }

  get paginationNext(): Cypress.Chainable {
    return el('order-history-pagination', 'button.sf-arrow--right');
  }

  get paginationPrevious(): Cypress.Chainable {
    return el('order-history-pagination', 'button.sf-arrow--left');
  }

  private get orderDetails() {
    return el('order-details', '.sf-property__value');
  }
}

export {
  MyAccount,
  MyProfile,
  OrderHistory
};
