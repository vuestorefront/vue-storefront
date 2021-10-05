import ctApiClient, { GetCustomerResponse, OauthTokenResponse } from '../api-clients/ct';
import vsfApiClient, { CreateCartResponse } from '../api-clients/vsf';
import page from '../pages/factory';
import generator from '../utils/data-generator';

context(['regression'], 'Carts merging', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-carts-merging').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });

  afterEach(function () {
    const data = this.fixtures.data[this.currentTest.title];
    ctApiClient.oauthToken().then((oauthTokenResponse: OauthTokenResponse) => {
      ctApiClient.queryCustomerByEmail(oauthTokenResponse.body.access_token, data.customer.email).then((getCustomerResponse: GetCustomerResponse) => {
        ctApiClient.deleteCustomerById(oauthTokenResponse.body.access_token, getCustomerResponse.body.results[0].id);
      });
    });
  });

  it('Should merge guest cart with registered customer cart', function () {
    const data = this.fixtures.data[this.test.title];
    data.customer.email = generator.email;
    console.log(this.fixtures.data[this.test.title]);
    vsfApiClient.getMe();
    vsfApiClient.createCart().then((response: CreateCartResponse) => {
      data.products.forEach(product => {
        vsfApiClient.addToCart(response.body.data.cart.id, product, product.quantity);
      });
    });
    vsfApiClient.customerSignMeUp(data.customer);
    page.home.visit();
    page.home.header.openCart();
    page.components.cart.productName.each((name, index) => {
      cy.wrap(name).should('contain', data.expectedCart[index].name);
    });
    page.components.cart.quantity().each((input, index) => {
      cy.wrap(input).should('have.value', data.expectedCart[index].quantity);
    });
    page.components.cart.product().each((product, index) => {
      page.components.cart.productSizeProperty(product).should('contain', data.expectedCart[index].size);
      page.components.cart.productColorProperty(product).should('contain', data.expectedCart[index].color);
    });
  });

  it('Should merge guest cart with registered customer cart - products already in cart', function () {
    const data = this.fixtures.data[this.test.title];
    data.customer.email = generator.email;
    vsfApiClient.customerSignMeUp(data.customer);
    vsfApiClient.createCart().then((response: CreateCartResponse) => {
      data.products.customer.forEach(product => {
        vsfApiClient.addToCart(response.body.data.cart.id, product, product.quantity);
      });
      cy.clearCookies();
    });
    vsfApiClient.createCart().then((response: CreateCartResponse) => {
      data.products.guest.forEach(product => {
        vsfApiClient.addToCart(response.body.data.cart.id, product, product.quantity);
      });
    });
    page.home.visit();
    page.home.header.openLoginModal();
    page.components.loginModal.loginToAccountButton.click();
    page.components.loginModal.fillForm(data.customer);
    page.components.loginModal.loginBtn.click();
    page.home.header.openCart();
    page.components.cart.totalItems.should($ti => {
      const totalItems: number = data.expectedCart.reduce((total, product) => {
        return total + product.quantity;
      }, 0);
      expect($ti.text().trim()).to.be.equal(totalItems.toString());
    });
    page.components.cart.productName.each((name, index) => {
      cy.wrap(name).should('contain', data.expectedCart[index].name);
    });
    page.components.cart.quantity().each((input, index) => {
      cy.wrap(input).should('have.value', data.expectedCart[index].quantity);
    });
    page.components.cart.product().each((product, index) => {
      page.components.cart.productSizeProperty(product).should('contain', data.expectedCart[index].size);
      page.components.cart.productColorProperty(product).should('contain', data.expectedCart[index].color);
    });
  });

});
