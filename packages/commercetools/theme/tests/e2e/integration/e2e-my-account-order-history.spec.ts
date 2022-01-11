import requests, { CreateCartResponse, CreateMyOrderFromCartResponse, GetShippingMethodsResponse } from '../api/requests';
import page from '../pages/factory';
import { MenuItems } from '../pages/my-account';
import generator from '../utils/data-generator';
import intercept from '../utils/network';

context(['regression'], '[MyAccount] Order History', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-my-account-order-history').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });

  it('Should display correct order data - list view', function () {
    const data = this.fixtures.data[this.test.title];
    const customerSignMeIn = intercept.customerSignMeIn();
    data.customer.email = generator.email;
    requests.customerSignMeUp(data.customer);
    requests.createCart().then((createCartResponse: CreateCartResponse) => {
      requests.addToCart(createCartResponse.body.data.cart.id, data.product);
      requests.updateCart(createCartResponse.body.data.cart.id, { addresses: { shipping: data.customer.address.shipping } });
      requests.getShippingMethods(createCartResponse.body.data.cart.id).then((shippingMethodsResponse: GetShippingMethodsResponse) => {
        const shippingMethodId = shippingMethodsResponse.body.data.shippingMethods.find((el) => {
          return el.name === data.shippingMethod;
        }).id;
        requests.updateCart(
          createCartResponse.body.data.cart.id,
          { addresses: { billing: data.customer.address.billing }, shippingMethodId: shippingMethodId}
        );
        requests.createMyOrderFromCart(createCartResponse.body.data.cart.id, 14).then((createMyOrderFromCartResponse: CreateMyOrderFromCartResponse) => {
          data.expected.order.id = createMyOrderFromCartResponse.body.data.order.id;
          page.home.visit();
          page.home.header.openLoginModal();
          page.components.loginModal.loginToAccountButton.click();
          page.components.loginModal.fillForm(data.customer);
          page.components.loginModal.loginButton.click().then(() => {
            cy.wait(customerSignMeIn);
          });
          page.myAccount.orderHistory.visit();
          page.myAccount.orderHistory.orderNumber.should('have.text', data.expected.order.id);
          page.myAccount.orderHistory.orderDate.should('not.have.text', '');
          page.myAccount.orderHistory.orderAmount.should('have.text', data.expected.order.amount);
          page.myAccount.orderHistory.orderStatus.should('have.text', data.expected.order.status);
        });
      });
    });
  });

  it('Should display correct order data - details view', function () {
    const data = this.fixtures.data[this.test.title];
    const customerSignMeIn = intercept.customerSignMeIn();
    data.customer.email = generator.email;
    requests.customerSignMeUp(data.customer);
    requests.createCart().then((createCartResponse: CreateCartResponse) => {
      requests.addToCart(createCartResponse.body.data.cart.id, data.product);
      requests.updateCart(createCartResponse.body.data.cart.id, { addresses: { shipping: data.customer.address.shipping } });
      requests.getShippingMethods(createCartResponse.body.data.cart.id).then((shippingMethodsResponse: GetShippingMethodsResponse) => {
        const shippingMethodId = shippingMethodsResponse.body.data.shippingMethods.find((el) => {
          return el.name === data.shippingMethod;
        }).id;
        requests.updateCart(
          createCartResponse.body.data.cart.id,
          { addresses: { billing: data.customer.address.billing }, shippingMethodId: shippingMethodId}
        );
        requests.createMyOrderFromCart(createCartResponse.body.data.cart.id, 14).then((createMyOrderFromCartResponse: CreateMyOrderFromCartResponse) => {
          data.expected.order.id = createMyOrderFromCartResponse.body.data.order.id;
          page.home.visit();
          page.home.header.openLoginModal();
          page.components.loginModal.loginToAccountButton.click();
          page.components.loginModal.fillForm(data.customer);
          page.components.loginModal.loginButton.click().then(() => {
            cy.wait(customerSignMeIn);
          });
          page.myAccount.orderHistory.visit();
          page.myAccount.orderHistory.viewDetails.click();
          page.myAccount.orderHistory.orderDetailsId.should('contain', data.expected.order.id);
          page.myAccount.orderHistory.orderDetailsDate.should('not.have.text', '');
          page.myAccount.orderHistory.orderDetailsStatus.should('contain', data.expected.order.status);
          page.myAccount.orderHistory.orderDetailsTotal.should('contain', data.expected.order.amount);
        });
      });
    });
  });

  it('Should change page - next', function () {
    const data = this.fixtures.data[this.test.title];
    intercept.getOrders({ fixture: 'responses/getOrders.json'});
    data.customer.email = generator.email;
    requests.customerSignMeUp(data.customer);
    page.myAccount.myProfile.visit();
    page.myAccount.myProfile.menu.navigateTo(MenuItems.ORDER_HISTORY);
    page.myAccount.orderHistory.paginationCount.scrollIntoView().should('be.visible');
    const getOrdersRequest = intercept.getOrders();
    page.myAccount.orderHistory.paginationNext.click().then(() => {
      cy.wait(getOrdersRequest).its('request.body').its('0').should('deep.equal', data.expected.payload);
    });
  });

  it('Should change page - previous', function () {
    const data = this.fixtures.data[this.test.title];
    intercept.getOrders({ fixture: 'responses/getOrdersWithOffset.json'});
    data.customer.email = generator.email;
    requests.customerSignMeUp(data.customer);
    page.myAccount.myProfile.visit();
    page.myAccount.myProfile.menu.navigateTo(MenuItems.ORDER_HISTORY);
    page.myAccount.orderHistory.paginationCount.scrollIntoView().should('be.visible');
    const getOrdersRequest = intercept.getOrders();
    page.myAccount.orderHistory.paginationPrevious.click().then(() => {
      cy.wait(getOrdersRequest).its('request.body').its('0').should('deep.equal', data.expected.payload);
    });
  });

});
