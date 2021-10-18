import page from '../pages/factory';
import requests from '../api/requests';
import generator from '../utils/data-generator';

context(['regression'], 'User registration', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-user-registration').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
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
    requests.customerSignMeUp(data.customer).then(() => {
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
