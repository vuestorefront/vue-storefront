import requests from '../api/requests';
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

  it('Should successfully login', function() {
    const data = this.fixtures.data[this.test.title];
    data.customer.email = generator.email;
    requests.customerSignMeUp(data.customer).then(() => {
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
