import requests, { GetMeResponse } from '../api/requests';
import page from '../pages/factory';
import generator from '../utils/data-generator';
import intercept from '../utils/network';

context('My Account', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-my-account').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });

  it(['regression'], 'Should redirect anonymous customer to home page', function () {
    page.myAccount.myProfile.visit().url().should('eq', `${Cypress.config().baseUrl}${page.home.path}`);
  });

  it(['regression'], 'Should display correct personal data', function () {
    const data = this.fixtures.data[this.test.title];
    data.customer.email = generator.email;
    requests.customerSignMeUp(data.customer);
    page.home.visit();
    page.home.header.account.click();
    page.myAccount.myProfile.firstName.should('have.value', data.customer.firstName);
    page.myAccount.myProfile.lastName.should('have.value', data.customer.lastName);
    page.myAccount.myProfile.email.should('have.value', data.customer.email);
  });

  it(['regression'], 'Should update personal data', function () {
    const data = this.fixtures.data[this.test.title];
    data.customer.email = generator.email;
    requests.customerSignMeUp(data.customer);
    page.home.visit();
    page.home.header.account.click();
    data.updatedCustomer.email = generator.email;
    page.myAccount.myProfile.firstName.clear().type(data.updatedCustomer.firstName);
    page.myAccount.myProfile.lastName.clear().type(data.updatedCustomer.lastName);
    page.myAccount.myProfile.email.clear().type(data.updatedCustomer.email);
    const customerUpdateMeRequest = intercept.customerUpdateMe();
    page.myAccount.myProfile.updatePersonalDataButton.click().then(() => {
      cy.wait(customerUpdateMeRequest);
    });
    requests.getMe(true).should((response: GetMeResponse) => {
      expect(response.body.data.me.customer.firstName).to.equal(data.updatedCustomer.firstName);
      expect(response.body.data.me.customer.lastName).to.equal(data.updatedCustomer.lastName);
      expect(response.body.data.me.customer.email).to.equal(data.updatedCustomer.email);
    });
  });
});
