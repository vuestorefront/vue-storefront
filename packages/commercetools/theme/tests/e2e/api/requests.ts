import { Customer, Product } from '../types/types';

const requests = {

  addToCart(cartId: string, product: Product, quantity?: number): Cypress.Chainable {
    const options = {
      url: '/api/ct/addToCart',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: [
        {id: cartId, version: 1},
        {id: product.id, sku: product.sku },
        quantity ?? 1,
        null
      ]
    };
    return cy.request(options);
  },

  createCart(): Cypress.Chainable {
    const options = {
      url: '/api/ct/createCart',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: [{}, null]
    };
    return cy.request(options);
  },

  customerSignMeUp(customer: Customer): Cypress.Chainable {
    const options = {
      url: '/api/ct/customerSignMeUp',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: [
        {
          email: customer.email,
          password: customer.password,
          firstName: customer.firstName,
          lastName: customer.lastName
        }
      ]
    };
    return cy.request(options);
  },

  getMe(): Cypress.Chainable {
    const options = {
      url: '/api/ct/getMe',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: [
        {customer: false}, null
      ]
    };
    return cy.request(options);
  }
};

export default requests;
