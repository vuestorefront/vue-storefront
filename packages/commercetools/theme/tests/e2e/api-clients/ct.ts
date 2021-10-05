const middleware = require('../../../middleware.config');

const config = middleware.integrations.ct.configuration;

export type OauthTokenResponse = {
  body: {
    access_token: string
  }
}

export type GetCustomerResponse = {
  body: {
    results: [
      {
        id: string
      }
    ]
  }
}

const ctApiClient = {

  oauthToken(): Cypress.Chainable {
    const data = {
      grant_type: 'client_credentials',
      scope: config.serverApi.scopes.join(' ')
    };
    const options = {
      url: `${config.api.authHost}/oauth/token`,
      method: 'POST',
      headers: {
        authorization: `Basic ${btoa(`${config.serverApi.clientId}:${config.serverApi.clientSecret}`)}`,
        'content-type': 'application/x-www-form-urlencoded'
      },
      qs: data
    };
    return cy.request(options);
  },

  queryCustomerByEmail(token: string, email: string): Cypress.Chainable {
    const data = {
      where: 'email = :email',
      'var.email': email
    };
    const options = {
      url: `https://api.commercetools.com/${config.api.projectKey}/customers`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/x-www-form-urlencoded'
      },
      qs: data
    };
    return cy.request(options);
  },

  deleteCustomerById(token: string, id: string): Cypress.Chainable {
    const options = {
      url: `https://api.commercetools.com/${config.api.projectKey}/customers/${id}`,
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/x-www-form-urlencoded'

      },
      qs: {
        version: 1,
        dataErasure: true
      }
    };
    return cy.request(options);
  }

};

export default ctApiClient;
