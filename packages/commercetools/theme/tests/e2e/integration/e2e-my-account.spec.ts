import requests, { CustomerSignMeInResponse, GetMeResponse } from '../api/requests';
import page from '../pages/factory';
import { MyAccountTab } from '../pages/my-account';
import generator from '../utils/data-generator';
import intercept from '../utils/network';

context(['regression'], 'My Account', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-my-account').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });

  it('Should redirect anonymous customer to home page', function () {
    page.myAccount.myProfile.visit().url().should('eq', `${Cypress.config().baseUrl}${page.home.path}`);
  });

  it('Should display customer\'s correct personal data', function () {
    const data = this.fixtures.data[this.test.title];
    data.customer.email = generator.email;
    requests.customerSignMeUp(data.customer);
    page.home.visit();
    page.home.header.account.click();
    page.myAccount.myProfile.firstName.should('have.value', data.customer.firstName);
    page.myAccount.myProfile.lastName.should('have.value', data.customer.lastName);
    page.myAccount.myProfile.email.should('have.value', data.customer.email);
  });

  it('Should update customer\'s personal data', function () {
    const data = this.fixtures.data[this.test.title];
    data.customer.email = generator.email;
    requests.customerSignMeUp(data.customer).its('status').should('eq', 200);
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

  it('Should update customer\'s password', function () {
    const data = this.fixtures.data[this.test.title];
    data.customer.email = generator.email, data.updatedCustomer.email = data.customer.email;
    requests.customerSignMeUp(data.customer).its('status').should('eq', 200);
    page.home.visit();
    page.home.header.account.click();
    page.myAccount.myProfile.switchTab(MyAccountTab.PASSWORD_CHANGE);
    page.myAccount.myProfile.messageEmail.should('contain.text', data.customer.email);
    page.myAccount.myProfile.currentPassword.type(data.customer.password);
    page.myAccount.myProfile.newPassword.type(data.updatedCustomer.password);
    page.myAccount.myProfile.repeatPassword.type(data.updatedCustomer.password);
    const customerChangeMyPasswordRequest = intercept.customerChangeMyPassword();
    page.myAccount.myProfile.updatePasswordButton.click().then(() => {
      cy.wait(customerChangeMyPasswordRequest);
    });
    requests.customerSignMeIn(data.updatedCustomer).then((response: CustomerSignMeInResponse) => {
      expect(response.body.data.user.customer.email).to.equal(data.updatedCustomer.email);
    });
  });
});
