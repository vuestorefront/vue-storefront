import requests, { CreateCartResponse } from '../api/requests';
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

  it('Should merge guest cart with registered customer cart', function () {
    const data = this.fixtures.data[this.test.title];
    data.customer.email = generator.email;
    requests.getMe();
    requests.createCart().then((response: CreateCartResponse) => {
      data.products.forEach(product => {
        requests.addToCart(response.body.data.cart.id, product, product.quantity);
      });
    });
    requests.customerSignMeUp(data.customer);
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
    requests.customerSignMeUp(data.customer);
    requests.createCart().then((response: CreateCartResponse) => {
      data.products.customer.forEach(product => {
        requests.addToCart(response.body.data.cart.id, product, product.quantity);
      });
    }).then(() => {
      cy.clearCookies();
    });
    requests.createCart().then((response: CreateCartResponse) => {
      data.products.guest.forEach(product => {
        requests.addToCart(response.body.data.cart.id, product, product.quantity);
      });
    });
    requests.customerSignMeIn(data.customer);
    page.home.visit();
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
