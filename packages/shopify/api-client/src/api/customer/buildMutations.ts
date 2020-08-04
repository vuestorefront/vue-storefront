import {_shopifyCustomClient} from '../../index';

const changePasswordMutation: () => any = (): any => {

  const customerAccessToken = _shopifyCustomClient.graphQLClient.variable('customerAccessToken', 'String!');
  const customer = _shopifyCustomClient.graphQLClient.variable('customer', 'CustomerUpdateInput!');

  return _shopifyCustomClient.graphQLClient.mutation('customerUpdate', [customerAccessToken, customer], (root) => {
    root.add('customerUpdate', {args: {customerAccessToken, customer}}, (customer) => {
      customer.add('customer', (fields) => {
        fields.add('id');
        fields.add('displayName');
        fields.add('email');
        fields.add('firstName');
        fields.add('lastName');
        fields.add('phone');
      });
      customer.add('customerAccessToken', (token) => {
        token.add('accessToken');
        token.add('expiresAt');
      });
      customer.add('customerUserErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
    });
  });
};

const forgotPasswordMutation: () => any = (): any => {

  const email = _shopifyCustomClient.graphQLClient.variable('email', 'String!');

  return _shopifyCustomClient.graphQLClient.mutation('customerRecover', [email], (root) => {
    root.add('customerRecover', {args: {email}}, (customer) => {
      customer.add('customerUserErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
    });
  });
};

const editProfileMutation: () => any = (): any => {

  const customerAccessToken = _shopifyCustomClient.graphQLClient.variable('customerAccessToken', 'String!');
  const customer = _shopifyCustomClient.graphQLClient.variable('customer', 'CustomerUpdateInput!');

  return _shopifyCustomClient.graphQLClient.mutation('customerUpdate', [customerAccessToken, customer], (root) => {
    root.add('customerUpdate', {args: {customerAccessToken, customer}}, (customer) => {
      customer.add('customer', (fields) => {
        fields.add('id');
        fields.add('displayName');
        fields.add('email');
        fields.add('firstName');
        fields.add('lastName');
        fields.add('phone');
      });
      customer.add('customerAccessToken', (token) => {
        token.add('accessToken');
        token.add('expiresAt');
      });
      customer.add('customerUserErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
    });
  });
};

const signInMutation: () => any = (): any => {

  const input = _shopifyCustomClient.graphQLClient.variable('input', 'CustomerAccessTokenCreateInput!');

  return _shopifyCustomClient.graphQLClient.mutation('customerAccessTokenCreate', [input], (root) => {
    root.add('customerAccessTokenCreate', {args: {input}}, (customer) => {
      customer.add('customerAccessToken', (token) => {
        token.add('accessToken');
        token.add('expiresAt');
      });
      customer.add('customerUserErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
    });
  });
};

const signOutMutation: () => any = (): any => {

  const customerAccessToken = _shopifyCustomClient.graphQLClient.variable('customerAccessToken', 'String!');

  return _shopifyCustomClient.graphQLClient.mutation('customerAccessTokenDelete', [customerAccessToken], (root) => {
    root.add('customerAccessTokenDelete', {args: {customerAccessToken}}, (customer) => {
      customer.add('deletedAccessToken');
      customer.add('deletedCustomerAccessTokenId');
      customer.add('userErrors', (error) => {
        error.add('field');
        error.add('message');
      });
    });
  });
};

const signUpMutation: () => any = (): any => {

  const input = _shopifyCustomClient.graphQLClient.variable('input', 'CustomerCreateInput!');

  return _shopifyCustomClient.graphQLClient.mutation('customerCreate', [input], (root) => {
    root.add('customerCreate', {args: {input}}, (customer) => {
      customer.add('customer', (token) => {
        token.add('id');
      });
      customer.add('customerUserErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
    });
  });
};

export {
  changePasswordMutation,
  forgotPasswordMutation,
  editProfileMutation,
  signInMutation,
  signOutMutation,
  signUpMutation
};
