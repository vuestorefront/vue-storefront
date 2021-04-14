import { Customer } from '../types/customer';

const requests = {
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
  }
};

export default requests;
