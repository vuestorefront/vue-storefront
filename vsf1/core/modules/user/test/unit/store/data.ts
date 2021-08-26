let user = {
  id: 58,
  group_id: 1,
  groupToken: 'group-three',
  default_billing: '62',
  default_shipping: '48',
  created_at: '2018-01-23 15:30:00',
  updated_at: '2018-03-04 06:39:28',
  created_in: 'Default Store View',
  email: 'examplename@example.com',
  firstname: 'ExampleFirstName',
  lastname: 'ExampleLastName',
  store_id: 1,
  website_id: 1,
  addresses: [
    {
      id: 48,
      customer_id: 58,
      region: {
        region_code: null,
        region: null,
        region_id: 0
      },
      region_id: 0,
      country_id: 'CountryId',
      street: ['Street', '12'],
      telephone: '',
      postcode: '51-169',
      city: 'City',
      firstname: 'ExampleFirstName',
      lastname: 'ExampleLastName',
      default_shipping: true
    },
    {
      id: 62,
      customer_id: 58,
      region: {
        region_code: null,
        region: null,
        region_id: 0
      },
      region_id: 0,
      country_id: 'CountryId',
      street: ['Street', '12'],
      company: 'example',
      telephone: '',
      postcode: '51-169',
      city: 'City',
      firstname: 'ExampleFirstName',
      lastname: 'ExampleLastName',
      vat_id: 'vatidhere42342',
      default_billing: true
    }
  ],
  'disable_auto_group_change': 0
};
let lastUserToken = 'current-refresh-token';
let responseOb = {
  code: 200,
  result: lastUserToken,
  meta: 'meta'
};
let email = 'examplename@example.com';
let username = 'username';
let password = 'Password456';
let customer = {
  email: 'examplename@example.com',
  firstname: 'ExampleFirstName',
  lastname: 'ExampleLastName',
  addresses: 'addr'
};
let ordersHistory = 'orders-history';
let refresh = true;
let useCache = true;
let resolvedFromCache = true;
let pageSize = 20;
let currentPage = 1;

export {
  user, lastUserToken, responseOb, email, username, password, customer,
  ordersHistory, refresh, useCache, resolvedFromCache, pageSize, currentPage
}
