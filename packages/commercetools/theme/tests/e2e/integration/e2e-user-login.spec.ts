import ctApiClient, { GetCustomerResponse, OauthTokenResponse } from '../api-clients/ct';
import vsfClient from '../api-clients/vsf';
import page from '../pages/factory';
import generator from '../utils/data-generator';

context(['regression'], 'User login', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-user-login').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
    cy.clearLocalStorage();
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

  it('Should successfully login', function() {
    const data = this.fixtures.data[this.test.title];
    data.customer.email = generator.email;
    vsfClient.customerSignMeUp(data.customer).then(() => {
      cy.clearCookies();
    });
    page.home.visit();
    page.home.header.openLoginModal();
    page.components.loginModal.loginToAccountButton.click();
    page.components.loginModal.fillForm(data.customer);
    page.components.loginModal.loginButton.click();
    page.components.loginModal.container.should('not.exist');
    page.home.header.account.click();
    page.myAccount.myProfile.heading.should('be.visible');
  });

  it('Incorrect credentials - should display an error', function () {
    const data = this.fixtures.data[this.test.title];
    data.customer.email = generator.email;
    page.home.visit();
    page.home.header.openLoginModal();
    page.components.loginModal.loginToAccountButton.click();
    page.components.loginModal.fillForm(data.customer);
    page.components.loginModal.loginButton.click();
    page.components.loginModal.container.contains(data.errorMessage).should('be.visible');
  });
});
