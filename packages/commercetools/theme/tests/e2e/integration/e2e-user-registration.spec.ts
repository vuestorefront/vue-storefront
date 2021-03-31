import page from '../pages/factory';
import requests from '../api/requests';
import generator from '../utils/data-generator';

before(() => {
  cy.fixture('test-data/e2e-user-registration').then((fixture) => {
    cy.fixtures = {
      data: fixture
    };
  });
});

context(['regression'], 'User registration', () => {
  it('Should successfully register', () => {
    const data = cy.fixtures.data['Should successfully register'];
    data.customer.email = generator.email;
    page.home.visit();
    page.home.header.openLoginModal();
    page.components.loginModal.fillForm(data.customer);
    page.components.loginModal.iWantToCreateAccountCheckbox.click();
    page.components.loginModal.submitButton.click();
    page.components.loginModal.container.should('not.exist');
    page.home.header.account.click();
    page.myAccount.sidebar.heading.should('be.visible');
  });

  it('Existing user - should display an error', () => {
    const data = cy.fixtures.data['Existing user - should display an error'];
    data.customer.email = generator.email;
    requests.customerSignMeUp(data.customer).then(() => {
      cy.clearCookies();
    });
    page.home.visit();
    page.home.header.openLoginModal();
    page.components.loginModal.fillForm(data.customer);
    page.components.loginModal.iWantToCreateAccountCheckbox.click();
    page.components.loginModal.submitButton.click();
    page.components.loginModal.container.contains(`${data.errorMessage} '"${data.customer.email}"'`).should('be.visible');
  });
});
