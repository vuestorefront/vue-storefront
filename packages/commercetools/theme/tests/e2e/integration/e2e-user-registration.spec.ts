import page from '../pages/factory';
import vsfClient from '../api-clients/vsf';
import generator from '../utils/data-generator';
import ctApiClient, { GetCustomerResponse, OauthTokenResponse } from '../api-clients/ct';

context(['regression'], 'User registration', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-user-registration').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });

  afterEach(function () {
    const data = this.fixtures.data[this.currentTest.title];
    if (data.customer.email !== undefined) {
      ctApiClient.oauthToken().then((oauthTokenResponse: OauthTokenResponse) => {
        ctApiClient.queryCustomerByEmail(oauthTokenResponse.body.access_token, data.customer.email).then((getCustomerResponse: GetCustomerResponse) => {
          ctApiClient.deleteCustomerById(oauthTokenResponse.body.access_token, getCustomerResponse.body.results[0].id);
        });
      });
    }
  });

  it('Should successfully register', function () {
    const data = this.fixtures.data[this.test.title];
    data.customer.email = generator.email;
    page.home.visit();
    page.home.header.openLoginModal();
    page.components.loginModal.fillForm(data.customer);
    page.components.loginModal.iWantToCreateAccountCheckbox.click();
    page.components.loginModal.createAccountButton.click();
    page.components.loginModal.container.should('not.exist');
    page.home.header.account.click();
    page.myAccount.myProfile.heading.should('be.visible');
  });

  it('Existing user - should display an error', function () {
    const data = this.fixtures.data[this.test.title];
    data.customer.email = generator.email;
    vsfClient.customerSignMeUp(data.customer).then(() => {
      cy.clearCookies();
    });
    page.home.visit();
    page.home.header.openLoginModal();
    page.components.loginModal.fillForm(data.customer);
    page.components.loginModal.iWantToCreateAccountCheckbox.click();
    page.components.loginModal.createAccountButton.click();
    page.components.loginModal.container.contains(`${data.errorMessage} '"${data.customer.email}"'`).should('be.visible');
  });
});
