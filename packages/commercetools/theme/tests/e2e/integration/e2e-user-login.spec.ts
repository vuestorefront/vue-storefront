import requests from '../api/requests';
import page from '../pages/factory';
import generator from '../utils/data-generator';

before(() => {
  cy.fixture('test-data/e2e-user-login').then((fixture) => {
    cy.fixtures = {
      data: fixture
    };
  });
  cy.clearLocalStorage();
});

context(['regression'], 'User login', () => {
  it('Should successfully login', () => {
    const data = cy.fixtures.data['Should successfully login'];
    data.customer.email = generator.email;
    requests.customerSignMeUp(data.customer).then(() => {
      cy.clearCookies();
    });
    page.home.visit();
    page.home.header.openLoginModal();
    page.components.loginModal.loginToAccountButton.click();
    page.components.loginModal.fillForm(data.customer);
    page.components.loginModal.loginBtn.click();
    page.components.loginModal.container.should('not.exist');
    page.home.header.account.click();
    page.myAccount.sidebar.heading.should('be.visible');

  });

  it('Incorrect credentials - should display an error', () => {
    const data = cy.fixtures.data['Incorrect credentials - should display an error'];
    data.customer.email = generator.email;
    page.home.visit();
    page.home.header.openLoginModal();
    page.components.loginModal.loginToAccountButton.click();
    page.components.loginModal.fillForm(data.customer);
    page.components.loginModal.loginBtn.click();
    page.components.loginModal.container.contains(data.errorMessage).should('be.visible');
  });
});
